import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseeContext from '../Globalcontext/UseConstext';

const UserOrder = () => {
  const [user,setUser,logins,setLogins,cart,setCart,mydata,setMydata,render,setRender ,products,setProducts,cartitems, setCartitems,orderDetails, setOrderDetails] = useContext(UseeContext); // Change to null initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = localStorage.getItem('id');
  const nav = useNavigate()

  useEffect(() => {
    if (id) {
      // axios.get(`http://localhost:3000/api/users/userorders/${id}`)
      axios.get(`https://mern-furnibreeze.onrender.com/api/users/userorders/${id}`)
        .then(response => {
          setOrderDetails(response.data); // Assuming response.data contains an array of orders
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setError('No user ID found');
      setLoading(false);
    }
  }, [id]);

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const date = new Date(dateTimeString);
    return date.toLocaleDateString(undefined, options);
  };

  // Check for loading state
  if (loading) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  // Check for error state
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Check if orderDetails is null or undefined
  if (!orderDetails || orderDetails.length === 0) {
return  toast.success("nothing orderd  "),  nav("/Cart")
    // return <div className="text-center text-gray-500">No order details available.</div>;
  }

  return (
    <div>
      <Navbar/>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        {orderDetails.map(order => (
          <div key={order.orderId} className="border rounded-lg p-4 mb-4 shadow-lg">
            <div className="mb-2"><strong>Payment ID:</strong> {order.paymentId}</div>
            {/* <div className="mb-2"><strong>Order Time:</strong> {formate(order.orderTime)}</div> */}
            <div className="mb-2"><strong>Order ID:</strong> {order.orderId}</div>
            <div className="mb-2"><strong>Purchase Date:</strong> {formatDateTime(order.purchaseDate)}</div>
            <div className="mb-2"><strong>Status:</strong> {order.status}</div>
            <div className="mb-2"><strong>Total Price:</strong> ${order.totalPrice}</div>
            
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.products.map(product => (
                  <div key={product.productId} className="border rounded-lg p-4 shadow">
                    <div className="mb-2"><strong>Product:</strong> {product.title}</div>
                    <div className="mb-2"><strong>Price:</strong> ${product.price}</div>
                    <div className="mb-2"><strong>Quantity:</strong> {product.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default UserOrder;
