import React, { useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import CarCards from "./carCards";
import theme from "../../../theme";
import { ThemeProvider } from "@mui/private-theming";
import UserNavBar from "../../Users/userNavBar";
import AttacherNavBar from "../../CarAttacher/profiles/attacherNavbar";
import NavBar from "../../HomePage/navbar/navBar";
import DriverNavBar from "../../Driver/profiles/driverNavbar";
import AgencyNavBar from "../agencyNavBar";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { get_agency_profile_with_param } from "../../../Slices/TravelAgenciesSlices/travelAuthSlice";
import AlertDialog from "./review/review";

function valuetext(value) {
  return `${value}°C`;
}

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.title,
});
const TADetails = () => {
  const [value, setValue] = React.useState(2);

  const { user, isAuth } = useSelector((state) => state.users);
  const { agency, status, isAgencyAuth } = useSelector(
    (state) => state.agencyAuth
  );
  const { attacher, isAttacherAuth } = useSelector(
    (state) => state.attacherAuth
  );
  const { driver, isDriverAuth } = useSelector((state) => state.driverAuth);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(get_agency_profile_with_param(id));
  }, [dispatch, id]);

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
        <div
          style={{
            background:
              "url(https://i0.wp.com/backgroundabstract.com/wp-content/uploads/edd/2022/02/222.jpg?resize=600%2C366&ssl=1)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1580px 600px",
            height: "70%",
          }}
        >
          <Grid container>
            <Grid item md={6} sm={12} xs={12}>
              <img src="/images/TravelAgency.gif" className="TAdetailheader" />
            </Grid>
            <Grid item md={6} sm={12} xs={12} sx={{ marginTop: "60px" }}>
              <Typography
                sx={{
                  fontWeight: "800",
                  fontSize: {
                    md: "50px",
                    sm: "50px",
                    xs: "25px",
                  },
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                {agency && agency.name}
              </Typography>
              <Typography
                sx={{
                  // fontWeight:'400',
                  // fontSize:'0px',
                  textAlign: "center",
                }}
              >
                <Rating
                  name="read-only"
                  value={agency && agency.ratings}
                  readOnly
                  size="large"
                />
              </Typography>
              <Typography
                mt={2}
                sx={{
                  fontWeight: "400",
                  fontSize: {
                    md: "20px",
                    sm: "20px",
                    xs: "10px",
                  },
                  textAlign: "center",
                }}
              >
                <span style={{ fontWeight: 600 }}>Email Id:-</span>
                <span> {agency && agency.email}</span>
              </Typography>
              <Typography
                mt={2}
                sx={{
                  fontWeight: "400",
                  fontSize: {
                    md: "20px",
                    sm: "20px",
                    xs: "10px",
                  },
                  textAlign: "center",
                }}
              >
                <span style={{ fontWeight: 600 }}>Phone Number:-</span>
                <span> {agency && agency.phone}</span>
              </Typography>
              <Typography
                mt={2}
                sx={{
                  fontWeight: "400",
                  fontSize: {
                    md: "20px",
                    sm: "20px",
                    xs: "10px",
                  },
                  textAlign: "center",
                }}
              >
                <span style={{ fontWeight: 600 }}>Address:-</span>
                <span> {agency && agency.address} </span>
              </Typography>
              {isAuth === true && user.activated === true ? (
                <Typography
                  mt={2}
                  sx={{
                    fontWeight: "400",
                    fontSize: {
                      md: "20px",
                      sm: "20px",
                      xs: "10px",
                    },
                    textAlign: "center",
                  }}
                >
                  <AlertDialog agencyId={agency && agency._id} />
                </Typography>
              ) : (
                <Typography />
              )}
            </Grid>
          </Grid>
        </div>
        {/*cards....................  */}
        <Grid container>
          <Grid item md={3} sm={12}>
            {/* <div className="filterTA">
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
                options={top100Films}
                getOptionLabel={(option) => option.title}
                filterOptions={filterOptions}
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
                /> */}
            {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
            {/* </Box>  */}
            {/* </div> */}
          </Grid>
          <Grid container md={9}>
            {agency &&
              agency.carsAndDrivers.map((ele) =>
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
                  <Grid item md={4} sm={6} sx={{ paddingLeft: "20px" }}>
                    <CarCards cars={ele} agencyid={id} />
                  </Grid>
                )
              )}
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default TADetails;
