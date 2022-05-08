import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Button, Grid, Input, IconButton } from "@mui/material";
import theme from "../../theme";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  update_user,
  user_details,
  update_user_reset,
} from "../../Slices/UsersSlices/authSlice";

const Profile = () => {
  const { user, status, isUpdated } = useSelector((state) => state.users);
  const { type, message } = status;
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);

  const activateUserProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateUserSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    dispatch(update_user(formData));
  };

  useEffect(() => {
    if (type === "error") {
      toast.error(message);
    }

    if (isUpdated) {
      toast.success(message);

      dispatch(user_details());

      dispatch(update_user_reset());
    }
  }, [type, message, dispatch]);

  return (
    <>
      <Avatar
        alt={user.name}
        src={avatarPreview}
        sx={{
          width: {
            md: "200px",
            sm: "200px",
            xs: "150px",
          },
          height: {
            md: "200px",
            sm: "200px",
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

      <ThemeProvider theme={theme}>
        <form
          className="formEdit"
          encType="multipart/form-data"
          onSubmit={updateUserSubmit}
        >
          <Grid item md={6} sm={6} xs={12}>
            <input
              id="icon-button-file"
              type="file"
              name="avatar"
              accept="image/*"
              style={{ display: "none" }}
              onChange={activateUserProfileDataChange}
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
          <Grid
            container
            sx={{
              width: {
                md: "40vw",
                sm: "49vw",
              },
              height: "auto",
              marginTop: "10px",
              padding: "2em 0",
            }}
          >
            <Grid item md={6} sm={6} xs={12} sx={{ width: "30%" }}>
              <label>Name</label>
              {/* <input className='inputField1' name="name" value={pData.name} onChange={handleChange}/> */}
              <div>
                <TextField
                  id="outlined-basic"
                  label={name}
                  value={name}
                  name="name"
                  className="profileText"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
              <label>Phone No.</label>
              {/* <input className='inputField1' name="phone" value={pData.phone} onChange={handleChange} /> */}
              <div>
                <TextField
                  id="outlined-basic"
                  label={user.phone}
                  name="phone"
                  value={user.phone}
                  disabled
                  className="profileText"
                />
              </div>
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <label>Email ID</label>
              {/* <input className='inputField2' name="email" value={pData.email} onChange={handleChange} /> */}
              <div>
                <TextField
                  id="outlined-basic"
                  label={email}
                  name="email"
                  value={email}
                  className="profileEmailText"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Grid>

            <button
              variant="contained"
              sx={{
                background: "#5381F4",
                border: "0px solid",
                height: "50px",
                width: {
                  md: "200px",
                  sm: "160px",
                  xs: "150px",
                  sx: "250px",
                },
                borderRadius: "37px",
                marginLeft: {
                  md: "auto",
                  sm: "130px",
                },
                marginRight: "auto",
                marginTop: 2,
              }}
            >
              Edit
            </button>
          </Grid>
        </form>
      </ThemeProvider>
    </>
  );
};
export default Profile;
