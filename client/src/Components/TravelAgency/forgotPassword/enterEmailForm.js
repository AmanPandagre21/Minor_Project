import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import UIconImg from "../../../Images/userIcon.jpg";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { forgot_password } from "../../../Slices/TravelAgenciesSlices/travelAuthSlice";

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

const EnterEform = () => {
  const [email, setEmail] = React.useState("");

  const dispatch = useDispatch();
  const { status, setMessage } = useSelector((state) => state.agencyAuth);
  const { type, message } = status;

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(forgot_password(email));
  };

  React.useEffect(() => {
    if (type === "error") {
      toast.error(message);
    }

    if (setMessage !== null) {
      toast.success(message);

      dispatch(forgot_password_reset());
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
              sx={{ textAlign: "center", marginTop: 2, fontSize: "20px" }}
            >
              Enter Email Address
            </Typography>

            {/* <Typography component="h1" sx={{textAlign:'center'}} variant="h5">
              Login
            </Typography> */}

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};
export default EnterEform;
