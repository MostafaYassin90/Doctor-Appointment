import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DoctorModel from './../models/doctorModel.js';
import AppointmentModel from './../models/appointmentModel.js';
import UserModel from './../models/userModel.js';

/* 
** @Method Post
** @Route http://localhost:4000/api/admin/add-doctor
** @Desc Add A New Doctor 
** @Access Private Only Admin Can Add a New Doctor
*/
/* -------------------------------------------------------------- */
const addDoctor = async (req, res) => {
  // const { name, email, password, image, speciality, degree, experience, fees, address, about } = req.body;
  try {
    const data = req.body;
    const imageFile = req.file;

    // Validation
    const schema = z.object({
      name: z.string({ required_error: "Name Is Required." }).min(2, { message: "Name Must Be At Least 2 Characters." }).max(100),
      email: z.string({ required_error: "Email Is Required." }).min(1, { message: "Email Is Required." }).email({ message: "Please Enter a Valid Email" }),
      password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least 6 Characters." }).max(100),
      speciality: z.string({ required_error: "speciality Is Required." }).min(2, { message: "speciality Must Be At Least 2 Characters." }).max(100),
      degree: z.string({ required_error: "degree Is Required." }).min(2, { message: "degree Must Be At Least 2 Characters." }).max(100),
      experience: z.string({ required_error: "experience Is Required." }).min(2, { message: "experience Must Be At Least 2 Characters." }).max(100),
      fees: z.string({ required_error: "fees Is Required." }).min(1, { message: "fees Must Be At Least 2 Characters." }).max(100),
      about: z.string({ required_error: "about Is Required." }).min(1, { message: "about Must Be At Least 2 Characters." }).max(500),
    });
    const validation = schema.safeParse(data);

    if (!validation.success) {
      return res.status(400).json({ message: validation.error.errors[0].message, success: false });
    }
    if (!data.address) {
      return res.status(400).json({ message: "Missing Details, Please Check Address Your Address.", success: false });
    }

    // Hashed Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Upload Image To Cloudainry And Get Secure_URL[Image URL [hhtps]]
    const result = (await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" }));
    const imageUrl = result.secure_url;

    // Create A New Doctor
    const doctorDetails = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      image: imageUrl,
      speciality: data.speciality,
      degree: data.degree,
      experience: data.experience,
      fees: Number(data.fees),
      address: JSON.parse(data.address),
      about: data.about,
      date: Date.now()
    };
    // Add New Doctor Has Been Created In DB
    const newDoctor = new DoctorModel(doctorDetails);
    await newDoctor.save();
    return res.status(201).json({ doctor: newDoctor, message: "Doctor Added Successfully!", success: true });
  }
  catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
/* -------------------------------------------------------------- */
/* Admin Login */
const adminLogin = async (req, res) => {
  const data = req.body;

  const schema = z.object({
    email: z.string({ required_error: "Email Is Required" }).email({ message: "Please Enter a Valid Email." }),
    password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least 6 Characters." })
  });

  const validation = schema.safeParse(data);

  if (!validation.success) {
    return res.status(400).json({ message: validation.error.errors[0].message, success: false });
  }

  if (process.env.ADMIN_EMAIL === data.email && process.env.ADMIN_PASSWORD === data.password) {

    // Generate Admin Payload 
    const adminJwtPayload = {
      email: data.email,
      password: data.password
    };

    // Generate Token
    const token = jwt.sign(adminJwtPayload, process.env.JWT_SECRET_KEY);

    return res.status(201).json({ token: token, access: true });

  } else {
    return res.status(403).json({ message: "Invalid Credentials." });
  }
};
/* */

/* 
** @Method Get
** @Route http://localhost:4000/api/doctors/list
** @Desc Get All Doctors
** @Access Public
*/
const doctorsList = async (req, res) => {
  try {
    const doctorList = await DoctorModel.find({}).select("-password");
    return res.status(200).json({ doctors: doctorList, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
/* 
** @Method Get
** @Route http://localhost:4000/api/admin/appointments
** @Desc Get All Appointments
** @Access Private [Only Admin]
*/
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({});
    return res.status(200).json({ appointments: appointments, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
/* ---------------------------------- */
/* 
** @Method Post
** @Route http://localhost:4000/api/admin/cancel-appointments
** @Desc Cancel Appointment
** @Access Private [Only Admin]
*/
const adminCancelAppointment = async (req, res) => {
  const { id, userId, docId, slotData } = req.body;

  // Get Appointment By Id
  const appointment = await AppointmentModel.findById(id);

  // Get Doctor By docId
  const doctor = await DoctorModel.findById(docId);
  let slots_booked = doctor.slots_booked; // [{}, {}]

  const filterSlotsBooked = slots_booked.filter((item) => !(item.userId === userId && item.docId === docId && item.date === slotData.date));

  // Delete appointment
  await AppointmentModel.findByIdAndDelete(id);
  // Update Slots_Booked In Doctor
  await DoctorModel.findByIdAndUpdate(docId, { slots_booked: filterSlotsBooked });

  return res.status(200).json({ success: true, message: "Appointment Cancelled Successfully!" });
};
/* ----------------------------------- */
/* 
** @Method get
** @Route http://localhost:4000/api/admin/dashboard
** @Desc Get Count Of Doctors && Get Count Of Users
** @Access Private [Only Admin]
*/
const adminDashboard = async (req, res) => {
  try {
    const users = await UserModel.find({});
    const doctors = await DoctorModel.find({});
    const appointments = await AppointmentModel.find({});

    const dashData = {
      usersCount: users.length,
      doctorsCount: doctors.length,
      appointmentsCount: appointments.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    };


    return res.status(200).json({ dashData: dashData, success: true });
  } catch (error) {
    return res.status(500).json({ message: `Internal Sevrer Error ${error.mesasage}` });
  }
};


export { adminDashboard, addDoctor, adminLogin, doctorsList, appointmentsAdmin, adminCancelAppointment };