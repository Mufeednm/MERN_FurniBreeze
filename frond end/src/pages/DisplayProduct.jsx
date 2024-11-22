import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import UseeContext from '../Globalcontext/UseConstext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const DisplayProduct = () => {
  const navigate = useNavigate();
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
    products,
  } = useContext(UseeContext);
  const loginsDta = localStorage.getItem('name');
  const { id } = useParams();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getid = async () => {
      const response = await axios.get(`http://localhost:3000/api/users/products/${id}`);
      setDatas(response.data.productbyId);
    };
    getid();
  }, [id]);

  const userid = localStorage.getItem('id');

  const addToCart = async (id) => {
    // const response = await axios.post(`http://localhost:3000/api/users/${userid}/cart/${id}`);
    const response = await axios.post(`https://mern-furnibreeze.onrender.com/api/users/${userid}/cart/${id}`);
    navigate('/Cart');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="m-10 flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-10">
        {/* Product Image */}
        <div className="relative group">
          <img
            className="h-auto max-w-full md:max-w-xl rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
            src={datas.productImg}
            alt={datas.title}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 group-hover:bg-opacity-0 transition-all duration-300"></div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col ml-0 md:ml-10 mt-6 md:mt-0">
          <h1 className="text-4xl font-bold text-gray-800">{datas.title}</h1>
          <p className="mt-4 text-gray-600 text-lg md:w-96">{datas.description}</p>
          <div className="flex items-center mt-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              <span className="text-red-500">₹{datas.price}</span>
            </h1>
            {datas.crossprice && (
              <span className="text-gray-500 text-xl line-through ml-5">₹{datas.crossprice}</span>
            )}
          </div>
          {datas.crossprice && (
            <span className="text-green-500 text-sm mt-2">Limited Offer!</span>
          )}
          <button
            onClick={loginsDta ? () => addToCart(datas._id) : () => navigate('/Signin')}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DisplayProduct;
