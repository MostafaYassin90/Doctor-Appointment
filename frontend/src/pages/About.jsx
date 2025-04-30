import { assets } from './../assets/assets';

const About = () => {

  return (
    <div className="py-16">

      {/* Title */}
      <p className="text-center mb-10 text-gray-600 font-medium text-2xl uppercase">About <span className="text-gray-800 font-bold">US</span></p>

      {/* Details */}
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Image */}
        <div className='w-full md:w-2/5 p-1 rounded bg-slate-400'>
          <img src={assets.about_image} alt='about-image' />
        </div>
        {/* Info */}
        <div className='w-full flex flex-col gap-5 md:justify-center'>
          <p className='leading-relaxed text-sm text-gray-600 w-full lg:w-[90%] xl:w-[70%]'>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p className='leading-relaxed text-sm text-gray-600 w-full lg:w-[90%] xl:w-[70%]'>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <p className='text-sm text-gray-800 font-bold w-full sm:w-[70%]'>Our Vision</p>
          <p className='leading-relaxed text-sm text-gray-600 w-full lg:w-[90%] xl:w-[70%]'>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      {/* Why CHoose Us */}
      <div className='pt-10 pb-20'>
        <p className='text-xl mb-5'>WHY <span className='font-bold text-gray-800'>CHOOSE US</span></p>
        <div className='flex flex-col md:grid md:grid-cols-[1fr_1fr_1fr] border rounded-md'>
          <div className='group py-16 px-8 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer transition-all duration-500 hover:bg-primary hover:text-white'>
            <p className='group-hover:text-white  font-semibold mb-3 text-gray-700 '>EFFICIENCY:</p>
            <p className='group-hover:text-white  text-gray-600'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='group py-16 px-8 border-b md:border-b-0 cursor-pointer transition-all duration-500 hover:bg-primary hover:text-white'>
            <p className='group-hover:text-white  font-semibold mb-3 text-gray-700'>CONVENIENCE:</p>
            <p className='group-hover:text-white  text-gray-600'>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className='group py-16 px-8 cursor-pointer transition-all duration-500 hover:bg-primary hover:text-white md:border-l border-gray-200'>
            <p className='group-hover:text-white  font-semibold mb-3 text-gray-700'>PERSONALIZATION:</p>
            <p className='group-hover:text-white  text-gray-600'>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
