import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import allUsers, { button, gridDiv, heading } from "./style";
import theme from "../../../theme";
import { ThemeProvider } from "@emotion/react";
import "./allUser.css";

const AllUsers = () => {
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          item
          md={6}
          sm={6}
          lg={2}
          xs={12}
          sx={gridDiv}
          style={{ margin: "auto 1em" }}
        >
          <img src="/images/User.png" style={allUsers} />
          <div>
            <Link to="/activation">
              <Button variant="contained" disableRipple="true" sx={button}>
                Normal User
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid
          item
          md={6}
          sm={6}
          lg={2}
          xs={12}
          sx={gridDiv}
          style={{ margin: "auto 1em" }}
        >
          <img src="/images/TravelAgency.png" style={allUsers} />
          <div>
            <Link to="/agency/login">
              <Button variant="contained" disableRipple="true" sx={button}>
                Travel Agency
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid
          item
          md={6}
          sm={6}
          lg={2}
          xs={12}
          sx={gridDiv}
          style={{ margin: "auto 1em" }}
        >
          <img src="/images/AttachCar.png" style={allUsers} />
          <div>
            <Link to="/attacher/login">
              <Button variant="contained" disableRipple="true" sx={button}>
                Car Attacher
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid
          item
          md={6}
          sm={6}
          lg={2}
          xs={12}
          sx={gridDiv}
          style={{ margin: "auto 1em" }}
        >
          <img src="/images/Driver.png" style={allUsers} />
          <div>
            <Link to="/driver/register">
              <Button variant="contained" disableRipple="true" sx={button}>
                Drivers
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default AllUsers;
