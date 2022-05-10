import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Button, Grid, IconButton, Link, Box } from "@mui/material";
import { toast } from "react-toastify";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { agency_registration } from "../../Slices/TravelAgenciesSlices/travelAuthSlice";
import { useNavigate } from "react-router-dom";

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
        Your Websitecmd
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Rform = () => {
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setpreviewAvatar] = useState(
    "/static/images/avatar/1.jpg"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { status, isAgencyAuth } = useSelector((state) => state.agencyAuth);
  const { type, message } = status;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const agencyProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setpreviewAvatar(reader.result);
          setAvatar(reader.result);
        }
      };
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("password", password);
    formData.set("confirmpassword", confirmPassword);
    formData.set("avatar", avatar);

    dispatch(agency_registration(formData));
  };

  useEffect(() => {
    if (type === "error") {
      toast.error(message);
    }
    if (isAgencyAuth) {
      navigate("/agency/activate");
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
          {/* <LockOutlinedIcon />
            </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            encType="multipart/form-data"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
            <Avatar
              alt="Remy Sharp"
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
                id="icon-button-file"
                type="file"
                name="avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={agencyProfileDataChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    marginLeft: "355px",
                    size: "500px",
                  }}
                >
                  <CameraAltIcon
                    sx={{
                      fontSize: "40px",
                    }}
                  />
                </IconButton>
              </label>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="number"
                  fullWidth
                  id="phoneno"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  label="phoneno"
                  autoComplete="family-name"
                />
              </Grid>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/agency/login" variant="2">
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
export default Rform;
