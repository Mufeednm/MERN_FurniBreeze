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
  const { id } = useParams();
  const [datas,setDatas]=useState([])
  // console.log(id);
  
  useEffect(() => {



    const getid= async ()=>{
const response = await axios.get(`http://localhost:3000/api/users/products/${id}`)
setDatas(response.data.productbyId);
} 
getid()
}, [id]);
console.log("res",datas);


// const [,,,,,,,,,,products ] = useContext(UseeContext);
  // console.log("display",products);

// console.log("poda",mydata);
// console.log("hello ",datas);

  // const addToCart = () => {
  //   const alreadyInCart = logins.cart.some((item) => item.id === mydata.id);

  //   if (!alreadyInCart) {
  //     logins.cart.push({ ...mydata, qty: 1 });
  //   }

  //   setRender(!render);
  //   console.log(logins.cart);
  // };

  return (
    <div>
      <Navbar />
      <div className="m-10 flex flex-col md:flex-row bg-slate-400 p-14">
        <img className="h-auto max-w-full md:max-w-xl" src={datas.productImg} alt={"m"} />
        <div className="flex flex-col ml-0 md:ml-20 mt-6 md:mt-0">
          <h1 className="text-3xl font-medium ">{datas.title}</h1>
          <p className="mt-3 text-gray-600 font-semibold md:w-96 text-2xl">{datas.description}</p>
          <h1 className="text-2xl font-semibold p-3 text-gray-600">
            {' '}
            <span className="text-red-500"> ₹{datas.price} </span>{' '}
            <span className="line-through ml-5">₹{datas.crossprice} </span>{' '}
          </h1>
          <div></div>
          <button
            onClick={logins ? addToCart : () => navigate("/Signin")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
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
