import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const [showFilters, setShowFilter] = useState(false);
  const [filterDoc, setFilterDocs] = useState([]);
  const { speciality } = useParams();

  const navigate = useNavigate();

  // Get Doctors & Filter Doc
  const applyFilters = () => {
    let doctorsCopy = doctors.slice();

    if (speciality) {
      doctorsCopy = doctorsCopy.filter((doctor) => doctor.speciality === speciality);
    }

    setFilterDocs(doctorsCopy);
  };

  useEffect(() => {
    applyFilters();
  }, [speciality, doctors]);

  return (
    <div className="py-10">
      <p className="text-gray-700 mb-5">Browse through the doctors specialist.</p>
      {/* Show Filter And Doctors List */}

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Filters */}
        <div onClick={() => { setShowFilter((prev) => !prev); }} className={`w-fit block sm:hidden border border-gray-300 py-1 px-3 text-base cursor-pointer rounded mb-3 ${showFilters && "bg-primary text-white"}`}>Filters</div>
        <div className={`w-full sm:w-[200px] flex-col gap-4 ${showFilters ? "flex" : "hidden"} sm:flex`}>
          <p onClick={() => { speciality === "General physician" ? navigate(`/doctors`) : navigate(`/doctors/General physician`); }} className={`border rounded-md py-1 px-3 border-gray-300 cursor-pointer ${speciality === "General physician" ? "bg-gray-200" : ""}`}>General physician</p>
          <p onClick={() => { speciality === "Gynecologist" ? navigate(`/doctors`) : navigate(`/doctors/Gynecologist`); }} className={`border rounded-md py-1 px-3 border-gray-300 cursor-pointer ${speciality === "Gynecologist" ? "bg-gray-200" : ""}`}>Gynecologist</p>
          <p onClick={() => { speciality === "Dermatologist" ? navigate(`/doctors`) : navigate(`/doctors/Dermatologist`); }} className={`border rounded-md py-1 px-3 border-gray-300 cursor-pointer ${speciality === "Dermatologist" ? "bg-gray-200" : ""}`}>Dermatologist</p>
          <p onClick={() => { speciality === "Pediatricians" ? navigate(`/doctors`) : navigate(`/doctors/Pediatricians`); }} className={`border rounded-md py-1 px-3 border-gray-300 cursor-pointer ${speciality === "Pediatricians" ? "bg-gray-200" : ""}`}>Pediatricians</p>
          <p onClick={() => { speciality === "Neurologist" ? navigate(`/doctors`) : navigate(`/doctors/Neurologist`); }} className={`border rounded-md py-1 px-3 border-gray-300 cursor-pointer ${speciality === "Neurologist" ? "bg-gray-200" : ""}`}>Neurologist</p>
          <p onClick={() => { speciality === "Gastroenterologist" ? navigate(`/doctors`) : navigate(`/doctors/Gastroenterologist`); }} className={`border rounded-md py-1 px-3 border-gray-300 cursor-pointer ${speciality === "Gastroenterologist" ? "bg-gray-200" : ""}`}>Gastroenterologist</p>
        </div>

        {/* Doctors */}
        <div className="flex-1 grid grid-cols-auto gap-x-4 gap-y-6">
          {
            filterDoc.map((doctor) => (
              <Link to={`/appointment/${doctor._id}`} key={doctor._id}>
                <div className="rounded-md overflow-hidden border border-gray-400 transition-all duration-300 hover:-translate-y-2">
                  <img src={doctor.image} alt="doctor-image" className="bg-gray-200 transition-all duration-300 hover:bg-blue-900 h-[250px] w-full" />
                  <div className="py-3 px-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className={`w-2.5 h-2.5 rounded-full ${doctor.available ? "text-green-500" : "bg-gray-500"} bg-green-500`}></p>
                      <p className={`${doctor.available ? "text-green-500" : "bg-gray-500"}`}>{doctor.available ? "Available" : "Not Available"}</p>
                    </div>
                    <p className="font-medium text-xl mb-1.5">{doctor.name}</p>
                    <p className="text-gray-600">{doctor.speciality}</p>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>

      </div>
    </div>
  );
};

export default Doctors;
