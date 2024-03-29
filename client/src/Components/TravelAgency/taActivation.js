import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import theme from "../../theme";
import Rform from "./registrationForm";
import Aform from "./activationForm";
import UserNavBar from "../Users/userNavBar";
import AgencyNavBar from "./agencyNavBar";
import NavBar from "../HomePage/navbar/navBar";
import DriverNavBar from "../Driver/profiles/driverNavbar";
import AttacherNavBar from "../CarAttacher/profiles/attacherNavbar";
import { useDispatch, useSelector } from "react-redux";

const Activation = () => {
  const { user, isAuth } = useSelector((state) => state.users);
  const { agency, isAgencyAuth } = useSelector((state) => state.agencyAuth);
  const { attacher, isAttacherAuth } = useSelector(
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
      ) : isAttacherAuth === true && attacher.isAttacherActivated === true ? (
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
              md: "80vh",
              sm: "80vh",
            },
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "100px",
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
              <Aform />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <img src="/images/ActivationImg.png" className="aimg" />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default Activation;
