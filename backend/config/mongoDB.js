import mongoose from "mongoose";


const conntectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/doctor-appointment`);
    console.log("DB Connection Is Successfully!");
  } catch (error) {
    console.log("Failed To Connect DB!");
  }
};
export default conntectDB;