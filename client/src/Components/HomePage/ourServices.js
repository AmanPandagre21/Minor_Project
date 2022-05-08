import { Button, Grid, Container } from "@mui/material";
import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
const OurServices = () => {
  return (
    <>
      <div>
        <h1 className="servicesHeading">Our Services</h1>
        <Grid container>
          {/* Travel Agency section */}
          <Grid
            item
            md={6}
            sm={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "1em 0",
            }}
          >
            <h2 className="TRavelAgency">Travel Agencies</h2>
            <p className="travelAgencyP">
              Lorem Ipsum is simply dummy text <br />
              of the printing and typesetting industry. <br />
              Lorem Ipsum has been the industry's standard <br />
              text ever since the 1500s, when an unknown printer
            </p>
            <div>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  sx={{
                    width: {
                      md: "205px",
                      sm: "200px",
                      xs: "190px",
                      sx: "180px",
                      xxs: "150px",
                    },
                    height: {
                      md: "46px",
                      sm: "46px",
                      xs: "46px",
                      sx: "30px",
                      xxs: "30px",
                    },
                    background: "#C4C4C4",
                    fontFamily: "sans-serif",
                    fontSize: "15 px",
                    color: "black",
                    borderRadius: "19px",
                  }}
                >
                  Login/Registration{" "}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: {
                      md: "159px",
                      sm: "154px",
                      xs: "140px",
                      sx: "130px",
                      xxs: "120px",
                    },
                    height: {
                      md: "46px",
                      sm: "46px",
                      xs: "46px",
                      sx: "30px",
                      xxs: "30px",
                    },
                    background: "#C4C4C4",
                    fontFamily: "sans-serif",
                    marginLeft: "10px",
                    fontSize: "15 px",
                    color: "black",
                    borderRadius: "19px",
                  }}
                >
                  BOOK RIDE
                </Button>
              </ThemeProvider>
            </div>
          </Grid>
          <Grid
            item
            md={6}
            sm={12}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1em auto",
            }}
          >
            <img src="/images/TaVector.png" className="TaVector" />
          </Grid>

          <Grid
            item
            md={6}
            sm={12}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1em auto",
            }}
          >
            <img src="/images/DVector.png" className="TaVector" />
          </Grid>
          <Grid
            item
            md={6}
            sm={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "1em 0",
            }}
          >
            <h2 className="TRavelAgency">Travel Agencies</h2>
            <p className="travelAgencyP">
              Lorem Ipsum is simply dummy text <br />
              of the printing and typesetting industry. <br />
              Lorem Ipsum has been the industry's standard <br />
              text ever since the 1500s, when an unknown printer
            </p>
            <div>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  sx={{
                    width: {
                      md: "205px",
                      sm: "200px",
                      xs: "190px",
                      sx: "180px",
                      xxs: "150px",
                    },
                    height: {
                      md: "46px",
                      sm: "46px",
                      xs: "46px",
                      sx: "30px",
                      xxs: "30px",
                    },
                    background: "#C4C4C4",
                    fontFamily: "sans-serif",
                    fontSize: "15 px",
                    color: "black",
                    borderRadius: "19px",
                  }}
                >
                  Login/Registration{" "}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: {
                      md: "159px",
                      sm: "154px",
                      xs: "140px",
                      sx: "130px",
                      xxs: "120px",
                    },
                    height: {
                      md: "46px",
                      sm: "46px",
                      xs: "46px",
                      sx: "30px",
                      xxs: "30px",
                    },
                    background: "#C4C4C4",
                    fontFamily: "sans-serif",
                    marginLeft: "10px",
                    fontSize: "15 px",
                    color: "black",
                    borderRadius: "19px",
                  }}
                >
                  BOOK RIDE
                </Button>
              </ThemeProvider>
            </div>
          </Grid>

          {/* Travel Agency section */}
          <Grid
            item
            md={6}
            sm={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "1em 0",
            }}
          >
            <h2 className="TRavelAgency">Travel Agencies</h2>
            <p className="travelAgencyP">
              Lorem Ipsum is simply dummy text <br />
              of the printing and typesetting industry. <br />
              Lorem Ipsum has been the industry's standard <br />
              text ever since the 1500s, when an unknown printer
            </p>
            <div>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  sx={{
                    width: {
                      md: "205px",
                      sm: "200px",
                      xs: "190px",
                      sx: "180px",
                      xxs: "150px",
                    },
                    height: {
                      md: "46px",
                      sm: "46px",
                      xs: "46px",
                      sx: "30px",
                      xxs: "30px",
                    },
                    background: "#C4C4C4",
                    fontFamily: "sans-serif",
                    fontSize: "15 px",
                    color: "black",
                    borderRadius: "19px",
                  }}
                >
                  Login/Registration{" "}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: {
                      md: "159px",
                      sm: "154px",
                      xs: "140px",
                      sx: "130px",
                      xxs: "120px",
                    },
                    height: {
                      md: "46px",
                      sm: "46px",
                      xs: "46px",
                      sx: "30px",
                      xxs: "30px",
                    },
                    background: "#C4C4C4",
                    fontFamily: "sans-serif",
                    marginLeft: "10px",
                    fontSize: "15 px",
                    color: "black",
                    borderRadius: "19px",
                  }}
                >
                  BOOK RIDE
                </Button>
              </ThemeProvider>
            </div>
          </Grid>
          <Grid
            item
            md={6}
            sm={12}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1em auto",
            }}
          >
            <img src="/images/AttachCar.png" className="TaVector" />
          </Grid>
          {/* </Grid> */}
        </Grid>
      </div>
    </>
  );
};
export default OurServices;
