import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import DrawerComp from "./drawerComp";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AllUsers from "../../Users/AllUsersLR/allUsers";
import { useNavigate } from "react-router-dom";

const settings = ["Manage Account", "Logout"];
const NavBar = () => {
  const [login, setlogin] = useState(false);
  const [modal, setModal] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleUserMenu = (e) => {
    if (e == "Manage Account") navigate("/userProfile");
  };

  const handleCloseUserMenu = (s) => {
    navigate("/userProfile");
    setAnchorElUser(null);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const isMatch = useMediaQuery("(max-width:950px)");
  console.log(isMatch);

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          background: "rgb(34,193,195)",
          background:
            "linear-gradient(0deg, rgba(34,193,195,1) 50%, rgba(40,144,158,1) 100%)",
        }}
      >
        <Toolbar>
          <Tabs>
            <Tab
              label="WheelzStack"
              sx={{
                fontFamily: "Rye",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "24px",
                marginLeft: "130px",
                color: "white",
              }}
              elevation={0}
            />
          </Tabs>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs sx={{ marginLeft: "auto" }}>
                navigate("/")
                <Tab
                  label="Home"
                  sx={{ fontWeight: "700", color: "white" }}
                  onClick={() => {
                    navigate("/");
                  }}
                />
                <Tab
                  label="Travel Agencies"
                  sx={{ fontWeight: "700", color: "white" }}
                  onClick={() => {
                    navigate("/travel_agencies");
                  }}
                />
                navigate("/drivers")
                <Tab
                  label="Drivers"
                  sx={{ fontWeight: "700", color: "white" }}
                  onClick={() => {
                    navigate("/drivers");
                  }}
                />
                {/* <Tab label="Contact Us" sx={{fontWeight:'700', color:'black'}}/> */}
                {login ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={toggleModal}
                    sx={{
                      width: "14em",
                      height: "2.8em",
                      top: "4px",
                      background: "rgb(250,245,228)",
                      fontSize: ".8em",
                      wordSpacing: ".1em",
                      fontWeight: "600",
                      color: "black",
                      borderRadius: "12px",
                    }}
                  >
                    Login / Registeration
                  </Button>
                )}
                {modal && (
                  <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                      <AllUsers />
                      <button
                        className="close-modal"
                        onClick={toggleModal}
                      ></button>
                    </div>
                  </div>
                )}
              </Tabs>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default NavBar;
