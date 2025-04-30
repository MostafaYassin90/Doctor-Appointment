
import { assets } from './../assets/assets';
const Hero = () => {
  return (
    <div className="min-h-[70vh] lg:min-h-[80vh] bg-[#5f6fff] flex flex-col md:flex-row px-10 pt-10 lg:px-20 lg:pt-20 rounded-md gap-5">
      {/* Left Side */}

      <div className='text-white text-center md:text-start flex flex-col gap-5 flex-1 justify-end py-20 lg:pb-40 items-center md:items-start'>
        <p className='text-3xl lg:text-5xl font-bold mb-3 leading-tight'>Book Appointment <br /> With Trusted Doctors</p>
        <div className='flex flex-col md:flex-row items-center  gap-6 text-sm'>
          {/* <img src={assets.group_profiles} className='w-24' /> */}
          <p>Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.</p>
        </div>
        <a href='#speciality' className='flex w-fit items-center gap-3 rounded-full text-sm text-gray-800 bg-white py-3 px-5 transition-all duration-500 hover:scale-105'>
          <p>Book Appointment</p>
          <img src={assets.arrow_icon} alt='arrow-icon' className='w-3' />
        </a>
      </div>

      {/* Right Side */}

      <div className='flex-1 flex items-end'>
        <img src={assets.hero_img} alt='hero-image' />
      </div>

    </div>
  );
};

export default Hero;
