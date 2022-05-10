import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../../../theme";
import FormGroup from "@mui/material/FormGroup";
import { toast } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Autocomplete from "@mui/material/Autocomplete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { attacher_activation } from "../../../../Slices/CarAttacherSlices/attacherAuthSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { add_agency_car } from "../../../../Slices/TravelAgenciesSlices/agencyProfileSlice";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [carImage, setCarImage] = React.useState("");
  const [previewAvatar, setpreviewAvatar] = React.useState(
    "/static/images/avatar/1.jpg"
  );

  const [carInfo, setCarInfo] = React.useState({
    carName: "",
    carType: "",
    ac: "",
    bags: "",
    pricePerKm: "",
    seats: "",
    fuelType: "",
  });

  // const { setMessage, isUpdated, status } = useSelector(
  //   (state) => state.attachers
  // );

  const dispatch = useDispatch();

  const { carName, carType, ac, bags, pricePerKm, seats, fuelType } = carInfo;

  const carImageDataChange = (e) => {
    if (e.target.name === "carImage") {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setpreviewAvatar(reader.result);
          setCarImage(reader.result);
        }
      };
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCarInfo((old) => {
      return {
        ...old,
        [name]: value,
      };
    });

    // console.log(carInfo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.set("state", state);
    formData.set("city", city);
    formData.set("carName", carName);
    formData.set("carType", carType);
    formData.set("ac", ac === "ac" ? 1 : 0);
    formData.set("bags", bags);
    formData.set("seats", seats);
    formData.set("fuelType", fuelType);
    formData.set("pricePerKm", pricePerKm);
    formData.set("carImage", carImage);

    dispatch(add_agency_car(formData));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={handleClickOpen}
        sx={{ marginLeft: 3, marginTop: "6px", height: "60px", width: "100px" }}
      >
        Add Car
      </Button>
      {/* <Button variant="outlined" >
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box
            component="form"
            noValidate
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginTop: 2, fontSize: "40px", textAlign: "center" }}
            >
              Add Car
            </Typography>
            <Avatar
              alt={carName}
              src={previewAvatar}
              sx={{
                width: {
                  md: "100px",
                  sm: "100px",
                  xs: "150px",
                },
                height: {
                  md: "100px",
                  sm: "100px",
                  xs: "150px",
                },
                marginLeft: {
                  md: "auto",
                  sm: "auto",
                  xs: "auto",
                  sx: 18,
                },
                marginRight: {
                  md: "auto",
                  sm: "auto",
                  xs: "auto",
                  sx: 18,
                },

                marginTop: "10px",
              }}
            />
            <Grid item md={6} sm={6} xs={12}>
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                name="carImage"
                style={{ display: "none" }}
                onChange={carImageDataChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    marginLeft: {
                      md: "245px",
                      sm: "240px",
                      xs: "140px",
                    },

                    size: "500px",
                  }}
                >
                  <CameraAltIcon
                    sx={{
                      fontSize: "30px",
                    }}
                  />
                </IconButton>
              </label>
            </Grid>
            {/* <Typography component="h1" sx={{textAlign:'center'}} variant="h5">
              Sign up
            </Typography> */}

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {/* <Grid item xs={12} sm={6}>
                  <TextField
                 
                    autoComplete="given-name"
                    name="state"
                    required
                    fullWidth
                    id="state"
                    label="state"
                    autoFocus
                  />
                </Grid> */}
              {/* <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    
                    fullWidth
                    id="city"
                    name="city"
                    label="city"
                    autoComplete="family-name"
                  />
                </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="carName"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  value={carName}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="type"
                  name="carType"
                  label="type"
                  autoComplete="family-name"
                  value={carType}
                  onChange={changeHandler}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  type="number"
                  name="bags"
                  required
                  fullWidth
                  id="bags"
                  value={bags}
                  onChange={changeHandler}
                  label="bags"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  id="ppkm"
                  name="pricePerKm"
                  value={pricePerKm}
                  onChange={changeHandler}
                  label="price per km"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  id="seats"
                  name="seats"
                  value={seats}
                  onChange={changeHandler}
                  label="seats"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        FuelType
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fuelType}
                        label="Age"
                        name="fuelType"
                        onChange={changeHandler}
                      >
                        <MenuItem value="desiel">Desiel</MenuItem>
                        <MenuItem value="petrol">Petrol</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={ac}
                  name="ac"
                  onChange={changeHandler}
                >
                  <FormControlLabel value="ac" control={<Radio />} label="Ac" />
                  <FormControlLabel
                    value="nonac"
                    control={<Radio />}
                    label="Non AC"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Car
            </Button>
            {/* <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid> */}
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
