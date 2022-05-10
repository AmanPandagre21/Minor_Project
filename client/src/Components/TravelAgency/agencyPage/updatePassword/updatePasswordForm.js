import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import {
  agency_password_update,
  update_reset,
} from "../../../../Slices/TravelAgenciesSlices/agencyProfileSlice";
import { get_agency_profile } from "../../../../Slices/TravelAgenciesSlices/travelAuthSlice";

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

const updatePasswordForm = () => {
  const [fdata, setFdata] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const { isUpdated, status } = useSelector((state) => state.agencies);

  const { type, message } = status;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(agency_password_update(fdata));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFdata((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  React.useEffect(() => {
    if (type === "error") {
      toast.error(message);
    }

    if (isUpdated) {
      toast.success(message);

      dispatch(get_agency_profile());

      dispatch(update_reset());

      setFdata({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [type, message, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: "center", marginTop: 2, fontSize: "30px" }}
            >
              Update Password
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="opass"
                  label="old Password"
                  name="oldPassword"
                  autoComplete="old-password"
                  onChange={handleChange}
                  value={fdata.oldPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="npass"
                  label="New Password"
                  name="newPassword"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={fdata.newPassword}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  value={fdata.confirmPassword}
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  onChange={handleChange}
                  autoComplete="confirm-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Password
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};
export default updatePasswordForm;
