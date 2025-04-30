import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export const DoctorContext = createContext();


const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const currency = "$";

  // Get Doctor Appointments
  const getDoctorAppointments = async () => {
    try {
      const response = await axios(backendUrl + "/api/doctor/appointments", {
        headers: { authorization: "Bearer " + dToken }
      });
      if (response.data.success) {
        setAppointments(response.data.appointments);
      } else {
        console.log(response);
        toast.error(response.response.data.message || response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };
  // Cancel Appointment Handler
  const cancelAppointmentHandler = async (item) => {
    try {
      const response = await axios.post(backendUrl + "/api/doctor/cancel-appointment", item, { headers: { authorization: "Bearer " + dToken } });
      console.log(response);
      if (response.data.success) {
        getDoctorAppointments();
        getDashboard();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };
  // Appointment Completed Handler
  const appointmentCompletedHandler = async (appointmentId) => {
    try {
      const response = await axios.post(backendUrl + "/api/doctor/complete-appointment", { appointmentId }, { headers: { authorization: "Bearer " + dToken } });
      console.log(response);
      if (response.data.success) {
        getDoctorAppointments();
        getDashboard();
        toast.success(response.data.message);
      } else {
        console.log(response);
        toast.error(response.response.data.message || response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };
  // Get Count Of Patients & Earnings &  Appointemtns & Latest Appontments
  const getDashboard = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { authorization: "Bearer " + dToken }
      });
      console.log(response);
      if (response.data.success) {
        setDashData(response.data.dashData);
      } else {
        console.log(response);
        toast.error(response.response.data.message || response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  // Get Doctor Profile
  const getDoctorProfile = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { authorization: "Bearer " + dToken }
      });
      console.log(response);
      if (response.data.success) {
        setProfileData(response.data.doctor);
      } else {
        console.log(response);
        toast.error(response.response.data.message || response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  const value = {
    currency: currency,
    dToken: dToken,
    setDToken: setDToken,
    backendUrl: backendUrl,
    appointments: appointments,
    getDoctorAppointments: getDoctorAppointments,
    dashData: dashData,
    getDashboard: getDashboard,
    cancelAppointmentHandler: cancelAppointmentHandler,
    appointmentCompletedHandler: appointmentCompletedHandler,
    getDoctorProfile: getDoctorProfile,
    profileData: profileData,
    setProfileData: setProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextProvider;