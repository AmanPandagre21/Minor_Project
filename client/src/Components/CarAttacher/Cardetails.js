import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
// import C1Img from '../../../Images/carAttach2.png'
import theme from "../../theme";
// import Rform from '../TravelAgency/registrationForm'
// import Cregform from './CregistrationForm'
// import CAImg from '../../../Images/carAttach1.png'
import CarDetailsForm from "./cardetailForm";
const Cardetails = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: {
              md: "70vw",
              sm: "100vw",
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
              <CarDetailsForm />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              {/* <img src="" className="cimg2" /> */}
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default Cardetails;
