import React, { useEffect } from "react";
// import FilterTA from "../TravelAgency/agencyPage/filerTA";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import UserNavBar from "../../Users/userNavBar";
import AgencyNavBar from "../../TravelAgency/agencyNavBar";
import NavBar from "../../HomePage/navbar/navBar";
import DriverNavBar from "../profiles/driverNavbar";
import AttacherNavBar from "../../CarAttacher/profiles/attacherNavbar";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import DCards from "./driverProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { get_all_drivers_profile } from "../../../Slices/DriverSlices/driverProfileSlice";

function valuetext(value) {
  return `${value}°C`;
}

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.title,
});

const Drivers = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.users);
  const { agency, isAgencyAuth } = useSelector((state) => state.agencyAuth);
  const { attacher, isAttacheryAuth } = useSelector(
    (state) => state.attacherAuth
  );
  const { isDriverAuth } = useSelector((state) => state.driverAuth);
  const { status, drivers } = useSelector((state) => state.drivers);

  useEffect(() => {
    dispatch(get_all_drivers_profile());
  }, [dispatch]);
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
      <Grid container sx={{ marginTop: "4rem" }}>
        <Grid item md={3} sm={12} xs={12}>
          <div className="filterTA">
            <Typography
              varient="h1"
              sx={{
                textAlign: "center",
                fontWeight: 800,
                fontSize: "30px",
                paddingTop: 3,
              }}
            >
              Filters
            </Typography>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              sx={{
                marginTop: "20px",
                width: "250px",
                marginLeft: "20px ",
              }}
            />

            <Autocomplete
              id="filter-demo"
              options=""
              getOptionLabel=""
              filterOptions=""
              sx={{
                width: 250,
                height: "10px",
                marginLeft: "20px",
                marginTop: "20px",
              }}
              renderInput={(params) => (
                <TextField {...params} label="Custom filter" />
              )}
            />
          </div>
        </Grid>
        {drivers &&
          drivers.map((ele) =>
            status.type === "loading" ? (
              <Stack spacing={3} sx={{ marginLeft: "2rem" }}>
                <Skeleton variant="text" sx={{ bgcolor: "grey.700" }} />
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ bgcolor: "grey.700" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={118}
                  sx={{ bgcolor: "grey.700" }}
                />
              </Stack>
            ) : (
              <Grid
                item
                md={3}
                sm={5}
                xs={10}
                sx={{
                  marginLeft: {
                    md: 0,
                    sm: 1,
                    xs: 4,
                  },
                }}
              >
                <DCards driver={ele} />
              </Grid>
            )
          )}
      </Grid>
    </>
  );
};

export default Drivers;
