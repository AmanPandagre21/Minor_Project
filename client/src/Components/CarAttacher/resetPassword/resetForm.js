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

import { useNavigate, useParams } from "react-router-dom";
import {
  forgot_password_reset,
  reset_password,
} from "../../../Slices/CarAttacherSlices/attacherAuthSlice";

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

const ResetForm = ({ match }) => {
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");

  const dispatch = useDispatch();
  const { status, setMessage } = useSelector((state) => state.attacherAuth);
  const { type, message } = status;
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(reset_password(token, password, confirmpassword));
  };

  React.useEffect(() => {
    if (type === "error") {
      toast.error(message);
    }

    if (setMessage !== null) {
      toast.success(message);
      dispatch(forgot_password_reset());
      navigate("/attacher/account");
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
              Reset Password
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="npass"
                  label="New Password"
                  name="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmpassword}
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
              Reset Password
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};
export default ResetForm;
