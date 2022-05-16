import { ThemeProvider } from "@emotion/react";
import { Button, Card, cardMediaClasses, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import theme from "../../../../theme";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  delete_agency_car,
  reset_message,
  update_reset,
} from "../../../../Slices/TravelAgenciesSlices/agencyProfileSlice";

const CarCard = ({ cars }) => {
  const dispatch = useDispatch();

  const { setMessage, isUpdated, status } = useSelector(
    (state) => state.agencies
  );
  // (state) => state.agencies

  const deleteHandler = (id) => {
    // console.log(id);
    dispatch(delete_agency_car(id));
  };

  React.useEffect(() => {
    if (status.type === "error") {
      toast.error(status.message);
    }

    if (isUpdated) {
      toast.success(setMessage);
      dispatch(update_reset());
      dispatch(reset_message());
    }
  }, [dispatch, toast, setMessage]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            width: {
              md: "20vw",
              sm: "40vw",
              xs: "70vw",
            },
            height: {
              md: "50vh",
              sm: "50vh",
              xs: "45vh",
            },
            marginTop: "40px",
            background: "rgb(34,193,195)",
            background:
              "linear-gradient(0deg, rgba(34,193,195,1) 50%, rgba(40,144,158,1) 100%)",

            // background: 'url(data:image/jpeg;base64,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)',

            // backgroundRepeat:'no-repeat'
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "22px",
              textAlign: "center",
            }}
          >
            DZire
          </Typography>
          <Avatar
            alt={cars.cars.carName}
            src={cars.cars.carImage.url}
            sx={{
              width: {
                md: "130px",
                sm: "150px",
                xs: "150px",
              },
              height: {
                md: "130px",
                sm: "150px",
                xs: "150px",
              },
              marginLeft: {
                md: "auto",
                sm: "auto",
                xs: "auto",
                sx: "auto",
              },
              marginRight: {
                md: "auto",
                sm: "auto",
                xs: "auto",
                sx: "auto",
              },

              marginTop: "10px",
            }}
          />
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "16px",
                textAlign: "center",
                display: "flex",
                marginLeft: 10,
                //   marginTop:1
              }}
            >
              {cars.cars.carName}
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "17px",
                textAlign: "center",
                display: "flex",
                marginLeft: 10,
                //   marginTop:1
              }}
            >
              {cars.cars.carType} | {cars.cars.ac === 1 ? "AC" : "Non AC"} |{" "}
              {cars.cars.seats} Seats
            </Typography>

            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "13px",
                textAlign: "center",
                display: "flex",
                marginLeft: 12,

                //   marginTop:1
              }}
            >
              587 kms included<br></br>
              ₹30.0/km after 587 kms
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "17px",
                textAlign: "center",
                display: "flex",
                marginLeft: 15,
                //   marginTop:1
              }}
            >
              {cars.cars.fuelType}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteHandler(cars._id)}
              sx={{ marginLeft: "115px", marginTop: "6px" }}
            >
              Delete
            </Button>
          </div>
        </Card>
      </ThemeProvider>
    </>
  );
};
export default CarCard;
