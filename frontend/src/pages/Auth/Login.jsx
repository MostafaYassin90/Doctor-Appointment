import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoLockClosedOutline } from "react-icons/io5";
import { HiOutlineLockOpen } from "react-icons/hi2";
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from './../../context/AppContext';

const Login = () => {

  const { setToken, backendUrl } = useContext(AppContext);

  const navigate = useNavigate();

  // Stata
  const [showPassword, setShowPassword] = useState("password");

  // Show Password Handler
  const showPasswordHandler = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  // Schema
  const schema = z.object({
    email: z.string({ required_error: "Email Is Required" }).min(1, { message: "Email Is Required." }).email({ message: "Please Write a Valid Email" }),
    password: z.string({ required_error: "Password Is Required" }).min(6, { message: "Password Must Be At Least 6 Characters." }).max(200)
  });

  // Register
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema)
  });

  // onSubmitHandler
  const onSubmitHandler = async (data) => {
    const userDetails = {
      email: data.email,
      password: data.password
    };
    try {
      const response = await axios.post(backendUrl + "/api/users/login", userDetails);
      console.log(response);
      if (response.data.success) {
        const token = response.data.user.token;
        setToken(token);
        window.localStorage.setItem("uToken", token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center my-20">
      <div className="w-full sm:w-[400px] shadow-2xl rounded-md border border-gray-100 py-8 px-5">
        <p className="font-semibold text-gray-600 mb-2 text-2xl">Login</p>
        <p className="text-gray-600 mb-3">Please LogIn to book appointment</p>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col gap-3">
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-[15px] text-gray-700 mt-[-5px]">Email</label>
              <input type="email" id="email" className="outline-primary h-[40px] border border-gray-300 py-1.5 px-3 block w-full rounded" {...register("email")} />
              {errors.email && <p className="text-sm font-medium text-red-700">{errors.email.message}</p>}
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="text-[15px] text-gray-700 mt-[-5px]">Password</label>
              <div className="relative">
                <input type={showPassword} id="password" className="outline-primary h-[40px] border border-gray-300 py-1.5 px-3 block w-full rounded" {...register("password")} />
                {
                  showPassword === "password"
                    ?
                    <IoLockClosedOutline onClick={showPasswordHandler} className="text-[18px] text-gray-800 cursor-pointer absolute top-[50%] -translate-y-[50%] right-[20px]" />
                    :
                    <HiOutlineLockOpen onClick={showPasswordHandler} className="text-[18px] text-gray-800 cursor-pointer absolute top-[50%] -translate-y-[50%] right-[20px]" />
                }
              </div>
              {errors.password && <p className="text-sm font-medium text-red-700">{errors.password.message}</p>}
            </div>
            <button type="submit" className="h-[40px] mt-3 font-medium rounded-md block w-full py-1.5 px-5 text-white bg-primary transition-all duration-300 hover:bg-blue-900">Create Account</button>
          </div>
        </form>
        {/* Form */}
        {/* Navigate To Login Page */}
        <div className="mt-5 flex items-center text-gray-600 gap-2 text-[15px]">
          <p>Create an new account?</p>
          <Link to={"/register"} className="underline text-blue-700 font-medium">Click Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
