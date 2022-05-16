import { Button, Card, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import theme from "../../../theme";
import { ThemeProvider } from "@emotion/react";

const TCard = ({ agency }) => {
  const [value, setValue] = React.useState(2);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Card
          varient="outline"
          sx={{
            width: {
              md: "450px",
              sm: "450px",
              xs: "400px",
            },
            height: "250px",
            marginTop: "40px",
            marginLeft: {
              md: 0,
              sm: "200px",
            },
          }}
        >
          <div style={{ display: "flex" }}>
            <div className="sdiv"></div>
            <div>
              <img src={agency.avatar.url} className="cimg" />
              <h4 style={{ marginLeft: "40px ", marginTop: "0px" }}>
                TravelAgency
              </h4>
            </div>
            <div className="cardContent">
              {/* <p><span className='cardHeading'>
    Tour And Travels
    </span><br/>

    <span className='cardContent2'>TravelAgency@gmail.com </span><br/>
    <span className='cardContent2'>    9386573456</span>
    </p> */}

              <Typography
                varient="h4   "
                sx={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "22px",
                  marginTop: "10px",
                }}
              >
                {agency.name}
              </Typography>
              <Typography
                varient="h4   "
                sx={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: "17px",
                }}
              >
                <Rating name="diabled" value={agency.ratings} readOnly />
              </Typography>

              <Typography
                varient="h4   "
                sx={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: "17px",
                }}
              >
                {agency.email}
              </Typography>

              <Typography
                varient="h4"
                sx={{
                  textAlign: "center",
                  fontWeight: "300",
                  fontSize: "17px",
                }}
              >
                {agency.phone}
              </Typography>
              <Typography
                varient="h4   "
                sx={{
                  textAlign: "center",
                  fontWeight: "300",
                  fontSize: "17px",
                }}
              >
                {agency.address}
              </Typography>
              <Typography
                varient="h4   "
                sx={{
                  textAlign: "center",
                  fontWeight: "300",
                  fontSize: "17px",
                }}
              >
                {agency.city} ,({agency.state})
              </Typography>
              <Link
                to={`/travel_agencies/details/${agency._id}`}
                sx={{ TextDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    marginLeft: "65px",
                    marginTop: "10px",
                    width: "100px",
                    height: "50px",
                  }}
                >
                  view PRofile
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </ThemeProvider>
    </>
  );
};

export default TCard;
