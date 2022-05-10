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
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import { IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useDispatch, useSelector } from "react-redux";

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

const agencyProfile = () => {
  const { agency } = useSelector((state) => state.agencyAuth);
  // const { status, isUpdated } = useSelector((state) => state.drivers);
  // const { type, message } = status;
  const dispatch = useDispatch();

  const [name, setName] = React.useState(agency.name);
  const [email, setEmail] = React.useState(agency.email);
  const [phone, setPhone] = React.useState(agency.phone);
  const [city, setCity] = React.useState(agency.city);
  const [avatar, setAvatar] = React.useState("");
  const [avatarPreview, setAvatarPreview] = React.useState(agency.avatar.url);

  const imageChangeHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.set("name", name);
    formData.set("phone", phone);
    formData.set("city", city);
    formData.set("avatar", avatar);
    // dispatch(update_driver_profile(formData));
  };

  // React.useEffect(() => {
  //   if (type === "error") {
  //     toast.error(message);
  //   }

  //   if (isUpdated) {
  //     toast.success(message);

  //     // dispatch(get_driver_profile());

  //     // dispatch(update_reset());
  //   }
  // }, [type, message, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          width: {
            md: 700,
            sm: 700,
            xs: 300,
          },
          // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          marginLeft: {
            md: "auto",
            sm: "auto",
            xs: 10,
          },
          marginRight: {
            md: "auto",
            sm: "auto",
          },
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
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
            <Avatar
              alt={name}
              src={avatarPreview}
              sx={{
                width: {
                  md: "200px",
                  sm: "200px",
                  xs: "200px",
                },
                height: {
                  md: "200px",
                  sm: "200px",
                  xs: "200px",
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
                disabled
                name="avatar"
                onChange={imageChangeHandler}
                style={{ display: "none" }}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    marginLeft: {
                      md: "250px",
                      sm: "250px",
                      xs: "110px",
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

            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontWeight: {
                      md: 600,
                      sm: 600,
                      xs: 600,
                    },
                    fontSize: {
                      md: 30,
                      sm: 30,
                      xs: 10,
                    },
                    textAlign: "center",
                  }}
                >
                  {agency && agency.name}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  disabled
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="phoneno"
                  disabled
                  label="Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  id="phoneno"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  name="email"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  value={email}
                  id="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  disabled
                  label="state"
                  onChange={(e) => setCity(e.target.value)}
                  value={agency && agency.state}
                  id="city"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  disabled
                  label="City"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  id="city"
                />
              </Grid>
            </Grid>
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button> */}
            <Grid container justifyContent="flex-end">
              {/* <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid> */}
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};
export default agencyProfile;
