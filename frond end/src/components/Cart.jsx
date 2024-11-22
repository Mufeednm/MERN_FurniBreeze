import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UseeContext from "../Globalcontext/UseConstext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = () => {
  const [
    user, setUser, logins, setLogins, cart, setCart, mydata, setMydata, render, setRender, products, setProducts, cartitems, setCartitems
  ] = useContext(UseeContext);

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
    } catch (error) {
      console.error("Error incrementing cart item:", error);
    }
  };

  const handleDecrement = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/users/${userid}/carts/decrement/${id}`);
    } catch (error) {
      console.error("Error decrementing cart item:", error);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Step 1: Create order in backend
    const orderResult = await axios.post(`http://localhost:3000/api/users/payment/${userid}`, {
      amount: cartitems.reduce((acc, item) => acc + item.productid.price * item.quantity, 0), // Amount in INR
    });

    const { amount, id: order_id, currency } = orderResult.data;

    const options = {
      key: "rzp_test_3YFqc3qjVhg3aK",
      amount: amount.toString(),
      currency: currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id,
      handler: async function (response) {
        // Step 2: Verify payment
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        const verificationResult = await axios.post("http://localhost:3000/api/users/verifypayment", paymentData);

        // Step 3: Save order
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">Your Cart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartitems.length > 0 ? (
            cartitems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-lg p-5 flex flex-col justify-between">
                <div className="flex justify-between mb-4">
                  <img
                    className="w-full h-48 object-cover rounded-lg"
                    src={item.productid.productImg}
                    alt={item.productid.title}
                  />
                </div>
                <div className="flex-grow">
                  <h1 className="text-lg font-bold mb-2">{item.productid.title}</h1>
                  <p className="text-gray-600">₹{item.productid.price}</p>
                  <p className="text-black mt-2">Total: ₹{item.productid.price * item.quantity}</p>
                </div>
                <div className="flex items-center mt-4 space-x-3">
                  <button
                    onClick={() => handleDecrement(item.productid._id)}
                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-xl">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.productid._id)}
                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeCart(item.productid._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Your cart is empty. Please add items to the cart.</p>
          )}
        </div>
        {cartitems.length > 0 && (
          <div className="text-center mt-8 font-bold text-2xl">
            <h1>
              Total: ₹
              {cartitems.reduce(
                (acc, value) => acc + value.productid.price * value.quantity,
                0
              )}
            </h1>
            <button
              onClick={handlePayment}
              className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg mt-4 hover:bg-blue-600"
            >
              Pay with Razorpay
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
