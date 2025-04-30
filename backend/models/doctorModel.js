import mongoose from "mongoose";

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  fees: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Number, required: true },
  available: { type: Boolean, default: true },
  slots_booked: { type: Array, default: [] }
}, { minimize: false });


const DoctorModel = mongoose.models.doctor || mongoose.model("Doctor", doctorSchema);

export default DoctorModel;