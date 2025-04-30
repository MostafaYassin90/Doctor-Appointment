import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
  const [allDoctors, setAllDoctors] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  // Get All Doctors
  const getAllDoctors = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/admin/all-doctors", {}, {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        setAllDoctors(response.data.doctors);
      } else {
        toast.error(response.response.data.message || response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || response.message);
    }
  };


  // Change Available Hander
  const changeAvailableHandler = async (id) => {
    try {

      const response = await axios.post(backendUrl + "/api/admin/change-availability", { id: id }, {
        headers: { authorization: "Bearer " + aToken }
      });

      if (response.data.success) {
        getAllDoctors();
        toast.success(response.data.message);
      } else {
        console.log(response.response.data.message || response.message);
        toast.error(response.response.data.message || response.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  // Get All Appointments
  const getAllAppointments = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/admin/appointments", { headers: { authorization: "Bearer " + aToken } });
      setAllAppointments(response.data.appointments);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  // Get Dashdata 
  const getDashDataHandler = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        setDashData(response.data.dashData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };


  const value = {
    aToken: aToken,
    setAToken: setAToken,
    backendUrl: backendUrl,
    allDoctors: allDoctors,
    getAllDoctors: getAllDoctors,
    changeAvailableHandler: changeAvailableHandler,
    allAppointments: allAppointments,
    setAllAppointments: setAllAppointments,
    getAllAppointments: getAllAppointments,
    dashData: dashData,
    getDashDataHandler: getDashDataHandler
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;