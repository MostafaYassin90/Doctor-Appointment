import express from "express";
import cors from "cors";
import conntectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import "dotenv/config";


// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect DB & Cloudinday
await conntectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());


// EndPoints
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// App Listen
app.listen(port, () => {
  console.log("Server Is Working.");
});