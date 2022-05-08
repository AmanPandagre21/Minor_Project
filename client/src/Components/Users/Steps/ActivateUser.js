import React, { useEffect, useRef, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./userLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { activate_user } from "../../../Slices/UsersSlices/authSlice";
import { toast } from "react-toastify";

const ActivateUser = () => {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const dispatch = useDispatch();

  const { type, message } = useSelector((state) => state.users.status);

  const activateUserProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);

      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setAvatarPreview(Reader.result);
          // console.log(Reader.result);
          setAvatar(Reader.result);
        }
      };
    }
  };

  const activateUserSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    dispatch(activate_user(formData));
  };

  useEffect(() => {
    if (type === "error") {
      toast.error(message);
    }
  }, [type, message]);

  return (
    <>
      <div className="firstDiv">
        <div className="wrapperClassForActivate">
          <div className="textDiv">
            <p className="userLoginText1">Registration Form</p>
          </div>
          <form
            encType="multipart/form-data"
            onSubmit={activateUserSubmit}
            className="activateUserForm"
          >
            <img src={avatarPreview} className="userAvatar" alt="avatar" />
            <button
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click();
              }}
              className="addImage"
            >
              <AddPhotoAlternateIcon style={{ fontSize: "2.2em" }} />
            </button>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              name="avatar"
              accept="image/*"
              onChange={activateUserProfileDataChange}
            />

            <Box
              sx={{
                maxWidth: "100%",
                marginTop: "1.2em",
              }}
            >
              <TextField
                required
                label="Name"
                className="actiavteText"
                value={name}
                name="name"
                size="normal"
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                maxWidth: "100%",
                marginTop: "1.2em",
              }}
            >
              <TextField
                required
                label="Email"
                className="actiavteText"
                value={email}
                name="email"
                size="normal"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <button className="activateButton">Finish</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ActivateUser;
