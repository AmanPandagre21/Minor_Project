import { ThemeProvider } from "@emotion/react";
import { Card, Typography } from "@mui/material";
import React from "react";
import Avatar from "@mui/material/Avatar";
import theme from "../../../theme";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { display } from "@mui/system";

const DCards = ({ driver }) => {
  console.log(driver);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            width: {
              md: "20vw",
              sm: "40vw",
              xs: "70vw",
            },
            height: {
              md: "50vh",
              sm: "50vh",
              xs: "40vh",
            },
            marginTop: "40px",
            background:
              "url(https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-pre-2020-813x265.jpeg)",
            backgroundSize: {
              md: "310px 110px",
              sm: "330px 110px",
              xs: "350px 110px",
            },
            backgroundRepeat: "no-repeat",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={driver.avatar.url}
            sx={{
              width: {
                md: "150px",
                sm: "150px",
                xs: "150px",
              },
              height: {
                md: "150px",
                sm: "150px",
                xs: "150px",
              },
              marginLeft: {
                md: "auto",
                sm: "auto",
                xs: "auto",
                sx: "auto",
              },
              marginRight: {
                md: "auto",
                sm: "auto",
                xs: "auto",
                sx: "auto",
              },

              marginTop: "25px",
            }}
          />
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "22px",
                textAlign: "center",
              }}
            >
              {driver.name}
            </Typography>
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                textAlign: "center",
                display: "flex",
                marginLeft: 7,
                marginTop: 1,
              }}
            >
              <LocalPostOfficeIcon />
              <span style={{ marginLeft: 5 }}>{driver.email}</span>
            </Typography>

            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                textAlign: "center",
                display: "flex",
                marginLeft: 7,
                marginTop: 1,
              }}
            >
              <PermPhoneMsgIcon />
              <span style={{ marginLeft: 5 }}>{driver.phone}</span>
            </Typography>

            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                textAlign: "center",
                display: "flex",
                marginLeft: 7,
                marginTop: 1,
              }}
            >
              <LocationOnIcon />
              <span style={{ marginLeft: 5 }}>{driver.city}</span>
            </Typography>
          </div>
        </Card>
      </ThemeProvider>
    </>
  );
};
export default DCards;
