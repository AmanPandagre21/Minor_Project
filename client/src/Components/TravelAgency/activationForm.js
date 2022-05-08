import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import theme from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { agency_activation } from "../../Slices/TravelAgenciesSlices/travelAuthSlice";

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

const Aform = () => {
  const [activateDetails, setActivateDetails] = React.useState({
    state: "",
    city: "",
    address: "",
    pincode: "",
  });

  const { state, city, address, pincode } = activateDetails;

  const dispatch = useDispatch();
  const { type, message } = useSelector((state) => state);

  const activateFormHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setActivateDetails((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(agency_activation(activateDetails));
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
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Typography
              component="h1"
              sx={{ textAlign: "center", marginTop: "40px" }}
              variant="h5"
            >
              Activate Agency
            </Typography>

            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="state"
                  required
                  fullWidth
                  id="state"
                  label="state"
                  value={state}
                  onChange={activateFormHandler}
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
                  onChange={activateFormHandler}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label=" Address"
                  name="address"
                  value={address}
                  onChange={activateFormHandler}
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="pincode"
                  label="pincode"
                  id="pincode"
                  value={pincode}
                  onChange={activateFormHandler}
                  autoComplete="new-pincode"
                />
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};
export default Aform;
