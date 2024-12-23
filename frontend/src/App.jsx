import React, { useState, useEffect } from "react";
import AllRoutes from "./allroutes/AllRoutes";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { productsAPI } from "./api/products.api";
import { authService } from "./api/auth.service";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productsRes, cartRes] = await Promise.all([
          productsAPI.getAll(),
          productsAPI.getCart()
        ]);
        setProducts(productsRes.data.products);
        setCartItems(cartRes.data.items || []);
      } catch (error) {
        toast.error("Failed to fetch initial data");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const addToCart = async (product) => {
    if (!authService.isAuthenticated()) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    console.log("PRODUCT: " + product._id);

    try {
      await productsAPI.addToCart(product._id);
      const productExists = cartItems.find((item) => item.id === product._id);
      
      if (productExists) {
        setCartItems(cartItems.map(item => 
          item.id === product._id 
            ? { ...item, qty: item.qty + 1 }
            : item
        ));
      } else {
        setCartItems([...cartItems, { ...product, qty: 1 }]);
      }
      toast.success("Item added to cart");
    } catch (error) {

      toast.error("Failed to add item to cart" + error);
    }
  };

  const deleteFromCart = async (product) => {
    try {
      await productsAPI.removeFromCart(product._id);
      const updatedCart = cartItems.map(item =>
        item.id === product._id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      ).filter(item => !(item.id === product._id && item.qty === 1));
      
      setCartItems(updatedCart);
      toast.success("Item updated in cart");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const checkOut = async () => {
    if (!authService.isAuthenticated()) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      console.log(cartItems);
      await productsAPI.checkout(cartItems);
      setCartItems([]);
      toast.success("Order placed successfully");
    } catch (error) {
      toast.error("Checkout failed" + error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster />
      <AllRoutes
        productItems={products}
        cartItems={cartItems}
        addToCart={addToCart}
        deleteFromCart={deleteFromCart}
        checkOut={checkOut}
      />
    </>
  );
}

export default App;