import { useContext, useEffect, useState } from "react";
import { AppContext } from './../context/AppContext';
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  // Get User Appointments
  const getUserAppointments = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/users/user-appointments", {
        headers: { authorization: "Bearer " + token }
      });;
      if (response.data.success) {
        setAppointments(response.data.appointments);
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
    getUserAppointments();
  }, [token]);

  // PayOnline By Stripe Payment
  const payOnlineHandler = async (appointmentId) => {
    const response = await axios.post(backendUrl + "/api/users/appointment-payment", { appointmentId: appointmentId }, {
      headers: { authorization: "Bearer " + token }
    });
    if (response.data.success) {
      const session_url = response.data.session_url;
      window.location.replace(session_url);
    } else {
      console.log(response);
      toast.error(response.response.data.message || response.message);
    }
  };
  // Cancel Appointment
  const cancelAppointmentHandler = async (appointmentId) => {
    try {
      const response = await axios.post(backendUrl + "/api/users/cancel-appointment", { appointmentId: appointmentId }, { headers: { authorization: "Bearer " + token } });
      if (response.data.success) {
        getUserAppointments();
        toast.success(response.data.message);
      } else {
        toast.error(response.response.data.message || response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  return appointments.length > 0 && (
    <div className="py-16">
      <p className="mb-5 text-gray-700 font-medium text-xl">My appointments</p>
      <div>
        {
          appointments.map((doctor, index) => (
            <div className="py-5 border-t border-b border-gray-300 grid grid-cols-[1fr_2fr] sm:flex gap-4" key={index}>
              {/* Image */}
              <img src={doctor.docData.image} alt="doctor-image" className="w-full sm:w-36 bg-gray-200 p-1 border border-primary" />
              {/* Details */}
              <div className="w-full flex flex-col gap-1 text-sm">
                <p className="font-medium text-gray-900 text-[18px]">{doctor.docData.name}</p>
                <p className="text-gray-600">{doctor.docData.speciality}</p>
                <p className="font-medium text-gray-700">Address:</p>
                <p className="text-gray-600">{doctor.docData.address.line1}</p>
                <p className="text-gray-600 mt-[-5px]">{doctor.docData.address.line2}</p>
                <p className="font-medium text-gray-800">Date & Time: <span className="text-gray-600 font-normal">{doctor.slotData.dayName + " " + doctor.slotData.date + " " + doctor.slotData.monthName + " " + doctor.slotData.year + " | " + doctor.slotData.time + " PM"}</span></p>
              </div>
              <div></div>
              {/* Payment */}
              <div className="flex flex-col gap-3 justify-end sm:min-w-[200px]">
                {
                  doctor.payment
                    ?
                    <p className="max-w-[200px] text-base text-green-800 py-2 px-2 border border-gray-300 rounded-md text-center font-bold">Paid</p>
                    :
                    <button onClick={() => { payOnlineHandler(doctor._id); }} className="max-w-[200px] text-sm text-gray-600 py-2 px-2 border border-gray-300 rounded-md transition-all duration-300 hover:text-white hover:bg-primary">Pay Online</button>
                }
                {
                  !doctor.payment &&
                  <button onClick={() => { cancelAppointmentHandler(doctor._id); }} className="max-w-[200px] text-sm text-gray-600 py-2 px-2 border border-gray-300 rounded-md transition-all duration-300 hover:bg-red-700  hover:text-white">Cancel Appointment</button>
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyAppointments;
