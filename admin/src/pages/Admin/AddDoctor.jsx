import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from 'react-toastify';
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import Loading from './../../components/Loading';

const AddDoctor = () => {
  const { aToken, backendUrl } = useContext(AdminContext);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address, setAddress] = useState({
    line1: "",
    line2: ""
  });
  const [about, setAbout] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  // OnSubmit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!image) {
        toast.error("Please Select Doctor Image");
        return;
      }
      setShowLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify(address)); // json Object => JS Object
      formData.append("about", about);

      const response = await axios.post(backendUrl + "/api/admin/add-doctor", formData, {
        headers: { authorization: "Bearer " + aToken }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setImage("");
        setName("");
        setEmail("");
        setPassword("");
        setSpeciality("General physician");
        setDegree("");
        setFees("");
        setAbout("");
        setExperience("1 Year");
        setAddress({ line1: "", line2: "" });
        scrollTo(0, 0);
        setShowLoading(false);
      } else {
        toast.success(error.response.data.message);
        scrollTo(0, 0);
        setShowLoading(false);
      }

    } catch (error) {
      setShowLoading(false);
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }

  };



  return (
    showLoading
      ?
      <Loading />
      :
      <div className="h-[100%]">
        <p className="font-semibold mb-5 text-xl">Add Doctor</p>
        <form onSubmit={onSubmitHandler} className="h-[100%] overflow-y-scroll bg-white border rounded-md shadow-sm p-5">

          {/* Image */}
          <div className='flex items-center gap-3 mb-5'>
            <label htmlFor="image">
              <input type="file" id="image" className="hidden" onChange={(event) => { setImage(event.target.files[0]); }} />
              <div className="w-20 h-20 overflow-hidden bg-gray-200 p-0.5 rounded-full border border-primary cursor-pointer">
                {
                  image
                    ?
                    <img src={URL.createObjectURL(image)} alt='upload-icom' className="max-w-[100%]" />
                    :
                    <img src={assets.upload_area} alt='upload-icom' className="max-w-[100%]" />
                }
              </div>
            </label>
            <p>Upload Doctor Picture</p>
          </div>

          {/* Start Input Fields */}
          <div className="flex flex-col items-start gap-5 lg:flex-row">
            {/* left */}
            <div className="flex-1 w-[100%] flex flex-col gap-5">
              <div className="flex-1"> {/* Name */}
                <label htmlFor="name" className="block font-semibold text-gray-600">Your Name</label>
                <input type="text" id="name" placeholder="Name" onChange={(event) => { setName(event.target.value); }} value={name} className="w-full outline-primary h-[40px] py-2 px-3 border border-gray-300 rounded-md mt-1" required />
              </div>
              <div className="flex-1"> {/* Email */}
                <label htmlFor="email" className="block font-semibold text-gray-600">Doctor Email</label>
                <input required type="email" id="email" placeholder="Email" onChange={(event) => { setEmail(event.target.value); }} value={email} className="w-full outline-primary h-[40px] py-2 px-3 border border-gray-300 rounded-md mt-1" />
              </div>
              <div className="flex-1"> {/* Password */}
                <label htmlFor="password" className="block font-semibold text-gray-600">Set password</label>
                <input required type="password" id="password" placeholder="password" onChange={(event) => { setPassword(event.target.value); }} value={password} className="w-full outline-primary h-[40px] py-2 px-3 border border-gray-300 rounded-md mt-1" />
              </div>
              <div className="flex-1"> {/* Experience */}
                <label className="block font-semibold text-gray-600">Experience</label>
                <select value={experience} onChange={(event) => (setExperience(event.target.value))} className="w-full outline-primary h-[40px] py-2 px-3 border border-gray-300 rounded-md mt-1">
                  <option value={"1 Year"}>1 Year</option>
                  <option value={"2 Years"}>2 Years</option>
                  <option value={"3 Years"}>3 Years</option>
                  <option value={"4 Years"}>4 Years</option>
                  <option value={"5 Years"}>5 Years</option>
                  <option value={"6 Years"}>6 Years</option>
                  <option value={"7 Years"}>7 Years</option>
                  <option value={"8 Years"}>8 Years</option>
                  <option value={"9 Years"}>9 Years</option>
                  <option value={"10 Years"}>10 Years</option>
                </select>
              </div>
              <div className="flex-1"> {/* Fees */}
                <label htmlFor="fees" className="block font-semibold text-gray-600">Fees</label>
                <input required type="number" id="fees" placeholder="Doctor Fees" onChange={(event) => { setFees(event.target.value); }} value={fees} className="w-full outline-primary h-[40px] py-2 px-3 border border-gray-300 rounded-md mt-1" />
              </div>
            </div>

            {/* right */}
            <div className="flex-1 w-[100%] flex flex-col gap-5">
              <div className="flex-1"> {/* Speciality */}
                <label className="block font-semibold text-gray-600">Speciality</label>
                <select value={speciality} onChange={(event) => (setSpeciality(event.target.value))} className="w-full outline-primary h-[40px] py-2 px-3 border border-gray-300 rounded-md mt-1">
                  <option value={"General physician"}>General physician</option>
                  <option value={"Gynecologist"}>Gynecologist</option>
                  <option value={"Dermatologist"}>Dermatologist</option>
                  <option value={"Pediatricians"}>Pediatricians</option>
                  <option value={"Neurologist"}>Neurologist</option>
                  <option value={"Gastroenterologist"}>Gastroenterologist</option>
                </select>
              </div>
              <div className="flex-1"> {/* Degree */}
                <label htmlFor="degree" className="block font-semibold text-gray-600">Degree</label>
                <input required type="text" id="degree" placeholder="Degree" onChange={(event) => { setDegree(event.target.value); }} value={degree} className="w-full outline-primary h-[40px] py-2 px-3 border border-gray-300 rounded-md mt-1" />
              </div>

              <div className="flex-1"> {/* Address */}
                <label className="block font-semibold text-gray-600">Adress</label>
                <input required type="text" placeholder="Address 1" onChange={(event) => { setAddress({ ...address, line1: event.target.value }); }} value={address.line1} className="w-full outline-primary h-[40px] py-2 px-3 border border-gray-300 rounded-md mt-1" />
                <input required type="text" placeholder="Address 2" onChange={(event) => { setAddress({ ...address, line2: event.target.value }); }} value={address.line2} className="w-full outline-primary h-[40px] py-2 px-3 border border-gray-300 rounded-md mt-1" />
              </div>
            </div>

          </div>
          {/* Start Input Fields */}
          {/* About */}
          <div className="my-5">
            <label htmlFor="about" className="block font-semibold text-gray-600">About Doctor</label>
            <textarea required placeholder="Write About Doctor." id="about" onChange={(event) => { setAbout(event.target.value); }} value={about} className="block h-[150px] w-full outline-primary py-2 px-3 border border-gray-300 rounded-md mt-1" />
          </div>
          {/* Submit Button */}
          <button type="submit" className="w-fit py-3 px-8 text-white bg-primary rounded-full">Add Doctor</button>
        </form>
      </div>
  );
};

export default AddDoctor;
