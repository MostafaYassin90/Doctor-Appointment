import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import Doctors from './pages/Doctors';
import Login from './pages/Auth/Login';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import About from './pages/About';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import Register from './pages/Auth/Register';
import Verify from './pages/verify';

const App = () => {
  return (
    <div className='px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer position='top-right' theme="colored" />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
