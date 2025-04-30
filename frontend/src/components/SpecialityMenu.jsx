import { useEffect, useState } from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";


const SpecialityMenu = () => {
  const [specialityList, setSpecialityList] = useState([]);


  useEffect(() => {
    setSpecialityList(specialityData);
  }, []);

  return (
    <div className="py-12 text-center" id="speciality">
      {/* Title */}
      <div>
        <p className="text-4xl font-medium mb-3 text-gray-900">Find by Speciality</p>
        <p className="text-gray-600 font-medium">Simply browse through our extensive list of trusted doctors,<br /> schedule your appointment hassle-free.</p>
      </div>
      {/* Speciality */}
      <div className="grid grid-cols-3 gap-y-8 md:flex gap-4 mt-10 items-center justify-center">
        {
          specialityList.map((item, index) => (
            <Link onClick={() => { scrollTo(0, 0); }} to={`/doctors/${item.speciality}`} key={index} className="z-10 text-center transition-all duration-500 hover:translate-y-[-10px]">
              <img src={item.image} alt="speciality-image" className="w-20 md:w-24 mx-auto" />
              <p className="text-sm mt-2 text-gray-600 font-medium">{item.speciality}</p>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default SpecialityMenu;
