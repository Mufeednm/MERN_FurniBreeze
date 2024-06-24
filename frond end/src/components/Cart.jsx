import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UseeContext from "../Globalcontext/UseConstext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = () => {
  const [
    user,setUser,logins,setLogins,cart,setCart,mydata,setMydata,render,setRender ,products,setProducts,cartitems, setCartitems
  ]
   = useContext(UseeContext);




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
  }, [userid,cartitems]);

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
        console.log(paymentData);
  
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
                    <h1 className="text-black"> Total Price  ₹{value.productid.price * value.quantity}</h1>
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
            <button
              onClick={handlePayment}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-600"
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
