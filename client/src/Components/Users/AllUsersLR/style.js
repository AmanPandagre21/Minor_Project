import { createTheme, fontWeight } from "@mui/system";
import React from "react";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const allUsers = { width: "189px", height: "170px", marginTop: "20px" };

const gridDiv = {
  [theme.breakpoints.down("sm")]: {
    marginLeft: "70px",
  },
};
const button = {
  textDecoration: "none",
  background: " #C4C4C4",
  width: "200px",
  color: "black",
  fontFamily: "sans-serif",
  fontWeight: "600",
};

const heading = {
  fontFamily: "sans-serif",
  fontWeight: "800",
  alignContent: "center",
};

export default allUsers;
export { button, gridDiv, heading, theme };
