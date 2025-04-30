import { z } from "zod";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloundinary } from "cloudinary";
import DoctorModel from './../models/doctorModel.js';
import AppointmentModel from "./../models/appointmentModel.js";
import "dotenv/config";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Generate Token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

/* 
** @Method Post
** @Route http://localhost:4000/api/users/register
** @Desc Create A New Account
** @Access Public
*/
const userRegister = async (req, res) => {
  const data = await req.body;
  const schema = z.object({
    username: z.string({ required_error: "Username Is Required." }).min(2, { message: "Username Must Be At Least 2 Characters." }).max(100),
    email: z.string({ required_error: "Email Is Requierd." }).email({ message: "Please Enter a Valid Email." }),
    password: z.string({ required_error: "Password Is Requried" }).min(6, { message: "Password Must Be At Least 6 Characters." }).max(200)
  });
  const validation = schema.safeParse(data);
  if (!validation.success) {
    return res.status(400).json({ message: validation.error.errors[0].message, success: false });
  }
  // Check User IsExists Or No
  const isExistsUsers = await UserModel.findOne({ email: data.email });
  if (isExistsUsers) {
    return res.status(400).json({ message: "Email Has Already Been Token", success: false });
  }
  // Hashed Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);
  // UserDetails 
  const userDetails = {
    username: data.username,
    email: data.email,
    password: hashedPassword,
    date: Date.now()
  };
  // Generate New User
  const newUser = new UserModel(userDetails);
  await newUser.save();
  // UserJwtPayload
  const userJwtPayload = {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email
  };
  // Generate Token
  const token = generateToken(userJwtPayload);
  // Destructured User
  const { password, ...other } = newUser._doc;
  return res.status(201).json({ user: { ...other, token }, success: true });
};
/* --------------------------------- */
/* 
** @Method Post
** @Route http://localhost:4000/api/users/login
** @Desc Login In
** @Access Public
*/
const userLogin = async (req, res) => {
  const data = await req.body;

  const schema = z.object({
    email: z.string({ required_error: "Email Is Required" }).email({ message: "Enter A Valid Email." }),
    password: z.string({ required_error: "Password Is Requried." }).min(6, { message: "Password Must Be At Least 6 Characters." }).max(200)
  });

  const validation = schema.safeParse(data);

  if (!validation.success) {
    return res.status(400).json({ message: validation.error.errors[0].message, success: false });
  }

  // Check Email IsExist or no
  const findEmail = await UserModel.findOne({ email: data.email });

  if (!findEmail) {
    return res.status(400).json({ message: "Email Or Password Is Wrong.", success: false });
  }

  // Compare Password Of Email And Login Password
  const checkPassword = await bcrypt.compare(data.password, findEmail.password);

  if (!checkPassword) {
    return res.status(400).json({ message: "Email Or Password Is Wrong.", success: false });
  }

  // Generate Token 
  const userJwtPayload = {
    id: findEmail._id,
    username: findEmail.username,
    email: findEmail.email
  };
  const token = generateToken(userJwtPayload);

  const { password, ...other } = findEmail._doc;

  return res.status(200).json({ user: { ...other, token }, success: true });
};
/* --------------------------------- */
/* 
** @Method Get
** @Route http://localhost:4000/api/users/list
** @Desc Get All Users
** @Access Only Admin
*/

const getAllUsers = async (req, res) => {

  try {
    const users = await UserModel.find({});
    return res.status(200).json({ users: users, access: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, access: false });
  }

};

/* --------------------------------- */
/* 
** @Method post
** @Route http://localhost:4000/api/users/user
** @Desc Get Single User
** @Access Only User HimSelf
*/
const getSingleUser = async (req, res) => {

  try {
    const { userId } = await req.body;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found", success: false });
    }
    return res.status(200).json({ user: user, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }

};
/* --------------------------------- */
/* 
** @Method post
** @Route http://localhost:4000/api/users/update-user
** @Desc Update Single User
** @Access Only User HimSelf
*/
const updateSingleUser = async (req, res) => {

  const { userId, username, phone, address, gender, dob } = req.body;
  const imageFile = req.file;

  if (!username || !phone || !address || !gender || !dob) {
    return res.status(400).json({ message: "Data Missing", success: false });
  }

  await UserModel.findByIdAndUpdate(userId, {
    username: username,
    phone: phone,
    gender: gender,
    dob: dob,
    address: JSON.parse(address)
  });

  if (imageFile) {
    // Get Secure Of Image
    const result = await cloundinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = result.secure_url;
    await UserModel.findByIdAndUpdate(userId, { image: imageUrl });
  }

  const updatedUser = await UserModel.findById(userId).select("-password");

  return res.status(200).json({ updatedUser: updatedUser, success: true, message: "User Updated Successfully!" });

};
/* --------------------------------- */
/* 
** @Method post
** @Route http://localhost:4000/api/users/appointment
** @Desc User Doctor Appointment
** @Access Provate [Should Send Token]
*/
const bookAppointment = async (req, res) => {

  const { userId, docId, soltData } = await req.body;

  // Find Doctor By docId
  const docData = await DoctorModel.findById(docId);

  if (!docData.available) {
    return res.status(400).json({ success: false, message: "Doctor Not Available." });
  }

  // Find User By UserId 
  const userData = await UserModel.findById(userId).select("-password");

  // SlotsBooked
  let slots_booked = docData.slots_booked; // []
  let userSlotsData = { ...soltData, userId, docId }; // {userId: asd, mainDate: .., date:..}


  // Check If User Has Been Booked In The Slots Before
  const findTheSameSlots = slots_booked.find((item) => item.userId === userId && item.date === soltData.date && item.docId === docId);

  if (findTheSameSlots) {
    return res.status(400).json({ message: "You Already Booked This Solts With This Doctor." });
  }

  // Appointment Data
  const appointmentData = {
    userId: userId,
    docId: docId,
    userData: userData,
    docData: docData,
    amount: docData.fees,
    slotData: soltData,
    date: Date.now()
  };
  // Create a New Appointment
  const newAppointment = new AppointmentModel(appointmentData);
  await newAppointment.save();

  slots_booked.push(userSlotsData);
  await DoctorModel.findByIdAndUpdate(docId, { slots_booked: slots_booked });

  return res.status(201).json({ appointment: newAppointment, success: true, message: "Book Appointment Added Successfully!" });

};
/* 
** @Method post
** @Route http://localhost:4000/api/users/user-appointments
** @Desc Get Appointments Of User
** @Access Private [Should Send Token]
*/
const getUserAppointments = async (req, res) => {
  try {
    const { userId } = await req.body;
    const userAppontmenst = await AppointmentModel.find({ userId: userId });
    return res.status(200).json({ appointments: userAppontmenst, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
/* ------------------------------------------ */
/* 
** @Method post
** @Route http://localhost:4000/api/users/cancel-appointment
** @Desc User Can Cancel His Appointment
** @Access Private [Should Send Token]
*/
const cancelAppointment = async (req, res) => {
  const { userId, appointmentId } = await req.body;

  // Get Single Appointment
  const appointment = await AppointmentModel.findById(appointmentId);

  // Check If UserId The Same Appointment UserId
  if (appointment.userId !== userId) {
    return res.status(403).json({ messsage: "Invalid Autorization" });
  }

  // Get This AppointMent Inside Doc
  const { docId, slotData } = appointment;

  const docData = await DoctorModel.findById(docId);
  const slotsData = docData.slots_booked; // [{}, {}]

  const filterSloteData = slotsData.filter((item) => !(item.docId === docId && item.userId === userId && item.date === slotData.date));

  await DoctorModel.findByIdAndUpdate(docId, { slots_booked: filterSloteData });
  await AppointmentModel.findByIdAndDelete(appointmentId);
  return res.status(200).json({ success: true, message: "Appointment Cancelled Successfully." });
};
/* ------------------------------------------ */

const appointmentPayment = async (req, res) => {

  const frontend_url = "https://doctor-appointment-frontend-opal.vercel.app";
  try {
    const { userId, appointmentId } = await req.body;
    const appointment = await AppointmentModel.find({ _id: appointmentId });

    if (appointment[0].userId !== userId) {
      return res.status(403).json({ message: "You Don't Have Permission To Access This Resource." });
    }

    const line_items = appointment.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.docData.name
        },
        unit_amount: item.amount * 100
      },
      quantity: 1
    }));
    // Add Delivery Cahrges
    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Appointment Charges"
        },
        unit_amount: 0
      },
      quantity: 1
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${appointmentId}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${appointmentId}`
    });
    return res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }

};

// Verify Payment
const verifyPayment = async (req, res) => {
  const { success, appointmentId } = await req.body;
  if (success === "true") {
    await AppointmentModel.findByIdAndUpdate(appointmentId, { payment: true, isCompleted: true });
    return res.status(200).json({ success: true, message: "Appointment Paid Succesfully." });
  } else {
    await AppointmentModel.findByIdAndDelete(appointmentId);
    return res.status(200).json({ success: false, message: "Appointment Not Paid." });
  }

};
export { verifyPayment, appointmentPayment, cancelAppointment, getUserAppointments, userRegister, userLogin, getAllUsers, getSingleUser, updateSingleUser, bookAppointment };