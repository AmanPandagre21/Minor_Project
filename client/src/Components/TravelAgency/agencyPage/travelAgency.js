import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
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
import { createBrowserHistory } from "history";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { State } from "country-state-city";
import Slider from "@mui/material/Slider";
function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: "",
  },
  {
    value: 1,
    label: <StarIcon style={{ color: "gold" }} />,
  },
  {
    value: 2,
    label: <StarIcon style={{ color: "gold" }} />,
  },
  {
    value: 3,
    label: <StarIcon style={{ color: "gold" }} />,
  },
  {
    value: 4,
    label: <StarIcon style={{ color: "gold" }} />,
  },
  {
    value: 5,
    label: <StarIcon style={{ color: "gold" }} />,
  },
];

const TravelAgencyPage = () => {
  const dispatch = useDispatch();
  const history = createBrowserHistory();

  const [state, setState] = useState("");
  const [ratings, setRatings] = useState(0);
  const { user, isAuth } = useSelector((state) => state.users);
  const { agency, isAgencyAuth } = useSelector((state) => state.agencyAuth);
  const { attacher, isAttacherAuth } = useSelector(
    (state) => state.attacherAuth
  );
  const { isDriverAuth } = useSelector((state) => state.driverAuth);
  const { status, travelagencies } = useSelector((state) => state.agencies);

  useEffect(() => {
    dispatch(get_all_agencies_profile(state, ratings));
  }, [dispatch, state, ratings]);

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
            <form>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="State">State</InputLabel>
                  <Select
                    labelId="Statename"
                    id=""
                    value={state}
                    label="State"
                    name="state"
                    onChange={(e) => setState(e.target.value)}
                  >
                    <MenuItem key="" value="">
                      State
                    </MenuItem>
                    {State &&
                      State.getStatesOfCountry("IN").map((item) => {
                        return (
                          <MenuItem key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box>
            </form>
            <Box sx={{ width: 250, marginLeft: "20px", marginTop: "50px" }}>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks={marks}
                min={0}
                max={5}
              />
              {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
            </Box>
          </div>
        </Grid>
        {travelagencies &&
          travelagencies.map((ele) =>
            status.type === "loading" ? (
              <Stack
                spacing={3}
                sx={{
                  marginLeft: "2rem",
                  marginTop: "1rem",
                  marginBottom: "3rem",
                }}
              >
                <Skeleton variant="text" sx={{ bgcolor: "grey.700" }} />
                <Skeleton
                  variant="circular"
                  width={50}
                  height={50}
                  sx={{ bgcolor: "grey.700" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={230}
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
