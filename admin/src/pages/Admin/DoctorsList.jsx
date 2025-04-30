import { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { AdminContext } from './../../context/AdminContext';
import axios from "axios";

const DoctorsList = () => {

  const { aToken, allDoctors, getAllDoctors, changeAvailableHandler, backendUrl } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);


  return (
    <div className="h-[100%] w-full overflow-scroll py-3">
      <p className="text-xl font-semibold mb-5">All Doctors</p>
      {/* Show All Doctors */}
      <div className="grid grid-cols-auto gap-4">
        {
          allDoctors.map((doctor, index) => (
            <div key={index} className="group overflow-hidden border cursor-pointer border-gray-300 rounded-md">
              <img src={doctor.image} alt="doctor-image" className="group-hover:bg-primary bg-gray-200 transition-all duration-500 h-[250px] w-full" />
              <div className="p-4">
                <p className="text-[18px] font-semibold">{doctor.name}</p>
                <p className="text-sm text-gray-600">{doctor.speciality}</p>
                <div className="flex items-center justify-start gap-2 text-sm font-semibold mt-2">
                  <input onChange={() => { changeAvailableHandler(doctor._id); }} type="checkbox" readOnly checked={doctor.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default DoctorsList;
