import { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { z } from "zod";
import axios from 'axios';
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {

  const [state, setState] = useState("admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { aToken, setAToken, backendUrl } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  // Schema For Email And Password
  const schema = z.object({
    email: z.string({ required_error: "Email Is Requried." }).email({ message: "Please Enter a Valied Email" }),
    password: z.string({ required_error: "Password Is Required" }).min(6, { message: "Password Must Be At Least 6 Characters." }).max(200)
  });



  // On Submit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const validation = schema.safeParse({ email, password });

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
    }

    try {
      const adminDetails = {
        email: email,
        password: password
      };
      if (state === "admin") {
        const response = await axios.post(backendUrl + "/api/admin/login", adminDetails);
        if (response.data.access === true) {
          window.localStorage.setItem("aToken", response.data.token);
          setAToken(response.data.token);
        } else {
          console.log(response);
          toast.error(response.response.data.message || response.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/doctor/login", adminDetails);
        if (response.data.success) {
          setDToken(response.data.doctor.token);
          window.localStorage.setItem("dToken", response.data.doctor.token);
        } else {
          console.log(response);
          toast.error(response.response.data.message || response.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }

  };

  return (
    <div>
      <div className="w-full sm:w-[450px]  mb-5 p-5 bg-white shadow-md border rounded-md">
        <p className="text-gray-700 font-semibold text-xl text-center">Email: admin@gmail.com</p>
        <p className="text-gray-700 font-semibold text-xl text-center">Password: admin123</p>
      </div>
      <div className="w-full sm:w-[450px] p-5 bg-white shadow-md border rounded-md">
        <p className="text-center mb-5 text-2xl font-bold text-gray-600"> <span className="text-primary ">{state === "admin" ? "Admin" : "Doctor"}</span> Login</p>
        <form onSubmit={onSubmitHandler}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-gray-600">Email</label>
            <input value={email} onChange={(event) => { setEmail(event.target.value); }} required type="email" id="email" className="w-full py-2 px-3 border rounded-md mb-5 mt-1 border-gray-300" />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="text-gray-600">Password</label>
            <input value={password} onChange={(event) => { setPassword(event.target.value); }} required type="password" id="password" className="w-full py-2 px-3 border rounded-md mb-5 mt-1 border-gray-300" />
          </div>
          {/* Submit Button */}
          <button type="submit" className="w-full bg-primary text-white rounded-md py-2 px-3 font-semibold">Login</button>
        </form >
        {/* Switch Between Doctor Login & Admin Login */}
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-gray-600">
          {
            state === "admin"
              ?
              <>
                <p>Doctor Login?</p>
                <button onClick={() => { setState("doctor"); }} className="underline text-blue-700">Click Here</button>
              </>
              :
              <>
                <p>Admin Login?</p>
                <button onClick={() => { setState("admin"); }} className="underline text-blue-700">Click Here</button>
              </>
          }
        </div>
      </div >
    </div>
  );
};

export default Login;
