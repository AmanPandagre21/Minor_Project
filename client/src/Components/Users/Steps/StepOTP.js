import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verify_otp } from "../../../Slices/UsersSlices/authSlice";
import { toast } from "react-toastify";
//css for input field

const StepOTP = ({ onPrevious }) => {
  const [otp, setOtp] = useState("");
  const { phone, hash } = useSelector((state) => state.users.otp);
  const { type, message } = useSelector((state) => state.users.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goBack = () => {
    onPrevious();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!otp || !phone || !hash) return;
    dispatch(verify_otp({ phone: phone, hash: hash, otp: otp }));
    navigate("/activation");
  };

  useEffect(() => {
    if (type === "error") {
      toast.error(message);
    }
  }, [type, message]);

  return (
    <>
      <div className="firstDiv">
        <div className="wrapStyle">
          <div className="textDiv">
            <p className="userLoginText1">
              <span className="userLoginText">Login/Registration</span>
            </p>
            <p className="userLoginText2">Enter 4 Digit OTP</p>
            <p className="userLoginText3">A 4 digit OTP has been send on SMS</p>
          </div>
          <form className="loginForm">
            <input
              type="number"
              name="otp"
              onChange={(e) => setOtp(e.target.value)}
            ></input>

            <button onClick={submitHandler} className="button">
              Next
            </button>

            <button className="resendButton" onClick={goBack}>
              resend OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StepOTP;
