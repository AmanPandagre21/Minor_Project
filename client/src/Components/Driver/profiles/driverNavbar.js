import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import theme from "../../../theme";
import { ThemeProvider } from "@emotion/react";
import PersistentDrawerLeft from "./drawer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../../Users/userStyle.css";
import { useNavigate } from "react-router-dom";
import { logout_driver } from "../../../Slices/DriverSlices/driverAuthSlice";

// const pages = ["Home", "Travel Agency", "Drivers"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { driver } = useSelector((state) => state.driverAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const home = () => {
    navigate("/");
  };
  const agency = () => {
    navigate("/travel_agencies");
  };
  //   const driver = () => {
  //     navigate("/drivers");
  //   };
  const accountHandler = () => {
    navigate("/driver/account");
  };
  const logoutHandler = () => {
    dispatch(logout_driver());
    toast.success("Logout Successfully");
  };

  return (
    <>
      <AppBar
        position="static"
        style={{
          // background: "#ff6363",
          background: "rgb(34,193,195)",
          background:
            "linear-gradient(0deg, rgba(34,193,195,1) 50%, rgba(40,144,158,1) 100%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ThemeProvider theme={theme}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Rye",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: {
                    md: "20px",
                    sm: "20px",
                    xs: "15px",
                  },
                  marginLeft: "45px",
                  color: "black",
                }}
              >
                WHEELZSTACK
              </Typography>
            </ThemeProvider>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ marginLeft: "30px", color: "black" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={home}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={agency}>
                  <Typography textAlign="center">Travel Agencies</Typography>
                </MenuItem>
                {/* <MenuItem onClick={driver}>
                  <Typography textAlign="center">Driver</Typography>
                </MenuItem> */}
              </Menu>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                fontFamily: "Rye",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "20px",
                marginLeft: "50px",
                color: "black",
              }}
            >
              WHEELZSTACK
            </Typography>
            <Box
              sx={{ display: { xs: "none", md: "flex" }, marginLeft: "auto" }}
            >
              <Button onClick={home} sx={{ color: "white" }} className="navBtn">
                Home
              </Button>
              <Button
                onClick={agency}
                sx={{ color: "white" }}
                className="navBtn"
              >
                Travel Agency
              </Button>
              {/* <Button onClick={driver} className="navBtn">
                Drivers
              </Button> */}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={driver.name} src={driver.avatar.url} />{" "}
                  <h4 style={{ marginLeft: "3px" }}>{driver.name}</h4>
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
                <MenuItem onClick={accountHandler}>
                  <Typography textAlign="center">Manage Account</Typography>
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default NavBar;
