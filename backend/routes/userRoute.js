import express from "express";
import { userRegister, userLogin, getAllUsers, getSingleUser, updateSingleUser, bookAppointment, getUserAppointments, cancelAppointment, appointmentPayment, verifyPayment } from "../controllers/userControllers.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";
import upload from './../middleware/multer.js';

const userRouter = express.Router();

userRouter.post("/register", userRegister);

userRouter.post("/login", userLogin);

userRouter.get("/user", userAuth, getSingleUser);

userRouter.post("/update-user", upload.single("image"), userAuth, updateSingleUser);

userRouter.post("/book-appointment", userAuth, bookAppointment);

userRouter.get("/user-appointments", userAuth, getUserAppointments);

userRouter.post("/cancel-appointment", userAuth, cancelAppointment);

userRouter.post("/appointment-payment", userAuth, appointmentPayment);
userRouter.post("/verify", verifyPayment);


userRouter.get("/list", adminAuth, getAllUsers);


export default userRouter;