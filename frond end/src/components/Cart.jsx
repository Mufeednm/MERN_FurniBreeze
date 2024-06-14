import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UseeContext from "../Globalcontext/UseConstext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = () => {
  const {
    user,
    setUser,
    logins,
    setLogins,
    cart,
    setCart,
    mydata,
    setMydata,
    render,
    setRender,
  } = useContext(UseeContext);

  const [cartitems, setCartitems] = useState([]);
  const userid = localStorage.getItem("id");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/cart/${userid}`);
        setCartitems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCart();
  }, [userid, cartitems]);

  const removeCart = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/users/${userid}/carts/remove/${id}`);
      setCartitems(cartitems.filter((item) => item.productid._id !== id));
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const handleIncrement = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/users/${userid}/carts/${id}`);
      setCartitems(cartitems.map(item => 
        item.productid._id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } catch (error) {
      console.error("Error incrementing cart item:", error);
    }
  };

  const handleDecrement = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/users/${userid}/carts/decrement/${id}`);
      setCartitems(cartitems.map(item => 
        item.productid._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } catch (error) {
      console.error("Error decrementing cart item:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-1">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl">Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cartitems.length > 0 ? (
            cartitems.map((value) => (
              <div key={value._id} className="bg-orange-300 p-5 gap-3 m-2">
                <div className="flex justify-between">
                  <img
                    style={{ height: 150, padding: 10 }}
                    src={value.productid.productImg}
                    alt=""
                  />
                  <div className="flex-grow mx-4">
                    <h1 className="text-lg font-bold">{value.productid.title}</h1>
                    <h1 className="text-gray-600"> ₹{value.productid.price}</h1>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDecrement(value.productid._id)}
                      className="bg-gray-200 px-2 py-2 rounded-l"
                    >
                      {" "}
                      -
                    </button>
                    <span className="px-4">{value.quantity}</span>
                    <button
                      onClick={() => handleIncrement(value.productid._id)}
                      className="bg-gray-200 px-2 py-2 rounded-l"
                    >
                      {" "}
                      +
                    </button>
                    <button
                      onClick={() => removeCart(value.productid._id)}
                      className="ml-4 text-amber-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty. Please add items to the cart.</p>
          )}
        </div>
        {cartitems.length > 0 && (
          <div className="text-center font-bold text-2xl">
            <h1>
              Total: ₹
              {cartitems.reduce(
                (acc, value) => acc + value.productid.price * value.quantity,
                0
              )}
            </h1>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
