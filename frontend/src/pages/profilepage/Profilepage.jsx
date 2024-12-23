import React from 'react';
import Header from '../../components/Header/Header';
import Profile from '../../components/Profile/Profile';
import Footer from '../../components/Footer/Footer';

const Profilepage = ({ cartItems }) => {
  return (
    <>
      <Header cartItems={cartItems} />
      <Profile />
      <Footer />
    </>
  );
};

export default Profilepage;