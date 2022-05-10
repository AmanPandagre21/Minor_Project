import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  agency_login,
  clear_all_errors,
} from "../../Slices/TravelAgenciesSlices/travelAuthSlice";

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

const Tloginform = () => {
  const [pass, setPass] = React.useState("");
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { status, isAgencyAuth } = useSelector((state) => state.agencyAuth);

  const { type, message } = status;

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(agency_login(email, pass));
  };

  React.useEffect(() => {
    if (type === "error") {
      toast.error(message);
      dispatch(clear_all_errors());
    }

    if (isAgencyAuth) {
      navigate("/agency/account");
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
            <Avatar
              alt="Remy Sharp"
              src="/images/User.png"
              sx={{
                width: {
                  md: "150px",
                  sm: "150px",
                  xs: "150px",
                },
                height: {
                  md: "150px",
                  sm: "150px",
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
            <Typography
              component="h1"
              sx={{ textAlign: "center" }}
              variant="h5"
            >
              Login
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/agency/register" variant="body2">
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/agency/password/forgot" variant="body2">
                  Forgot Password
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
export default Tloginform;
