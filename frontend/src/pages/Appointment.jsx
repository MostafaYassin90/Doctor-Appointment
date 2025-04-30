import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";

const Appointment = () => {
  const { doctors, currencySymbol, backendUrl, token, getAllDoctors } = useContext(AppContext);
  const { docId } = useParams();
  const [singelDoctor, setSingleDoctor] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotTime, setSlotTime] = useState(null);

  const navigate = useNavigate();

  // Get Single Doctor
  const getSingleDoctor = () => {
    let findDoctor = doctors.find((doctor) => doctor._id === docId);
    setSingleDoctor(findDoctor);
  };

  // Get Available Slots
  const getAvailableSlots = () => {
    let collectSlots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today); // thu 23 jun 2025
      currentDate.setDate(today.getDate() + i);
      collectSlots.push({
        mainDate: currentDate,
        date: `${currentDate.getDate()}`,
        dayName: `${currentDate.toLocaleDateString('en-US', { weekday: 'long' })}`,
        monthName: `${currentDate.toLocaleString('en-US', { month: 'long' })}`,
        time: `${currentDate.getDate() % 2 ? "4:00 To 9:00" : "6:00 To 11:00"}`,
        year: `${currentDate.getFullYear()}`
      });
    }
    setDocSlots(collectSlots);
  };

  const bookAppointmentHandler = async () => {
    if (!token) {
      toast.info("Please Login First To Book Appointment");
      return navigate("/login");
    }
    try {
      if (!slotTime) {
        toast.info("Please Select Your Slots");
        return null;
      }
      const response = await axios.post(backendUrl + "/api/users/book-appointment", { docId: docId, soltData: slotTime }, {
        headers: {
          authorization: "Bearer " + token
        }
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        getAllDoctors();
        navigate("/my-appointments");
      } else {
        console.log(response);
        toast.error(response.response.data.message || response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getSingleDoctor();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [singelDoctor]);

  return (
    <div>
      {/* Doctor Details */}
      {
        singelDoctor &&
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
          {/* Image */}
          <div className="w-full  sm:w-[310px] sm:h-[310px] bg-primary rounded-md border border-gray-200 ">
            <img src={singelDoctor.image} alt="doctor-image" className="mx-auto h-[500px] sm:max-h-[100%]" />
          </div>
          {/* Details */}
          <div className="w-[97%] sm:flex-1 translate-y-[-70px] sm:translate-y-0 bg-white mx-auto p-8 border rounded-md border-gray-400 min-h-[310px]">
            {/* Name */}
            <div className="flex items-center gap-3 mb-3">
              <p className="font-medium text-3xl text-gray-700 leading-normal">{singelDoctor.name}</p>
              <img src={assets.verified_icon} alt="verified-icon" className="w-5" />
            </div>
            {/* Degree &  Speciality & Experience */}
            <div className="flex items-center gap-3 text-gray-600">
              <p>{singelDoctor.degree} - {singelDoctor.speciality}</p>
              <p className="text-xs border border-gray-300 rounded-full py-[2px] px-2 cursor-pointer">{singelDoctor.experience}</p>
            </div>
            {/* About */}
            <div className="flex itens-center gap-1 mt-3 mb-1 text-sm"> <p>About</p> <img src={assets.info_icon} alt="info-image" className="w-3" /> </div>
            <p className="text-gray-600 text-sm w-[80%]">{singelDoctor.about}</p>
            {/* Appointment & fee */}
            <p className="mt-5 text-gray-600 font-medium">Appointment fee: <span className="font-bold text-black">{currencySymbol}{singelDoctor.fees}</span></p>
          </div>
        </div>
      }
      {/* Booking Slots */}
      <div className="py-10">
        <p className="text-gray-600 mb-5">Booking slots</p>
        {/* Slots */}
        <div className="grid grid-cols-auto gap-5">
          {
            docSlots.length && docSlots.map((item, index) => (
              <div key={index} className={`shadow  border border-gray-200 rounded-md py-2 px-3 cursor-pointer transition duration-300 ${slotTime && item.date === slotTime.date ? "bg-primary text-white" : "bg-gray-50 hover:bg-gray-300"}`}
                onClick={() => {
                  // if (item.time.charAt(0) === "4" && new Date().getHours() % 12 > 9) {
                  //   toast.error("Sorry for the delay, you can make an appointment the next day.");
                  //   return null;
                  // }
                  // if (item.time.charAt(0) === "6" && new Date().getHours() % 12 > 11) {
                  //   toast.error("Sorry for the delay, you can make an appointment the next day.");
                  //   return null;
                  // }
                  setSlotTime(item);
                }}
              >
                <div className="flex justify-center">
                  <p>{item.dayName} - {item.date}</p>
                </div>
                <div className="flex justify-center text-sm">
                  <p>{item.time}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {/* Submit Button */}
      <div>
        <button onClick={bookAppointmentHandler} className=" bg-primary text-white text-base font-medium rounded-full py-2 px-10 transition-all duration-300 hover:bg-slate-700">Book An Appointment</button>
      </div>
      {/* Related Doctors By Speciality */}
      {
        singelDoctor &&
        <RelatedDoctors docId={singelDoctor._id} speciality={singelDoctor.speciality} />
      }
    </div>
  );
};

export default Appointment;
