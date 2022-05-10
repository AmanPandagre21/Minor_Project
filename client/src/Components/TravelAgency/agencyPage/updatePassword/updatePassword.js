import React from "react";
// import RImg from "../../../Images/forgotPassword.png";
import theme from "../../../../theme";

import { ThemeProvider } from "@emotion/react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import UpdatePasswordForm from "./updatePasswordForm";
const UpdatePassword = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: {
              md: "45vw",
              sm: "70vw",
            },
            height: {
              md: "60vh",
              sm: "60vh",
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
            {/* <Grid item md={6} sm={6} xs={12} >
   <img src={RImg} className='fImg' />
    </Grid> */}

            <Grid item md={12} sm={12} xs={12}>
              {/* <Rform/> */}
              <UpdatePasswordForm />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default UpdatePassword;
