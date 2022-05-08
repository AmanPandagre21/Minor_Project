import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
// import TLImg from '../../../Images/loginImg.png'
import theme from "../../theme";
import Tloginform from "./loginForm";

const TLogin = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: {
              md: "70vw",
              sm: "90vw",
            },
            height: {
              md: "70vh",
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
              <Tloginform />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default TLogin;
