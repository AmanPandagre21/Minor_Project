import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
// import DImg from "../../../Images/DriverReg.png";
import theme from "../../theme";
import Rform from "../TravelAgency/registrationForm";
import Dregform from "./DregForm";
import UserNavBar from "../Users/userNavBar";
import AgencyNavBar from "../TravelAgency/agencyNavBar";
import NavBar from "../HomePage/navbar/navBar";
import DriverNavBar from "./profiles/driverNavbar";
import AttacherNavBar from "../CarAttacher/profiles/attacherNavbar";
import { useDispatch, useSelector } from "react-redux";

const Dregistration = () => {
  const { user, isAuth } = useSelector((state) => state.users);
  const { agency, isAgencyAuth } = useSelector((state) => state.agencyAuth);
  const { attacher, isAttacheryAuth } = useSelector(
    (state) => state.attacherAuth
  );
  const { isDriverAuth } = useSelector((state) => state.driverAuth);
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
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: {
              md: "70vw",
              sm: "90vw",
            },
            height: {
              md: "90vh",
              sm: "80vh",
            },
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "50px",
            borderRadius: "6px",
            boxShadow: {
              md: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              sm: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              xs: "rgba(0, 0, 0, 0) 0px 0px 0px",
            },
          }}
        >
          <Grid container>
            <Grid item md={6} sm={6} xs={12}>
              <img src="/images/User.png" className="cimg" />
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
              <Dregform />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Dregistration;