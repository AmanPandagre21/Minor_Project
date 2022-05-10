import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
// import TLImg from '../../../Images/loginImg.png'
import theme from "../../theme";
import Tloginform from "./CloginForm";
import Cloginform from "./CloginForm";
import UserNavBar from "../Users/userNavBar";
import AgencyNavBar from "../TravelAgency/agencyNavBar";
import NavBar from "../HomePage/navbar/navBar";
import DriverNavBar from "../Driver/profiles/driverNavbar";
import AttacherNavBar from "./profiles/attacherNavbar";
import { useDispatch, useSelector } from "react-redux";

const CLogin = () => {
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
              md: "auto",
              sm: "auto",
            },
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10rem",
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
              <img src="/images/LoginImg.png" className="cimgs" />
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
              <Cloginform />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default CLogin;
