
import { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from './../context/DoctorContext';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logoutHandler = () => {
    aToken && localStorage.removeItem("aToken");
    aToken && setAToken("");
    dToken && localStorage.removeItem("dToken");
    dToken && setDToken("");
    navigate("/");
  };

  return (
    <div className="px-[3vw] h-[70px] py-4 bg-white w-full  flex items-center justify-between">

      <div className="flex items-center gap-2">
        <img src={assets.admin_logo} alt="admin-logo" className="w-40" />
        <p className="border border-gray-400 rounded-full py-0.5 text-gray-600 px-3 text-sm">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      <button onClick={logoutHandler} className="flex items-center justify-center py-[6px]  px-8 text-white bg-primary rounded-full">Logout</button>
    </div>
  );
};

export default Navbar;
