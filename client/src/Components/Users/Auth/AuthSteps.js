import React, { useState } from "react";
import StepPhone from "../Steps/StepPhone";
import StepOTP from "../Steps/StepOTP";
import UserNavBar from "../userNavBar";
import AgencyNavBar from "../../TravelAgency/agencyNavBar";
import NavBar from "../../HomePage/navbar/navBar";
import DriverNavBar from "../../Driver/profiles/driverNavbar";
import AttacherNavBar from "../../CarAttacher/profiles/attacherNavbar";
import { useSelector, useDispatch } from "react-redux";

const steps = {
  1: StepPhone,
  2: StepOTP,
};

const AuthSteps = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const { user, isAuth } = useSelector((state) => state.users);
  const { agency, isAgencyAuth } = useSelector((state) => state.agencyAuth);
  const { attacher, isAttacheryAuth } = useSelector(
    (state) => state.attacherAuth
  );
  const { driver, isDriverAuth } = useSelector((state) => state.driverAuth);

  function onNext() {
    setStep(step + 1);
  }

  function onPrevious() {
    setStep(step - 1);
  }

  return (
    <>
      {isAuth === true && user.activated === true ? (
        <UserNavBar />
      ) : isAgencyAuth === true && agency.isAgencyActivated === true ? (
        <AgencyNavBar />
      ) : isDriverAuth === true ? (
        <DriverNavBar />
      ) : isAttacheryAuth === true && attacher.isAttacherActivated === true ? (
        <AttacherNavBar />
      ) : (
        <NavBar />
      )}
      <Step onNext={onNext} onPrevious={onPrevious} />;
    </>
  );
};

export default AuthSteps;
