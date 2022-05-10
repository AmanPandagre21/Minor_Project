import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterTA from "./filerTA";
import Tcard from "./TravelAgencyCards";
import Header from "../../HomePage/header";
import { useDispatch, useSelector } from "react-redux";
import { get_all_agencies_profile } from "../../../Slices/TravelAgenciesSlices/agencyProfileSlice";
import UserNavBar from "../../Users/userNavBar";
import AgencyNavBar from "../agencyNavBar";
import NavBar from "../../HomePage/navbar/navBar";
import DriverNavBar from "../../Driver/profiles/driverNavbar";
import AttacherNavBar from "../../CarAttacher/profiles/attacherNavbar";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

// slider

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
function valuetext(value) {
  return `${value}°C`;
}

const TravelAgencyPage = () => {
  const dispatch = useDispatch();
  // const [keyword, setKeyword] = useState("");
  // const [ratings, setRatings] = useState("");
  const { user, isAuth } = useSelector((state) => state.users);
  const { agency, isAgencyAuth } = useSelector((state) => state.agencyAuth);
  const { attacher, isAttacherAuth } = useSelector(
    (state) => state.attacherAuth
  );
  const { isDriverAuth } = useSelector((state) => state.driverAuth);
  const { status, travelagencies } = useSelector((state) => state.agencies);
  // console.log(status.type);
  useEffect(() => {
    dispatch(get_all_agencies_profile());
  }, [dispatch]);

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
      <Grid container sx={{ marginTop: "3rem" }}>
        <Grid item md={4}>
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
              name="search"
              // value={keyword}
              // onChange={(e) => setKeyword(e.target.value)}
              variant="outlined"
              sx={{
                marginTop: "20px",
                width: "250px",
                marginLeft: "20px ",
              }}
            />
            <Box sx={{ width: 250, marginLeft: "20px", marginTop: "50px" }}>
              <Slider
                aria-label="Temperature"
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
              />
              {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
            </Box>
          </div>
        </Grid>
        {travelagencies &&
          travelagencies.map((ele) =>
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
              <Grid item md={4}>
                <Tcard agency={ele} />
              </Grid>
            )
          )}
      </Grid>

      {/* <Tcard/> */}
    </>
  );
};
export default TravelAgencyPage;
