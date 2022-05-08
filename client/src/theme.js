import { createTheme } from "@mui/material";
import react from "react";

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // small phone
      sx: 300, // phone
      xs: 400, // phone
      sm: 600, // tablets
      md: 950, // small laptop
    },
  },
});

export default theme;
