import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { Button, Paper, Grid } from "@mui/material";
import React from "react";
import theme from "../../theme";
import NavBar from "./navbar/navBar";
import UserNavBar from "../Users/userNavBar";
import AgencyNavBar from "../TravelAgency/agencyNavBar";
import DriverNavBar from "../Driver/profiles/driverNavbar";
import AttacherNavBar from "../CarAttacher/profiles/attacherNavbar";

const header = () => {
  const { user, isAuth } = useSelector((state) => state.users);
  const { agency, isAgencyAuth } = useSelector((state) => state.agencyAuth);
  const { attacher, isAttacheryAuth } = useSelector(
    (state) => state.attacherAuth
  );
  const { isDriverAuth } = useSelector((state) => state.driverAuth);

  return (
    <>
      <div className="header">
        {isAuth === true && user.activated === true ? (
          <UserNavBar />
        ) : isAgencyAuth === true && agency.isAgencyActivated === true ? (
          <AgencyNavBar />
        ) : isDriverAuth === true ? (
          <DriverNavBar />
        ) : isAttacheryAuth === true &&
          attacher.isAttacherActivated === true ? (
          <AttacherNavBar />
        ) : (
          <NavBar />
        )}
        {/* <div className="headerTextdiv">
          <span className="headerText">
            Book The best Cars
            <br />
            With Us
          </span>
          <p className="headerText2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the indus
          </p>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              sx={{
                width: {
                  md: "159px",
                  sm: "154px",
                  xs: "140px",
                  sx: "130px",
                },
                height: {
                  md: "56px",
                  sm: "56px",
                  xs: "50px",
                  sx: "30px",
                },
                top: {
                  md: "210px",
                  sm: "200px",
                  xs: "155px",
                  sx: "120px",
                },
                background: "#C4C4C4",
                fontFamily: "sans-serif",
                fontSize: {
                  md: "20px",
                  sm: "20px",
                  xs: "15px",
                  sx: "12px",
                },
                color: "black",
                borderRadius: "19px",
              }}
              className="button"
            >
              Book Now
            </Button>
          </ThemeProvider>

          {/* <Paper sx={{width:'412px',height:'52px',marginLeft:'350px',marginRight:'350px',background:'#F6F5F5',marginTop:'350px'}} elevation={6}>
       
       </Paper> */}
        {/* </div> */}
        <Grid container>
          <Grid item md={6} sm={12}>
            <div className="headerTextdiv">
              <span className="headerText">
                Book The best Cars
                <br />
                With Us
              </span>
              <p className="headerText2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the indus
              </p>

              <Button
                variant="contained"
                sx={{
                  width: {
                    md: "159px",
                    sm: "154px",
                    xs: "140px",
                    sx: "130px",
                  },
                  height: {
                    md: "56px",
                    sm: "56px",
                    xs: "50px",
                    sx: "30px",
                  },
                  top: {
                    md: "210px",
                    sm: "200px",
                    xs: "155px",
                    sx: "120px",
                  },
                  background: "#C4C4C4",
                  fontFamily: "sans-serif",
                  fontSize: {
                    md: "20px",
                    sm: "20px",
                    xs: "15px",
                    sx: "12px",
                  },
                  color: "black",
                  borderRadius: "19px",
                }}
                className="button"
              >
                Book Now
              </Button>
            </div>
          </Grid>
          <Grid
            item
            md={6}
            sm={12}
            sx={{
              marginTop: {
                md: 0,
                sm: 25,
                xs: 30,
              },
            }}
          >
            <img src="/images/homePage.gif" />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default header;
