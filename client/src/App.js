import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import AuthSteps from "./Components/Users/Auth/AuthSteps.js";
import ActivateUser from "./Components/Users/Steps/ActivateUser";
import Drawer from "./Components/Users/drawer";
import { store } from "./store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { user_details } from "./Slices/UsersSlices/authSlice.js";
import { get_agency_profile } from "./Slices/TravelAgenciesSlices/travelAuthSlice";
import Drivers from "./Components/Driver/driverPages/drivers";
import TravelAgency from "./Components/TravelAgency/agencyPage/travelAgency";
import Clogin from "./Components/CarAttacher/Clogin";
import Cregitration from "./Components/CarAttacher/Cregistration";
import CarActivation from "./Components/CarAttacher/Cardetails";
import DLogin from "./Components/Driver/Dlogin";
import Dregistration from "./Components/Driver/Dregistration";
import Login from "./Components/TravelAgency/login";
import Registration from "./Components/TravelAgency/registration";
import TaActivation from "./Components/TravelAgency/taActivation";
import AgencyProfile from "./Components/TravelAgency/agencyProfile";
import DriverDrawer from "./Components/Driver/profiles/drawer";
import { get_driver_profile } from "./Slices/DriverSlices/driverAuthSlice";
// ------------------------------
import EnterEmail from "./Components/Driver/forgotPassword/enterEmail";
import ResetPassword from "./Components/Driver/resetPassword/resetPass";
import EnterAttacherEmail from "./Components/CarAttacher/forgotPassword/enterEmail";
import ResetAttacherPassword from "./Components/CarAttacher/resetPassword/resetPass";
import TADetails from "./Components/TravelAgency/agencyPage/TADetails";
// -------------------------------
import { get_attacher_profile } from "./Slices/CarAttacherSlices/attacherAuthSlice";
import Profile from "./Components/CarAttacher/profile";
import Header from "./Components/HomePage/header";

function App() {
  const { isAuth, user } = useSelector((state) => state.users);
  const { isAgencyAuth, agency } = useSelector((state) => state.agencyAuth);
  const { isDriverAuth, driver } = useSelector((state) => state.driverAuth);
  const { isAttacherAuth, attacher } = useSelector(
    (state) => state.attacherAuth
  );

  const dispatch = useDispatch();

  toast.configure({
    theme: "colored",
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2500,
  });

  useEffect(() => {
    store.dispatch(user_details());

    store.dispatch(get_agency_profile());

    store.dispatch(get_driver_profile());

    store.dispatch(get_attacher_profile());
  }, [dispatch, store]);

  return (
    <>
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          {/* users Routes */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/authenticate" element={<AuthSteps />} />
          <Route
            exact
            path="/activation"
            element={
              !isAuth ? (
                <AuthSteps />
              ) : isAuth && !user.activated ? (
                <ActivateUser />
              ) : (
                <Drawer />
              )
            }
          ></Route>
          <Route
            exact
            path="/account"
            element={
              !isAuth ? (
                <AuthSteps />
              ) : isAuth && !user.activated ? (
                <ActivateUser />
              ) : (
                <Drawer />
              )
            }
          ></Route>
          <Route exact path="/drivers" element={<Drivers />}></Route>
          <Route exact path="/agencies" element={<TravelAgency />}></Route>
          <Route exact path="/agencies/:id" element={<TADetails />}></Route>
          {/* agency Routes */}
          <Route exact path="/agency/login" element={<Login />}></Route>
          <Route
            exact
            path="/agency/register"
            element={<Registration />}
          ></Route>
          <Route
            exact
            path="/agency/activate"
            element={
              !isAgencyAuth ? (
                <Login />
              ) : isAgencyAuth && !agency.isAgencyActivated ? (
                <TaActivation />
              ) : (
                <AgencyProfile />
              )
            }
          ></Route>
          <Route
            exact
            path="/agency/account"
            element={
              !isAgencyAuth ? (
                <Login />
              ) : isAgencyAuth && !agency.isAgencyActivated ? (
                <TaActivation />
              ) : (
                <AgencyProfile />
              )
            }
          ></Route>
          {/* driver Routes */}
          <Route exact path="/driver/login" element={<DLogin />}></Route>
          <Route
            exact
            path="/driver/register"
            element={<Dregistration />}
          ></Route>
          <Route
            exact
            path="/driver/account"
            element={!isDriverAuth ? <Login /> : <DriverDrawer />}
          ></Route>
          -
          <Route
            exact
            path="/driver/password/forgot"
            element={<EnterEmail />}
          ></Route>
          <Route
            exact
            path="/driver/password/reset/:token"
            element={<ResetPassword />}
          ></Route>
          {/* attacher Routes */}
          <Route exact path="/attacher/login" element={<Clogin />}></Route>
          <Route
            exact
            path="/attacher/register"
            element={<Cregitration />}
          ></Route>
          <Route
            exact
            path="/attacher/activation"
            element={
              !isAttacherAuth ? (
                <Clogin />
              ) : isAttacherAuth && !attacher.isAttacherActivated ? (
                <CarActivation />
              ) : (
                <Profile />
              )
            }
          ></Route>
          <Route
            exact
            path="/attacher/password/forgot"
            element={<EnterAttacherEmail />}
          ></Route>
          <Route
            exact
            path="/attacher/password/reset/:token"
            element={<ResetAttacherPassword />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
