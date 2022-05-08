import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { attacher_activation } from "../../Slices/CarAttacherSlices/attacherAuthSlice";

const options = ["Desel", "Petrol"];

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const CarDetailsForm = () => {
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

  const { status } = useSelector((state) => state.attacherAuth);
  const { type, message } = status;

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

    dispatch(attacher_activation(formData));
  };

  React.useEffect(() => {
    if (type === "error") {
      toast.error(message);
    }
  }, [toast, type, message]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            encType="multipart/form-data"
            noValidate
            onSubmit={handleSubmit}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginTop: 2, fontSize: "30px", textAlign: "center" }}
            >
              Sign up
            </Typography>

            {/* <Typography component="h1" sx={{textAlign:'center'}} variant="h5">
              Sign up
            </Typography> */}

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="state"
                  required
                  fullWidth
                  id="state"
                  label="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  name="city"
                  label="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item md={12}>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ marginTop: 1, fontSize: "20px", textAlign: "center" }}
                >
                  Enter your Car Details Here
                </Typography>
              </Grid>
              <Grid item md={12} sm={12} xs={12} sx={{ display: "flex" }}>
                <Avatar
                  alt={carName}
                  src={previewAvatar}
                  sx={{
                    width: {
                      md: "80px",
                      sm: "80px",
                      xs: "80px",
                    },
                    height: {
                      md: "80px",
                      sm: "80px",
                      xs: "80px",
                    },

                    marginTop: "2px",
                  }}
                />
                {/* <Button ><input type='file' style={{marginTop:'35px'}}/></Button> */}

                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  name="carImage"
                  style={{ display: "none" }}
                  onChange={carImageDataChange}
                />
                <label htmlFor="icon-button-file">
                  <Button
                    variant="outlined"
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{
                      marginLeft: {
                        md: "15px",
                        sm: "14px",
                        xs: "16px",
                      },
                      width: "300px",
                      marginTop: 3,
                    }}
                  >
                    add image
                    {/* <CameraAltIcon sx={{
         
         fontSize:'30px'
        }}/> */}
                  </Button>
                </label>
              </Grid>
              {/* <Grid item md={6}>
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
              Sign Up
            </Button>
            {/* <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};
export default CarDetailsForm;
