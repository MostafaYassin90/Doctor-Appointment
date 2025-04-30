import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { useContext, useState } from "react";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointments from './pages/Admin/AllApointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppoitments from './pages/Doctor/DoctorAppoitments';
import DoctorProfile from './pages/Doctor/DoctorProfile';



const App = () => {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" theme="colored" />
      {
        aToken || dToken
          ?
          <>
            <Navbar />
            <hr />
            {/* SideBar And Content */}
            <div className="holder-content flex w-full">
              {/* SideBar */}
              <div className="sidebar h-[100%] py-8 w-fit md:w-[280px] bg-white border-r ">
                <Sidebar />
              </div>
              {/* Content */}
              <div className="flex-1 relative h-[100%] px-[3vw] py-8">
                <Routes>
                  {/* Admin Route */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="admin-dahsboard" element={<Dashboard />} />
                  <Route path="all-appointments" element={<AllApointments />} />
                  <Route path="add-doctor" element={<AddDoctor />} />
                  <Route path="doctors-list" element={<DoctorsList />} />
                  {/* Doctor Route */}
                  <Route path="doctor-dashboard" element={<DoctorDashboard />} />
                  <Route path="doctor-appointments" element={<DoctorAppoitments />} />
                  <Route path="doctor-profile" element={<DoctorProfile />} />
                </Routes>
              </div>
            </div>
          </>
          :
          <div className="w-full h-screen flex items-center justify-center px-[3vw]">
            <Login />
          </div>
      }
    </div>
  );
};

export default App;
