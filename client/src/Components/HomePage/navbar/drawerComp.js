import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const DrawerComp = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const pages = ["Home", "Cars", "Service", "Contact Us", "Login/Register"];
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(!openDrawer)}>
        <List sx={{ width: "200px", height: "100vh", background: "#F2F0F0" }}>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText
                sx={{
                  color: "black",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                }}
              >
                Home
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <ListItemText
                sx={{
                  color: "black",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                }}
              >
                Cars
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <ListItemText
                sx={{
                  color: "black",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                }}
              >
                Services
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <ListItemText
                sx={{
                  color: "black",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                }}
              >
                Contact Us
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/allUsers")}>
            <ListItemIcon>
              <ListItemText
                sx={{
                  color: "black",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                }}
              >
                Login/Registeration
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        sx={{ marginLeft: "auto" }}
      >
        <MenuIcon sx={{ color: "black" }} />
      </IconButton>
    </>
  );
};
export default DrawerComp;
