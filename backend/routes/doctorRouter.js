import express from "express";
import { completeAppointment, doctorAppointments, doctorCancelAppointment, doctorDahboard, doctorLogin, doctorProfile, getAllDoctors, updateDoctorProfile } from "../controllers/doctorControllers.js";
import docAuth from "../middleware/docAuth.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", getAllDoctors);

doctorRouter.post("/login", doctorLogin);

doctorRouter.get("/appointments", docAuth, doctorAppointments);

doctorRouter.post("/cancel-appointment", docAuth, doctorCancelAppointment);

doctorRouter.post("/complete-appointment", docAuth, completeAppointment);

doctorRouter.get("/dashboard", docAuth, doctorDahboard);

doctorRouter.get("/profile", docAuth, doctorProfile);

doctorRouter.post("/update-profile", docAuth, updateDoctorProfile);


export default doctorRouter;