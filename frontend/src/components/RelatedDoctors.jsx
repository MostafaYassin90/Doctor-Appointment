import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relatedDocList, setRelatedDocList] = useState([]);
  const navigate = useNavigate();

  // Get Related Doctors List
  const getRelatedDocList = () => {
    let doctorsCopy = doctors.slice();
    let doctorsData = doctorsCopy.filter((doctor) => doctor.speciality === speciality && doctor._id !== docId);
    setRelatedDocList(doctorsData);
  };

  useEffect(() => {
    getRelatedDocList();
  }, [speciality, docId, doctors]);

  return (
    <div className="py-16">
      {/* Title */}
      <div className="mb-7 text-center">
        <p className="text-2xl font-medium text-gray-900">Related Doctors</p>
        <p className="text-gray-600">Simply browse through our extensive list of trusted doctors.</p>
      </div>
      {/* Show Related Doctors */}
      <div className="grid grid-cols-auto gap-5">
        {
          relatedDocList.map((doctor) => (
            <div key={doctor._id} className="cursor-pointer"
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
            >
              <div className="rounded-md overflow-hidden border border-gray-400 transition-all duration-300 hover:-translate-y-2">
                <img src={doctor.image} alt="doctor-image" className="bg-gray-200 transition-all duration-300 hover:bg-blue-900 h-[250px]" />
                <div className="py-3 px-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className={`w-2.5 h-2.5 rounded-full ${doctor.available ? "text-green-500" : "bg-gray-500"} bg-green-500`}></p>
                    <p className={`${doctor.available ? "text-green-500" : "bg-gray-500"}`}>{doctor.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className="font-medium text-xl mb-1.5">{doctor.name}</p>
                  <p className="text-gray-600">{doctor.speciality}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default RelatedDoctors;
