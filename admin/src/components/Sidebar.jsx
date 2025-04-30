import { NavLink } from "react-router-dom";
import { assets } from '../assets/assets';
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from './../context/DoctorContext';


const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return (
    <>
      {
        aToken &&
        <ul className="links flex flex-col w-full">
          <NavLink to={"/admin-dahsboard"} className="flex items-center gap-3 cursor-pointer py-4 px-[3vw] border-b ">
            <img src={assets.home_icon} alt='home-icon' />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink to={"/all-appointments"} className="flex items-center gap-3 cursor-pointer py-4 px-[3vw] border-b ">
            <img src={assets.appointment_icon} alt='home-icon' />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink to={"/add-doctor"} className="flex items-center gap-3 cursor-pointer py-4 px-[3vw] border-b ">
            <img src={assets.add_icon} alt='home-icon' />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink to={"/doctors-list"} className="flex items-center gap-3 cursor-pointer py-4 px-[3vw] ">
            <img src={assets.people_icon} alt='home-icon' />
            <p className="hidden md:block">Doctor List</p>
          </NavLink>
        </ul>
      }
      {
        dToken &&
        <ul className="links flex flex-col w-full">
          <NavLink to={"/doctor-dashboard"} className="flex items-center gap-3 cursor-pointer py-4 px-[3vw] border-b ">
            <img src={assets.home_icon} alt='home-icon' />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink to={"/doctor-appointments"} className="flex items-center gap-3 cursor-pointer py-4 px-[3vw] border-b ">
            <img src={assets.appointment_icon} alt='home-icon' />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink to={"/doctor-profile"} className="flex items-center gap-3 cursor-pointer py-4 px-[3vw] ">
            <img src={assets.people_icon} alt='home-icon' />
            <p className="hidden md:block">Doctor Profile</p>
          </NavLink>
        </ul>
      }
    </>
  );
};

export default Sidebar;
