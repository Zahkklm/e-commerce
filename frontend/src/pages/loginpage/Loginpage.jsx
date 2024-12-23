import Header from "../../components/Header/Header";
import Loginform from "../../components/Loginform/Loginform";
import Footer from "../../components/Footer/Footer";

const Loginpage = ({ cartItems }) => {
  return (
    <>
      <Header cartItems={cartItems} />
      <Loginform />
      <Footer />
    </>
  );
};

export default Loginpage;
