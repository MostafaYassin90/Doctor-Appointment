import DoctorModel from "../models/doctorModel.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import AppointmentModel from './../models/appointmentModel.js';
/* 
** @Method Post
** @Route http://localhost:4000/api/admin/change-availability
** @Desc Change Doctor Available 
** @Access Private
*/

const changeAvalibility = async (req, res) => {
  try {
    const { id } = req.body;

    // Get Single Doctor By Id
    const findDoctor = await DoctorModel.findById(id);

    if (!findDoctor) {
      return res.status(404).json({ message: "Doctor Not Found", success: false });
    }

    const changeDocAva = await DoctorModel.findByIdAndUpdate(id, {
      $set: {
        available: findDoctor.available ? false : true
      }
    }, { new: true });

    return res.status(200).json({ doctorUpdatedAva: changeDocAva, message: "Avilability Changed", success: true });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }

};

/* ------------------------------------------- */
/* 
** @Method Get
** @Route http://localhost:4000/api/doctor/list
** @Desc Get All Doctors
** @Access Public
*/
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({});
    return res.status(200).json({ doctors: doctors, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
/* ------------------------------------------- */
/* 
** @Method Post
** @Route http://localhost:4000/api/doctor/login
** @Desc Doctor Login
** @Access Private [Doctor Only]
*/
const doctorLogin = async (req, res) => {

  try {
    const data = await req.body;

    const scheme = z.object({
      email: z.string({ required_error: "BackEnd, Email Is Required" }).email({ message: "Please  Enter a Valid Email." }),
      password: z.string({ required_error: "Password Is Required" }).min(6, { message: "password Must Be At Least 6 Characters" })
    });

    const validation = scheme.safeParse(data);

    if (!validation.success) {
      return res.status(400).json({ message: validation.error.errors[0].message, success: false });
    }
    // Find Doctor By Email
    const findDoctorByEmail = await DoctorModel.findOne({ email: data.email });

    if (!findDoctorByEmail) {
      return res.status(400).json({ message: "Email Or Password Is Wrong.", success: false });
    }
    // Compare Doctor Password In DB With Login Password
    const comparePassword = await bcrypt.compare(data.password, findDoctorByEmail.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Email Or Password Is Wrong.", success: false });
    }

    // Generate Token For Doctor
    const jwtDoctorPayload = {
      id: findDoctorByEmail._id,
      name: findDoctorByEmail.name
    };
    const token = jwt.sign(jwtDoctorPayload, process.env.JWT_SECRET_KEY);

    // Desstructured Doctor To Remove Password
    const { password, ...other } = findDoctorByEmail._doc;

    return res.status(201).json({ doctor: { ...other, token }, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal Server Error ${error.message}` });
  }

};
/* ------------------------------------------- */
/* 
** @Method Post
** @Route http://localhost:4000/api/doctor/appointments
** @Desc Get Appointmetns Of This Doctor 
** @Access Private [Doctor Only]
*/
const doctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;

    const doctorAppointments = await AppointmentModel.find({ docId: docId });

    return res.status(200).json({ appointments: doctorAppointments, success: true });

  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error ${error.message}` });
  }
};
/* ------------------------------------------- */
/* 
** @Method Post
** @Route http://localhost:4000/api/doctor/cancel-appointments
** @Desc Doctor Can Cancel Appointment
** @Access Private [Doctor Only]
*/
const doctorCancelAppointment = async (req, res) => {
  const item = await req.body;
  // Get Single Appointment
  const appointment = await AppointmentModel.findById(item._id);
  // Find Doctor
  const doctor = await DoctorModel.findById(item.docId);

  // Get Slots-booked Inside Doctor
  const slotsData = doctor.slots_booked;
  const filteringSlosBooked = slotsData.filter((slot) => !(slot.userId === appointment.userId && slot.docId === appointment.docId && slot.date === appointment.slotData.date));

  // Update Slots_booked Inside Doctor
  await DoctorModel.findByIdAndUpdate(item.docId, { slots_booked: filteringSlosBooked });
  // Delete Appointment
  await AppointmentModel.findByIdAndDelete(item._id);

  return res.status(200).json({ message: "Appointment Cancelled Successfully!", success: true });
};
/* ------------------------------------------- */
/* 
** @Method Post
** @Route http://localhost:4000/api/doctor/complete-appointment
** @Desc Doctor Can Mark On Appointment When Completed
** @Access Private [Doctor Only]
*/
const completeAppointment = async (req, res) => {
  try {

    const { docId, appointmentId } = await req.body;
    const appointment = await AppointmentModel.findById(appointmentId);
    if (appointment && appointment.docId === docId) {
      await AppointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.status(200).json({ success: true, message: "Appointment Completed Successfully!" });
    } else {
      return res.status(400).json({ success: true, message: "Mark Failed!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error ${error.message}` });
  }
};
/* ------------------------------------------- */
/* 
** @Method Post
** @Route http://localhost:4000/api/doctor/dashboard
** @Desc Doctor Can Get total Number Of Patients & appointments
** @Access Private [Doctor Only]
*/
const doctorDahboard = async (req, res) => {
  try {
    const { docId } = await req.body;

    // Get Appointments Of This Doc
    const appointments = await AppointmentModel.find({ docId: docId });

    // Get Earnings
    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted) {
        earnings += item.amount;
      }
    });

    // Get Count Of User For This Doctor
    let patients = [];  // => userId
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings: earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.slice(0.5)
    };
    return res.status(200).json({ success: true, dashData: dashData });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error ${error.message}` });
  }
};

/* ------------------------------------------- */
/* 
** @Method Post
** @Route http://localhost:4000/api/doctor/profile
** @Desc Get Doctor Profile 
** @Access Private [Doctor Only]
*/
const doctorProfile = async (req, res) => {
  try {
    const { docId } = await req.body;
    const doctor = await DoctorModel.findById(docId).select('-password');
    return res.status(200).json({ doctor: doctor, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal Server Error ${error.message}`, success: false });
  }
};
/* ------------------------------------------- */
/* 
** @Method Post
** @Route http://localhost:4000/api/doctor/update-profile
** @Desc Update Doctor Profile 
** @Access Private [Doctor Only]
*/
const updateDoctorProfile = async (req, res) => {
  try {

    const { docId, fees, address, available } = await req.body;

    const profileUpdated = await DoctorModel.findByIdAndUpdate(docId, { fees, address, available });
    return res.status(200).json({ profileUpdated: profileUpdated, success: true, message: "Profile Updated Successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal Server Error ${error.message}`, success: false });
  }
};

export {
  changeAvalibility,
  getAllDoctors,
  doctorLogin,
  doctorAppointments,
  doctorCancelAppointment,
  completeAppointment,
  doctorDahboard,
  doctorProfile,
  updateDoctorProfile
};