import React from "react";
import Allproducts from "../../components/Allproducts/Allproducts";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Allproductspage = ({ cartItems, addToCart }) => {
  return (
    <>
      <Header cartItems={cartItems} />
      <Allproducts addToCart={addToCart} />
      <Footer />
    </>
  );
};

export default Allproductspage;