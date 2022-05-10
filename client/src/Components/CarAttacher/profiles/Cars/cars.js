import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import FormDialog from "./addCar";
import CarCard from "./CarCards";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  delete_attacher_car,
  update_reset,
} from "../../../../Slices/CarAttacherSlices/attacherProfileSlice";

const Cars = () => {
  const { attacher } = useSelector((state) => state.attacherAuth);
  const { setMessage, isUpdated, status } = useSelector(
    (state) => state.attachers
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (status.type === "error") {
      toast.error(status.message);
    }

    if (isUpdated) {
      toast.success(setMessage);
      dispatch(update_reset());
    }
  }, [dispatch, toast, setMessage]);

  return (
    <>
      <Grid
        container
        md={9}
        sx={{
          marginLeft: {
            md: 30,
            sm: 7,
            xs: 6,
          },
        }}
      >
        <Grid item md={12} sm={12}>
          {/* <Button variant='contained' color='error' sx={{marginLeft:3,marginTop:'6px',height:'60px',width:'100px'}}>Add  Car</Button> */}
          <FormDialog />
        </Grid>

        {attacher &&
          attacher.carDetails.map((ele) =>
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
              <Grid item md={4} sm={6} xs={12} sx={{ paddingLeft: "20px" }}>
                <CarCard cars={ele} />
              </Grid>
            )
          )}
      </Grid>
    </>
  );
};
export default Cars;
