import { useNavigate } from 'react-router-dom';
import { assets } from './../assets/assets';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="py-16">
      <div className="bg-primary flex gap-4 h-[50vh] rounded-md px-10 items-center">
        {/* Left Side */}
        <div className="flex-1 py-5">
          <p className="text-white text-3xl md:text-5xl font-medium leading-tight">Book Appointment<br />
            With 100+ Trusted Doctors</p>
          <button className="mt-5 w-fit py-3 px-6 bg-white text-gray-700 rounded-full" onClick={() => { navigate("/login"); scrollTo(0, 0); }}>Create Account</button>
        </div>
        {/* RightSide */}
        <div className="flex-1 relative w-full h-full max-sm:hidden">
          <img src={assets.banner_img} alt='banner-image' className=' w-96 h-[120%] block absolute bottom-0 right-0' />
        </div>
      </div>
    </div>
  );
};

export default Banner;
