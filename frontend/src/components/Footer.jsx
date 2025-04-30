
import { assets } from './../assets/assets';
const Footer = () => {
  return (
    <div className="pt-20">
      <div className="pb-10 border-b flex flex-col  sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-4">
        {/* logo */}
        <div>
          <img src={assets.logo} alt='logo' className='w-40 mb-5' />
          <p className='w-full  md:w-3/5 text-sm text-gray-600 leading-relaxed'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        {/* links */}
        <div>
          <p className='font-medium text-xl mb-5 uppercase'>Company</p>
          <div className='flex flex-col gap-2 text-gray-700'>
            <p className='cursor-pointer transition-all duration-500 hover:text-primary hover:font-bold'>Home</p>
            <p className='cursor-pointer transition-all duration-500 hover:text-primary hover:font-bold'>About Us</p>
            <p className='cursor-pointer transition-all duration-500 hover:text-primary hover:font-bold'>Delivery</p>
            <p className='cursor-pointer transition-all duration-500 hover:text-primary hover:font-bold'>Privacy Police</p>
          </div>
        </div>
        {/* Touch */}
        <div>
          <p className='font-medium text-xl mb-5 uppercase'>get in touch</p>
          <div className='text-sm text-gray-700'>
            <p className='mb-2'>+0-000-000-000</p>
            <p>MostafaYassin@gmail.com</p>
          </div>
        </div>
      </div>
      {/* Copy Right */}
      <div className='py-4 text-center text-sm font-medium'>
        <p>Copyright 2024 @ Mostafa Yassin - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
