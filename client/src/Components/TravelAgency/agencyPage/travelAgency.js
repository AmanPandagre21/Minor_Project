import { Grid } from "@mui/material";
import React, { useEffect } from "react";
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

const TravelAgencyPage = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.users);
  const { agency, isAgencyAuth } = useSelector((state) => state.agencyAuth);
  const { attacher, isAttacheryAuth } = useSelector(
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
      ) : isAttacheryAuth === true && attacher.isAttacherActivated === true ? (
        <AttacherNavBar />
      ) : (
        <NavBar />
      )}
      <Grid container sx={{ marginTop: "3rem" }}>
        <Grid item md={4}>
          <FilterTA />
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
