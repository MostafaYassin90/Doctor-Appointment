import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useContext, useEffect } from "react";
import { AppContext } from '../context/AppContext';

const VerifyPage = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const appointmentId = searchParams.get("orderId");

  const navigate = useNavigate();

  const verifyAppointment = async () => {
    const response = await axios.post(backendUrl + "/api/users/verify", { success: success, appointmentId: appointmentId });
    if (response.data.success) {
      navigate("/my-appointments");
    } else {
      console.log(response);
    }
  };
  useEffect(() => {
    if (token) {
      verifyAppointment();
    }
  }, [token]);

  return (
    <div>
      Verify Page
    </div>
  );
};

export default VerifyPage;
