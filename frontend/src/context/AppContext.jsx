import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import { toast } from 'react-toastify';
import axios from "axios";

export const AppContext = createContext();


function AppContextProvider(props) {

  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("uToken") ? localStorage.getItem("uToken") : "");


  // Get All Doctors
  const getAllDoctors = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/doctor/list");
      if (response.data.success) {
        setDoctors(response.data.doctors);
      } else {
        toast.error(response.response.data.message || response.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  // Get User Data
  const getUserData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/users/user", { headers: { authorization: "Bearer " + token } });
      if (response.data.success) {
        setUserData(response.data.user);
      } else {
        console.log(error);
        toast.error(error.response.data.message || error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const value = {
    doctors: doctors,
    getAllDoctors: getAllDoctors,
    currencySymbol: currencySymbol,
    backendUrl: backendUrl,
    token: token,
    setToken: setToken,
    userData: userData,
    setUserData: setUserData,
    getUserData: getUserData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;