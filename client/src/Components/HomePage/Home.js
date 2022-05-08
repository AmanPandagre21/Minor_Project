import { Container } from "@mui/material";
import React from "react";
import Header from "./header";
import OurServices from "./ourServices";
import Footer from "./Footer/Footer";
import "./style.css";

const Home = () => {
  return (
    <>
      <Container maxWidth={false}>
        <Header />
        <OurServices />
        <Footer />
      </Container>
    </>
  );
};
export default Home;
