import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from './../../assets/assets';
import axios from "axios";
import { toast } from "react-toastify";

const DoctorAppoitments = () => {
  const { dToken, appointments, getDoctorAppointments, backendUrl, cancelAppointmentHandler, appointmentCompletedHandler } = useContext(DoctorContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDoctorAppointments();
    }
  }, [dToken]);


  return (

    <div className="w-full">
      <p className="text-xl font-semibold mb-5 text-gray-800">DoctorAppoitments</p>
      {/* Table */}
      <div>

        {/* Head */}
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] bg-white border p-3 text-sm">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className="text-center">Action</p>
        </div>

        {/* Body */}
        <div className="mt-5">
          {
            appointments.map((item, index) => (
              <div key={index} className="flex flex-wrap max-md:gap-5 justify-center sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] bg-white border p-3 text-sm items-center">
                <p>{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img src={item.userData.image} alt="user-image" className="bg-gray-200 rounded-full w-10 border border-primary" />
                  <p>{item.userData.username}</p>
                </div>
                <p>{item.userData.payment ? "paid" : "Cash"}</p>
                <p>{calculateAge(item.userData.dob)}</p>
                <p>{item.slotData.dayName.slice(0, 3) + " " + item.slotData.date + " " + item.slotData.monthName.slice(0, 3) + " " + item.slotData.year}</p>
                <p>{currency}{item.amount}</p>
                {
                  item.isCompleted ?
                    <p>Completed</p>
                    :
                    <div className="flex items-center gap-2 justify-center">
                      <img onClick={() => { cancelAppointmentHandler(item); }} src={assets.cancel_icon} alt="cancel-icon" className="cursor-pointer w-8 md:w-10 justify-centerd:w-10" />
                      <img onClick={() => { appointmentCompletedHandler(item._id); }} src={assets.tick_icon} alt="tick-icon" className="cursor-pointer w-8 md:w-10" />
                    </div>
                }
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
};

export default DoctorAppoitments;
