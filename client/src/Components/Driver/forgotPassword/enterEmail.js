import React from "react";

import theme from "../../../theme";

import { ThemeProvider } from "@emotion/react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import EnterEform from "./enterEmailForm";
import UserNavBar from "../../Users/userNavBar";
import AgencyNavBar from "../../TravelAgency/agencyNavBar";
import NavBar from "../../HomePage/navbar/navBar";
import DriverNavBar from "../profiles/driverNavbar";
import AttacherNavBar from "../../CarAttacher/profiles/attacherNavbar";
import { useDispatch, useSelector } from "react-redux";

const EnterEmail = () => {
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
              md: "45vw",
              sm: "70vw",
            },
            height: {
              md: "50vh",
              sm: "50vh",
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
              <img src="/images/forgotPassword.png" className="fImg" />
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
              {/* <Rform/> */}
              <EnterEform />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default EnterEmail;
