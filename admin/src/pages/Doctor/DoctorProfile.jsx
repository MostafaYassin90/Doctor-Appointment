import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getDoctorProfile, backendUrl, currency } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);
  console.log(profileData);

  // Update Doctor Profile
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      };
      const response = await axios.post(backendUrl + "/api/doctor/update-profile", updateData, {
        headers: { authorization: "Bearer " + dToken }
      });
      console.log(response);
      if (response.data.success) {
        getDoctorProfile();
        setIsEdit(false);
        toast.success(response.data.message);
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
    if (dToken) {
      getDoctorProfile();
    }
  }, [dToken]);

  return profileData && (
    <div>
      {/* Profile */}
      <div className="flex flex-col gap-4">

        {/* Image */}
        <div> <img src={profileData.image} alt="doctor-image" className="bg-primary/80 w-full sm:w-64 rounded-lg" /> </div>

        {/* Doc Info: Name, Degree,speciality, Experience */}
        <div className="bg-white p-5 border border-gra-200 rounded-lg flex-1">
          <p className="mb-1 text-2xl text-gray-800 font-semibold">{profileData.name}</p>
          <div className="flex items-center gap-2 text-gray-600">
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className="w-fit rounded-full bg-white border border-gray-200 text-sm py-0.5 px-3">{profileData.experience}</button>
          </div>
          {/* About */}
          <div className="mt-3">
            <p>About:</p>
            <p className="mt-1 text-sm text-gray-600 max-w-[700px]">{profileData.about}</p>
          </div>
          {/* Fees */}
          <p className="text-gray-600 font-semibold mt-4">Appointment Fees: <span className="text-gray-800">{currency} {isEdit ? <input type="number" value={profileData.fees} onChange={(event) => { setProfileData((prev) => ({ ...prev, fees: event.target.value })); }} className="border border-gray-300 p-1 rounded-lg" /> : profileData.fees}</span></p>
          {/* Address */}
          <div className="my-2 flex gap-2 text-sm text-gray-600 font-semibold">
            <p>Address:</p>
            <p>
              {isEdit ? <input type="text" value={profileData.address.line1} onChange={(event) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line1: event.target.value } }))} className="border border-gray-300 p-1 rounded-lg" /> : profileData.address.line1}
              <br />
              {isEdit ? <input type="text" value={profileData.address.line2} onChange={(event) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line2: event.target.value } }))} className="border border-gray-300 p-1 rounded-lg" /> : profileData.address.line1}
            </p>
          </div>
          {/* Available */}
          <div className="flex gap-1 items-center pt-2">
            <input onChange={() => isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" id="ava" />
            <label htmlFor="ava">Available</label>
          </div>
          {/* Button */}
          {
            isEdit
              ?
              <button onClick={updateProfile} className="block border border-primary px-5 py-1 rounded-full my-5 transition-all duration-300 hover:bg-primary hover:text-white">Save Changes</button>
              :
              <button onClick={() => { setIsEdit(true); }} className="block border border-primary px-5 py-1 rounded-full my-5 transition-all duration-300 hover:bg-primary hover:text-white">Edit</button>
          }

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
