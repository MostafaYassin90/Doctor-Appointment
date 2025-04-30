import { useContext, useEffect } from "react";
import { AdminContext } from './../../context/AdminContext';
import { assets } from './../../assets/assets';
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const { dashData, getDashDataHandler, aToken, getAllDoctors, getAllAppointments, backendUrl } = useContext(AdminContext);


  useEffect(() => {
    if (aToken) {
      getDashDataHandler();
    }
  }, [aToken]);

  // Cancel Appointment
  const adminCancelAppointment = async (id, userId, docId, slotData) => {
    try {
      const response = await axios.post(backendUrl + "/api/admin/cancel-appointment", { id: id, userId: userId, docId: docId, slotData: slotData }, {
        headers: { authorization: "Bearer " + aToken }
      });
      console.log(response);
      if (response.data.success) {
        getAllAppointments();
        getAllDoctors();
        getDashDataHandler();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full lg:w-[80%]">
      {/* Start Show Count */}
      <div className="flex items-center justify-between gap-4">
        {/* Doctors */}
        <div className="bg-white w-full py-3 px-5 rounded-md flex flex-col items-center gap-3 lg:flex-row">
          <img src={assets.doctor_icon} alt="dcotor-icon" />
          <div>
            <p className="text-xl font-semibold">{dashData.doctorsCount}</p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>
        {/* Appointments */}
        <div className="bg-white w-full py-3 px-5 rounded-md flex flex-col items-center gap-3 lg:flex-row">
          <img src={assets.appointments_icon} alt="dcotor-icon" />
          <div>
            <p className="text-xl font-semibold">{dashData.appointmentsCount}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>
        {/* Pattient */}
        <div className="bg-white w-full py-3 px-5 rounded-md flex flex-col items-center gap-3 lg:flex-row">
          <img src={assets.patients_icon} alt="dcotor-icon" />
          <div>
            <p className="text-xl font-semibold">{dashData.usersCount}</p>
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
                    <p>{item.docData.name}</p>
                    <p>Booked On {item.slotData.date + "Th" + item.slotData.monthName + "," + item.slotData.year}</p>
                  </div>
                </div>
                {
                  item.isCompleted
                    ?
                    <p className="text-green-800">Completed</p>
                    :
                    <img onClick={() => { adminCancelAppointment(item._id, item.userId, item.docId, item.slotData); }} src={assets.cancel_icon} alt="cancel-icon" className="cursor-pointer" />
                }
              </div>
            ))
          }
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
