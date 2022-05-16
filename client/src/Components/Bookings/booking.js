import {
  Container,
  Grid,
  Box,
  Button,
  Card,
  Checkbox,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PaymentCards from "./paymentCards";
import UserNavBar from "../Users/userNavBar";
import AgencyNavBar from "../TravelAgency/agencyNavBar";
import NavBar from "../HomePage/navbar/navBar";
import DriverNavBar from "../Driver/profiles/driverNavbar";
import AttacherNavBar from "../CarAttacher/profiles/attacherNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { get_agency_profile_with_param } from "../../Slices/TravelAgenciesSlices/travelAuthSlice";

const Booking = () => {
  const { carid } = useParams();
  const [searchParams] = useSearchParams();
  const agencyId = searchParams.get("agencyid");

  const dispatch = useDispatch();

  const { user, isAuth } = useSelector((state) => state.users);
  const { agency, isAgencyAuth } = useSelector((state) => state.agencyAuth);
  const { attacher, isAttacheryAuth } = useSelector(
    (state) => state.attacherAuth
  );

  const { isDriverAuth } = useSelector((state) => state.driverAuth);

  useEffect(() => {
    dispatch(get_agency_profile_with_param(agencyId));
  }, [dispatch]);

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
      {/* <Grid Container sx={{ display: "flex" }}>
        <Grid item md={7} sm={6}> */}
      {agency && <PaymentCards agency={agency} carId={carid} />}
      {/* </Grid>
        </Grid> */}
    </>
  );
};
export default Booking;
