import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dToken, getDashboard, dashData, cancelAppointmentHandler, appointmentCompletedHandler, currency } = useContext(DoctorContext);

  console.log(dashData);

  useEffect(() => {
    if (dToken) {
      getDashboard();
    }
  }, [dToken]);


  return dashData && (
    <div className="w-full lg:w-[80%]">
      {/* Start Show Count */}
      <div className="flex items-center justify-between gap-4">
        {/* Doctors */}
        <div className="bg-white w-full py-3 px-5 rounded-md flex flex-col items-center gap-3 lg:flex-row ">
          <img src={assets.doctor_icon} alt="dcotor-icon" />
          <div className="text-center">
            <p className="text-xl font-semibold">{currency}{dashData.earnings}</p>
            <p className="text-gray-600">Earnings</p>
          </div>
        </div>
        {/* Appointments */}
        <div className="bg-white w-full py-3 px-5 rounded-md flex flex-col items-center  gap-3 lg:flex-row ">
          <img src={assets.appointments_icon} alt="dcotor-icon" />
          <div className="text-center">
            <p className="text-xl font-semibold">{dashData.appointments}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>
        {/* Pattient */}
        <div className="bg-white w-full py-3 px-5 rounded-md flex flex-col items-center gap-3 lg:flex-row">
          <img src={assets.patients_icon} alt="dcotor-icon" />
          <div className="text-center">
            <p className="text-xl font-semibold">{dashData.patients}</p>
            <p className="text-gray-600">Pattient</p>
          </div>
        </div>
      </div>
      {/* End Show Count */}
      {/* Show Latest Appointments */}
      <div className="w-full bg-white mt-10 rounded-md">
        {/* Header */}
        <div className="flex items-center gap-3 p-5">
          <img src={assets.list_icon} alt="" />
          <p className="text-[18px] text-gray-800">Latest Appointment</p>
        </div>
        <hr className="border-none h-[2px] w-full bg-primary" />
        {/* Appointments */}
        <div>
          {
            dashData && dashData.latestAppointments.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-5 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <img src={item.userData.image} alt="pattient-image" className="w-10 bg-gray-200 rounded-full border border-primary" />
                  <div>
                    <p>{item.userData.username}</p>
                    <p>{item.slotData.date + "Th " + item.slotData.monthName + ", " + item.slotData.year}</p>
                  </div>
                </div>
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

export default DoctorDashboard;
