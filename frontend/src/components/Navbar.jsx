import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from './../assets/assets';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FaHandHoldingWater } from "react-icons/fa";

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const navigate = useNavigate();


  // Logout Handler
  const logoutHandler = () => {
    window.localStorage.removeItem("uToken");
    setToken("");
    navigate("/login");
  };

  return (
    <div className='mb-5 navbar py-4 border-b border-gray-400 flex items-center justify-between'>
      {/* Logo */}
      <Link to={"/"} className='flex items-cetner gap-1'>
        <FaHandHoldingWater className='text-3xl text-[#0075ff]' />
        <p className='text-3xl text-gray-700 font-semibold'>In<span className='text-[#0075ff] font-bold'>F</span>inite</p>
      </Link>
      {/* Ul */}
      <ul className='main-links hidden sm:flex items-center gap-4 text-sm font-semibold'>
        <NavLink to={"/"} className="uppercase h-[30px]"> <p className="py-1">HOME</p> <hr className='border-none h-0.5 m-auto w-3/5  bg-gray-600 hidden transition-all duration-400 outline-none' /> </NavLink>
        <NavLink to={"/doctors"} className="uppercase h-[30px]"> <p className="py-1">All Doctors</p> <hr className='border-none h-0.5 m-auto w-3/5  bg-gray-600 hidden transition-all duration-400 outline-none' /> </NavLink>
        <NavLink to={"/about"} className="uppercase h-[30px]"> <p className="py-1">About</p> <hr className='border-none h-0.5 m-auto w-3/5  bg-gray-600 hidden transition-all duration-400 outline-none' /> </NavLink>
        <NavLink to={"/contact"} className="uppercase h-[30px]"> <p className="py-1">Contact</p> <hr className='border-none h-0.5 m-auto w-3/5  bg-gray-600 hidden transition-all duration-400 outline-none' /> </NavLink>
      </ul>
      {/* Button Create Account & User Profile */}
      <div className='flex items-center gap-5'>
        {
          token
            ?
            <div className='block z-50'>
              <div className='group flex items-center gap-2 relative cursor-pointer '>
                <img src={userData.image} alt='proile-pic' className='w-9 rounded-full border border-primary p-[2px] bg-gray-200' />
                <img src={assets.dropdown_icon} alt='drop-icon' className="w-2.5 " />
                <div className='group-hover:block hidden absolute top-[100%] right-0 py-5 w-[200px]'>
                  <div className='bg-gray-200 flex flex-col gap-2 items-start p-3 rounded className="py-2 transition-all duration-300"'>
                    <button onClick={() => { navigate("/my-profile"); }} className='py-2 font-medium block transition-all duration-300 hover:text-blue-600'>My Profile</button>
                    <button onClick={() => { navigate("/my-appointments"); }} className='py-2 font-medium block transition-all duration-300 hover:text-blue-600'>My Appointments</button>
                    <button className='py-2 font-medium block transition-all duration-300 hover:text-blue-600' onClick={logoutHandler}>Logout</button>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className='hidden sm:block' onClick={() => { navigate("/register"); }}> <button className='bg-[#5f6fff] text-white rounded-full py-2 px-4 transition-all duration-400 hover:bg-[#353e8e]'>Create Account</button> </div>
        }
        {/* Toggle Menu */}
        <img src={assets.menu_icon} className='block w-7 cursor-pointer  sm:hidden' onClick={() => { setShowDropDown(true); }} />
      </div>
      {/* Drop Down For Responsive*/}
      <div className={`z-20 responsive-dropdown absolute h-screen bg-white bottom-0 top-0 right-0 transition-all overflow-hidden duration-300 ${showDropDown ? "w-full" : "w-0"}`}>
        {/* Top */}
        <div className='h-[56px] px-4 flex items-center justify-between py-4 border-b border-gray-400'>
          <Link to={"/"}>
            <img src={assets.logo} alt='logo' className='w-28 md:w-36' />
          </Link>
          <img src={assets.cross_icon} alt='close-icon' className='w-6 cursor-pointer' onClick={() => { setShowDropDown(false); }} />
        </div>
        {/* Links */}
        <ul className='text-sm font-semibold'>
          <NavLink to={"/"} className="block w-full uppercase p-4" onClick={() => { setShowDropDown(false); }}> <p>HOME</p> </NavLink>
          <hr className='border-none h-[1.5px] w-[100%]  bg-gray-200 ' />
          <NavLink to={"/doctors"} className="block w-full uppercase p-4" onClick={() => { setShowDropDown(false); }}> <p>All Doctors</p>  </NavLink>
          <hr className='border-none h-[1.5px] w-[100%]  bg-gray-200 ' />
          <NavLink to={"/about"} className="block w-full uppercase p-4" onClick={() => { setShowDropDown(false); }}> <p>About</p> </NavLink>
          <hr className='border-none h-[1.5px] w-[100%]  bg-gray-200 ' />
          <NavLink to={"/contact"} className="block w-full uppercase p-4" onClick={() => { setShowDropDown(false); }}> <p>Contact</p> </NavLink>
        </ul>
        {/* Button Create Account & User Profile */}
        {
          token
            ?
            <div className='group flex items-center gap-2 relative cursor-pointer p-4'>
              <img src={userData.image} alt='proile-pic' className='w-8 rounded-full' />
              <img src={assets.dropdown_icon} alt='drop-icon' className="w-2.5 " />
              <div className='group-hover:block hidden absolute top-[75%] left-4 py-2 w-[200px]'>
                <div className='bg-gray-200 flex flex-col gap-2 items-start p-3 rounded className="py-2 transition-all duration-300"'>
                  <button onClick={() => {
                    navigate("/my-profile");
                    setShowDropDown(false);
                  }} className='py-2 font-medium block transition-all duration-300 hover:text-blue-600'>My Profile</button>
                  <button onClick={() => {
                    navigate("/my-appointments");
                    setShowDropDown(false);
                  }} className='py-2 font-medium block transition-all duration-300 hover:text-blue-600'>My Appointments</button>
                  <button className='py-2 font-medium block transition-all duration-300 hover:text-blue-600' onClick={logoutHandler}>Logout</button>
                </div>
              </div>
            </div>
            :
            <div className='p-4' onClick={() => { navigate("/register"); setShowDropDown(false); }}> <button className='bg-[#5f6fff] text-white rounded-full py-2 px-4 transition-all duration-400 hover:bg-[#353e8e]'>Create Account</button> </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
