import React, { useEffect, useState } from "react";
import "./Cart.css";
import { authService } from "../../api/auth.service";
import { productsAPI } from "../../api/products.api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = ({
}) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await productsAPI.getCart();
        const data = response.data;
        console.log("Cart Data:", data);
        const mappedItems = data.items.map((item) => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          qty: item.quantity,
          image: item.product.image,
          total_price: data.total,
          userid: data.user,                    
        }));
        console.log("Mapped Items:", mappedItems);
        setCartItems(mappedItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  console.log("Cart Items:", cartItems);

  const addToCart = async (product) => {
    if (!authService.isAuthenticated()) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    console.log("PRODUCT: " + JSON.stringify(product));

    try {
      const productExists = cartItems.find((item) => item.id === product.id);
      console.log("productid:", product.id);
      if (productExists) {
        console.log("Product Exists:", productExists);
        await productsAPI.updateCartQuantity(product.id, productExists.qty + 1);
        setCartItems(cartItems.map(item => 
          item.id === product.id 
            ? { ...item, qty: item.qty + 1 }
            : item
        ));
      } else {
        await productsAPI.addToCart(product.id);
        setCartItems([...cartItems, { ...product, qty: 1 }]);
      }
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Failed to add item to cart" + error);
    }
  };

  const decreaseQuantity = async (product) => {
    try {
      const productExists = cartItems.find((item) => item.id === product.id);
      if (productExists.qty > 1) {
        await productsAPI.updateCartQuantity(product.id, productExists.qty - 1);
        setCartItems(cartItems.map(item => 
          item.id === product.id 
            ? { ...item, qty: item.qty - 1 }
            : item
        ));
      } else {
        await productsAPI.removeFromCart(product.id);
        setCartItems(cartItems.filter(item => item.id !== product.id));
      }
      toast.success("Item quantity updated in cart");
    } catch (error) {
      toast.error("Failed to update item quantity in cart");
    }
  };

  const deleteFromCart = async (product) => {
    try {
      await productsAPI.removeFromCart(product.id);
      setCartItems(cartItems.filter(item => item.id !== product.id));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
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
      // Fetch the latest cart items
      const response = await productsAPI.getCart();
      console.log("Response:", response.data);
      const latestCartItems = response.data.items;
      console.log("Latest Cart Items:", latestCartItems);

      await productsAPI.checkout(response.data);
      setCartItems([]);
      toast.success("Order placed successfully");

      // clear the cart
      await productsAPI.clearCart();

    } catch (error) {
      toast.error("Checkout failed" + error);
    }
  };

  const totalPrice = cartItems.reduce(
    (price, item) => price + item.qty * item.price,
    0
  ).toFixed(2);

  return (
    <>
      <section className="cart-items">
        <div className="container cart-flex">
          <div className="cart-details">
            {cartItems.length === 0 && (
              <h1 className="no-items product">
                There are no items in the cart.
              </h1>
            )}
            {cartItems.map((item) => {
              const productQty = (item.price * item.qty).toFixed(2);
              return (
                <div
                  className="cart-list product d_flex cart-responsive"
                  key={item.id}
                >
                  <div className="img">
                    <img
                      src={item.image}
                      alt="Picture of this item is unavailable"
                    />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      {item.price.toFixed(2)} x {item.qty}
                    </h4>
                    <span>${productQty}</span>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button onClick={() => deleteFromCart(item)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="cartControl d_flex">
                      <button
                        className="inCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                      <button
                        className="delCart"
                        onClick={() => decreaseQuantity(item)}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>
          <div className="cart-total product-cart">
            <h2>Cart Summary</h2>
            <div className="d_flex">
              <h4>Total Price :</h4>
              <h3>${totalPrice}</h3>
            </div>
            <button className="checkout" onClick={() => checkOut(cartItems)}>
              Checkout Now!
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;