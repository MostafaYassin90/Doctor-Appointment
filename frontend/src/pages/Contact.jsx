import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="py-16">
      {/* Title */}
      <p className="text-center mb-10 uppercase text-2xl text-gray-600">contact <span className="font-bold text-gray-800">US</span></p>
      {/* Details */}
      <div className="flex flex-col sm:flex-row gap-8 justify-center">
        <div className="w-full md:w-2/6 p-2 bg-gray-200 rounded">
          <img src={assets.contact_image} alt="contact-image" />
        </div>
        <div className="w-full sm:w-fit flex flex-col gap-5 justify-center">
          <p className="text-xl text-gray-700 font-bold">OUR OFFICE</p>
          <p className="text-gray-600">
            00000 Willms Station<br />
            Suite 000, Washington, USA
          </p>
          <p className="text-gray-600">
            Tel: (000) 000-0000<br />
            Email: greatstackdev@gmail.com
          </p>
          <p className="text-xl text-gray-700 font-bold">CAREERS AT PRESCRIPTO</p>
          <p className="text-gray-600">Learn more about our teams and job openings.</p>
          <button className="mr-auto border border-gray-700 py-3 px-5 rounded transition-all duration-300 hover:bg-black hover:text-white">Explore Jobs</button>
        </div>
      </div>

    </div>
  );
};

export default Contact;
