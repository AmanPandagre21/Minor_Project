import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clear_all_errors,
  send_otp,
} from "../../../Slices/UsersSlices/authSlice";
import "./userLogin.css";
// import { toast } from "react-toastify";

const StepPhone = ({ onNext }) => {
  const [number, setNumber] = useState("");

  const { status } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();

    if (!number) return;
    const num = `+91${number}`;
    dispatch(send_otp({ phone: num }));
    onNext();
  };

  // useEffect(() => {
  //   if (status.type === "error") {
  //     toast.error(status.message);
  //     dispatch(clear_all_errors());
  //   }
  // });

  return (
    <>
      <div className="firstDiv">
        <div className="wrapStyle">
          <div className="textDiv">
            <p className="userLoginText1">
              <span className="userLoginText">Login/Registration</span>
            </p>

            <p className="userLoginText2">Enter your Mobile Number</p>

            <p className="userLoginText3">A 4 digit OTP will be send on SMS</p>
          </div>
          <form className="loginForm">
            <input
              type="number"
              value={number}
              name="phoneNo"
              onChange={(e) => setNumber(e.target.value)}
            ></input>

            <button className="button" onClick={submit}>
              Next{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StepPhone;
