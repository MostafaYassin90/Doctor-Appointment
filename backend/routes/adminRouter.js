import express from "express";
import { addDoctor, adminCancelAppointment, adminDashboard, adminLogin, appointmentsAdmin, doctorsList } from "../controllers/adminControllers.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { changeAvalibility } from "../controllers/doctorControllers.js";


const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.post("/add-doctor", adminAuth, upload.single("image"), addDoctor);

adminRouter.post("/all-doctors", adminAuth, doctorsList);

adminRouter.post("/change-availability", adminAuth, changeAvalibility);

adminRouter.get("/appointments", adminAuth, appointmentsAdmin);

adminRouter.post("/cancel-appointment", adminAuth, adminCancelAppointment);

adminRouter.get("/dashboard", adminAuth, adminDashboard);

export default adminRouter;