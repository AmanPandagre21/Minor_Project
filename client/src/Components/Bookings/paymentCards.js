import { Box, Button, Card, Checkbox, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { IconButton } from "@mui/material";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";

const PaymentCards = ({ agency, carId }) => {
  // find car index
  const index = agency.carsAndDrivers.findIndex((ele) => ele._id === carId);
  const [carDetails, setCarDetails] = useState(
    agency.carsAndDrivers[index].cars
  );

  // today date
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  //  states

  const [booking, setBooking] = useState({
    pickupPoint: "",
    destination: "",
    pikupDate: new Date(),
    pickupTime: "",
    dropDate: new Date(),
    tripType: "",
  });

  // on Change Handler
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setBooking((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  const bookingData = {
    pickupPoint: booking.pickupPoint,
    destination: booking.destination,
    pikupDate: booking.pikupDate,
    pickupTime: booking.pickupTime,
    dropDate: booking.dropDate,
    tripType: booking.tripType,
  };
  console.log(bookingData);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {}, []);

  return (
    <>
      <Grid container sx={{ marginTop: "3rem" }}>
        <Grid item md={6} sm={6}>
          <Box
            sx={{
              width: {
                md: "50vw",
                sm: "90vw",
              },
              height: {
                md: "30vh",
                sm: "80vh",
              },

              marginTop: "50px",
              borderRadius: "6px",
              boxShadow: {
                md: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                sm: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                xs: "rgba(0, 0, 0, 0) 0px 0px 0px",
              },
              marginLeft: 10,
            }}
          >
            <Grid container>
              <Grid item md={5}>
                <img src={carDetails.carImage.url} className="bookingCar" />
              </Grid>
              <Grid item md={7} mt={4}>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "22px",
                  }}
                >
                  {carDetails.carName}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "22px",
                  }}
                >
                  {/* <Rating name="read-only" value={value} readOnly /> */}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "16px",
                    display: "flex",

                    //   marginTop:1
                  }}
                >
                  {carDetails.carType} | {carDetails.ac === 1 ? "AC" : "NON AC"}{" "}
                  | {carDetails.seats} Seats
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "13px",

                    display: "flex",

                    //   marginTop:1
                  }}
                >
                  587 kms included<br></br>₹{carDetails.pricePerKm}.0/km after
                  587 kms
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "13px",

                    display: "flex",

                    //   marginTop:1
                  }}
                >
                  {carDetails.bags} luggage bags
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "300",
                    fontSize: "17px",

                    display: "flex",

                    //   marginTop:1
                  }}
                >
                  {carDetails.fuelType}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              width: {
                md: "50vw",
                sm: "90vw",
              },
              height: {
                md: "65vh",
                sm: "80vh",
              },

              marginTop: "50px",
              borderRadius: "6px",
              boxShadow: {
                md: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                sm: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                xs: "rgba(0, 0, 0, 0) 0px 0px 0px",
              },
              marginLeft: 10,
            }}
          >
            <Grid container ml={5}>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ marginTop: 2, fontSize: "30px", textAlign: "center" }}
                >
                  Fill details to confirm booking
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={5} ml={2}>
                    <span>Pick up point</span>

                    <TextField
                      autoComplete="given-name"
                      name="pickupPoint"
                      required
                      fullWidth
                      id="pickupPoint"
                      label="pickupPoint"
                      value={booking.pickupPoint}
                      onChange={changeHandler}
                    />
                  </Grid>

                  <Grid item xs={12} sm={5} ml={2}>
                    <span>Pick up Date</span>
                    <br />
                    <DatePicker
                      value={booking.pikupDate}
                      onChange={changeHandler}
                      name="pickupDate"
                      minDate={new Date()}
                      format="dd/MM/yyyy"
                    />
                    {/* <TextField
                      required
                      type="date"
                      fullWidth
                      id="type"
                      name="pickupDate"
                      autoComplete="family-name"
                    /> */}
                  </Grid>

                  <Grid item xs={12} sm={5} ml={2}>
                    <span>Destination point</span>

                    <TextField
                      autoComplete="given-name"
                      type="text"
                      name="destination"
                      required
                      fullWidth
                      value={booking.destination}
                      onChange={changeHandler}
                      id="DestinationPoint"
                      label="DestinationPoint"
                    />
                  </Grid>

                  <Grid item xs={10} sm={5} ml={2}>
                    <span>Drop Date</span>
                    <br />
                    <DatePicker
                      value={booking.dropDate}
                      minDate={new Date()}
                      name="dropDate"
                      format="dd/MM/yyyy"
                      onChange={changeHandler}
                    />
                    {/* <TextField
                      id="outlined-size-small"
                      defaultValue="Small"
                      required
                      type="date"
                      fullWidth
                      value={booking.dropDate}
                      onChange={changeHandler}
                      name="dropDate"
                      autoComplete="family-name"
                    /> */}
                  </Grid>
                  <Grid item xs={12} md={10.3} ml={2}>
                    <span>Pick Up Time</span>
                    <TextField
                      type="time"
                      required
                      fullWidth
                      id="pickUpTime"
                      name="pickupTime"
                      value={booking.pickupTime}
                      onChange={changeHandler}
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={10} ml={2} sx={{ display: "flex" }}>
                    <FormControl fullWidth>
                      <InputLabel id="trip-type">Trip Type</InputLabel>
                      <Select
                        id="tripType"
                        name="tripType"
                        onChange={changeHandler}
                        value={booking.tripType}
                        label="Trip Type"
                        // onChange={handleChange}
                      >
                        <MenuItem value="">Select Trip </MenuItem>
                        <MenuItem value="one-way">Outstation One Way</MenuItem>
                        <MenuItem value="round-trip">
                          Outstation Round Trip
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      ml: "70px",
                      mr: "70px",
                      width: "500px",
                    }}
                  >
                    confirm booking
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={6} sm={6}>
          <Box
            sx={{
              width: {
                md: "30vw",
                sm: "90vw",
              },
              height: {
                md: "45vh",
                sm: "80vh",
              },

              marginTop: "50px",
              borderRadius: "6px",
              boxShadow: {
                md: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                sm: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                xs: "rgba(0, 0, 0, 0) 0px 0px 0px",
              },
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div style={{ padding: "20px" }}>
              <FormGroup sx={{ display: "flex", mt: 5 }}>
                <FormControlLabel
                  label="Make Part payment Now"
                  control={<Checkbox defaultChecked />}
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Make full Payment Now"
                />
              </FormGroup>
              <hr></hr>
              <Typography>
                <span style={{ fontSize: 20 }}>Total Amount:-</span>
                <br></br>
                <span>inc. tolls taxes</span>
              </Typography>

              <Button variant="contained" fullWidth sx={{ height: "50px" }}>
                Pay Now
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentCards;
