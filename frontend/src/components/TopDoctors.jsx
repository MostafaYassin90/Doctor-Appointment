import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="py-10">
      {/* Title */}
      <div className="text-center">
        <p className="text-4xl font-medium mb-3 text-gray-900">Top Doctors to Book</p>
        <p>Simply browse through our extensive list of trusted doctors.</p>
      </div>
      {/* Show Top Doctors */}
      <div className="mt-10 grid grid-cols-auto gap-5">
        {
          doctors.slice(0, 10).map((doctor) => (
            <Link to={`/appointment/${doctor._id}`} key={doctor._id}>
              <div className="rounded-md overflow-hidden border border-gray-400 transition-all duration-300 hover:-translate-y-2">
                <img src={doctor.image} alt="doctor-image" className="bg-gray-200 transition-all duration-300 hover:bg-blue-900" />
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
      {/* More Button To Go All Doctors Page */}
      <button onClick={() => { navigate("/doctors"); scrollTo(0, 0); }}
        className="block  mt-12 mx-auto w-fit py-2 px-8 rounded-full bg-slate-900 text-white transition duration-300 hover:bg-slate-700">More</button>
    </div>
  );
};

export default TopDoctors;
