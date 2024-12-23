import React from "react";
import Header from "../../components/Header/Header";
import Registrationform from "../../components/Registrationform/Registrationform";
import Footer from "../../components/Footer/Footer";

const Registrationpage = ({ cartItems }) => {
  return (
    <>
      <Header cartItems={cartItems} />
      <Registrationform />
      <Footer />
    </>
  );
};

export default Registrationpage;
