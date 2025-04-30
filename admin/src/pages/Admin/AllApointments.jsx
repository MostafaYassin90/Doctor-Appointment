import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";



const AllApointments = () => {
  const { getAllDoctors, backendUrl, aToken, allAppointments, getAllAppointments } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);


  useEffect(() => {
    if (aToken) {
      getAllAppointments();
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
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="h-[100%] w-full py-3">
      <p className="mb-4 text-xl font-semibold">All Appontments</p>

      {/* Start Table */}
      <div className="flex flex-col gap-3">
        {/* Head */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_2fr_2fr_1fr_1fr] text-sm text-gray-900 border border-gray-400 bg-white rounded-md px-3 py-3">
          <p>#</p>
          <p>Patient</p>
          {/* <p>Age</p> */}
          <p>Date&Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p className="text-center">Action</p>
        </div>
        {/* Body */}
        {
          allAppointments.map((item, index) => (
            <div key={index} className="sm:grid grid-cols-[0.5fr_2fr_2fr_2fr_1fr_1fr] text-sm text-gray-900 border border-gray-400 bg-white rounded-md px-3 py-3 items-center">
              <p className="flex items-center">{index + 1}</p>
              <div className="flex items-center gap-2 text-sm">
                <img src={item.userData.image} alt="" className="bg-gray-200 w-8 rounded-full border border-primary" />
                <p>{item.userData.username}</p>
              </div>
              {/* <p>{calculateAge(item.userData.dob)}</p> */}
              <p>{item.slotData.dayName.slice(0, 3) + " " + item.slotData.date + " " + item.slotData.monthName.slice(0, 3) + " " + item.slotData.year}</p>
              <div className="flex items-center gap-2 text-sm">
                <img src={item.docData.image} alt="" className="bg-gray-200 w-8 rounded-full border border-primary" />
                <p>{item.docData.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              {
                item.isCompleted
                  ?
                  <p className="text-green-800">Completed</p>
                  :
                  <button onClick={() => { adminCancelAppointment(item._id, item.userId, item.docId, item.slotData); }} className="w-8 h-8 rounded-full text-red-800 bg-gray-100 border border-gray-200 text-xl flex items-center justify-center mx-auto">x</button>
              }
            </div>
          ))
        }

      </div>
      {/* End Table */}
    </div>
  );
};

export default AllApointments;
