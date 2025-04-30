import { useContext, useState } from 'react';
import { AppContext } from './../context/AppContext';
import { assets } from './../assets/assets';
import { toast } from 'react-toastify';
import axios from "axios";

const MyProfile = () => {

  const [isEdit, setIsEdit] = useState(false);
  const { userData, setUserData, getUserData, backendUrl, token } = useContext(AppContext);

  const [image, setImage] = useState(false);


  // updateUserDataHandler
  const updateUserDataHandler = async () => {

    try {

      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("phone", userData.phone);
      formData.append("gender", userData.gender);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const response = await axios.post(backendUrl + "/api/users/update-user", formData, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        await getUserData();
        setIsEdit(false);
        setImage(false);
        toast.success(response.data.message);
      } else {
        console.log(response);
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData && (
    <div className="py-16">
      <div className='w-full sm:max-w-[400px]'>
        {/* Image And Name */}
        <div>
          {/* Image */}
          {
            isEdit
              ?
              <label htmlFor='image' className='cursor-pointer relative mb-5 block w-36 h-36 rounded-full p-1 bg-gray-200 border border-primary'>
                <div className='w-full h-full relative'>
                  <img className="max-w-full rounded-full" src={image ? URL.createObjectURL(image) : userData.image} alt='user-Image' />
                  <img className="absolute bg-gray-400 top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] w-10 " src={image ? "" : assets.upload_icon} />
                </div>
                <input onChange={(event) => { setImage(event.target.files[0]); }} type='file' id='image' hidden />
              </label>
              :
              <img src={userData.image} alt="userProfile-image" className='block w-36 p-1  h-36 rounded-full border bg-gray-200 border-primary mb-2 overflow-hidden' />
          }
          {/* Name */}
          {
            isEdit
              ?
              <input className="w-[80%] border border-gray-400 rounded-md px-2 py-[2px]" type='text' value={userData.username} onChange={(event) => { setUserData((prev) => ({ ...prev, username: event.target.value })); }} />
              :
              <p className='text-2xl font-medium text-gray-700'>{userData.username}</p>
          }
        </div>
        <hr className='border-none outline-none h-[1px] w-full bg-gray-500 my-5' />
        {/* Contact Information */}
        <div className='text-sm mb-5'>
          <p className='mb-3 text-gray-600 underline'>CONTACT INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2'>
            {/* Email */}
            <p className='text-gray-600 font-medium'>Email ID:</p>
            <p className='text-blue-500 font-medium'>{userData.email}</p>
            {/* Phone */}
            <p className='text-gray-600 font-medium'>Phone:</p>
            {
              isEdit
                ? <input className="w-[80%] border border-gray-400 rounded-md px-2 py-[2px]" type='text' value={userData.phone} onChange={(event) => { setUserData((prev) => ({ ...prev, phone: event.target.value })); }} />
                : <p className='text-blue-500 font-medium'>{userData.phone}</p>
            }
            {/* Address */}
            <p className='text-gray-600 font-medium'>Address:</p>
            {
              isEdit
                ?
                <p>
                  <input className="mb-2 w-[80%] border border-gray-400 rounded-md px-2 py-[2px]" type='text' placeholder='Street' value={userData.address.line1} onChange={(event) => { setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: event.target.value } })); }} />
                  <input className="mb-2 w-[80%] border border-gray-400 rounded-md px-2 py-[2px]" type='text' placeholder='City' value={userData.address.line2} onChange={(event) => { setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: event.target.value } })); }} />
                  <input className="w-[80%] border border-gray-400 rounded-md px-2 py-[2px]" type='text' placeholder='Country' value={userData.address.line3} onChange={(event) => { setUserData((prev) => ({ ...prev, address: { ...prev.address, line3: event.target.value } })); }} />
                </p>
                :
                <p className='text-blue-500 font-medium'>
                  {userData.address.line1} {userData.address.line2}  {userData.address.line3}
                </p>
            }
          </div>
        </div>
        {/* Basic Information */}
        <div className='text-sm mb-5'>
          <p className='mb-3 text-gray-600 underline'>BASIC INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2'>
            {/* Gender */}
            <p className='text-gray-600 font-medium'>Gender:</p>
            {
              isEdit
                ?
                <select className='w-[80%] border border-gray-400 py-[2px] px-2' value={userData.gender} onChange={(event) => { setUserData((prev) => ({ ...prev, gender: event.target.value })); }}>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
                :
                <p className='text-blue-500 font-medium'>{userData.gender}</p>
            }
            {/* Date */}
            <p className='text-gray-600 font-medium'>Birthday:</p>
            {
              isEdit
                ?
                <input className="w-[80%] border border-gray-400 rounded-md px-2 py-[2px]" type='date' value={userData.dob} onChange={(event) => { setUserData((prev) => ({ ...prev, dob: event.target.value })); }} />
                :
                <p className='text-blue-500 font-medium'>{userData.dob}</p>
            }
          </div>
        </div>
        {/* Button */}
        {
          isEdit
            ? <button className='w-fit py-2 px-8 mt-5 transition-all duration-300 hover:bg-primary hover:text-white border border-gray-400 rounded-full' onClick={updateUserDataHandler}>Save Information</button>
            : <button className='w-fit py-2 px-8 mt-5 transition-all duration-300 hover:bg-primary hover:text-white border border-gray-400 rounded-full' onClick={() => { setIsEdit(true); }}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
