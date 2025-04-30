import { useParams } from "react-router-dom";
import { doctors } from "../assets/assets";
import { useEffect, useState } from "react";

const SingleDoctor = () => {
  const { doctorId } = useParams();
  const [singleDoctor, setSingleDoctor] = useState({});

  // GetSingleProduct
  const getSingleProduct = () => {
    doctors.map((doctor) => {
      if (doctor._id === doctorId) {
        setSingleDoctor(doctor);
        return null;
      }
    });
  };

  useEffect(() => {
    getSingleProduct();
  }, [doctorId]);

  return (
    <div>
      <p>ID:{doctorId}</p>
      Single Doctors
    </div>
  );
};

export default SingleDoctor;
