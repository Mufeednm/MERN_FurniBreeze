import React, { useContext,useEffect } from "react";
import { useState } from "react";
import UseeContext from "../Globalcontext/UseConstext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axiox from "axios"
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



  const [count, setCount] = useState(0);

  const [cartitems, setCartitems] = useState([]);
const userid=localStorage.getItem("id")  
useEffect(()=>{
const fetchcart= async ()=>{

  const response =await axiox.get(`http://localhost:3000/api/users/cart/${userid}`)
  // console.log("its from back end",response.data);
  setCartitems(response.data)
}

fetchcart()
},[userid,])

console.log("podaaa",cartitems);


const removeCart = (id) => {
  
  setLogins((oldData) => ({
    ...oldData,
    cart: oldData.cart.filter((v) => v.id !== id),
  }));
};

const handleIncrement = async (id) => {
  const response =await axiox.post(`http://localhost:3000/api/users/${userid}/carts/${id}`)
  
    setCount((value.quantity += 1));
  };

  // const handleDecrement = (value) => {
  //   if (value.qty && value.qty > 1) {
  //     setCount((value.qty -= 1));
  //   }

  // };

  return (
    <div>
      <Navbar />
      <div className="p-1">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl">Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cartitems.map((value, index) => {
           
          
            return (
              <div key={value._id} className="bg-orange-300 p-5 gap-3 m-2">
                <div className="flex justify-between">
                  <img
                    style={{ height: 150, padding: 10 }}
                    src={value.productid.productImg}
                    alt=""
                    onClick={() => nav(`/${value.productid._id}`)}
                  />
                  <div className="flex-grow mx-4">
                    <h1 className="text-lg font-bold">{value.productid.title}</h1>
                    <h1 className="text-gray-600"> ₹{value.productid.price}</h1>
                  </div>
                  <div className="flex items-center">
                    {/* <button
                      onClick={() => handleDecrement(value)}
                      className="bg-gray-200 px-2 py-2 rounded-l"
                    >
                      {" "}
                      -
                    </button> */}
                    <span className="px-4">{value.qty}</span>
                    <button
                      onClick={() => handleIncrement(value.productid._id)}
                      className="bg-gray-200 px-2 py-2 rounded-l"
                    >
                      {" "}
                      +
                    </button>
                    
                  </div>
                  {/* <button
                    onClick={() => removeCart(value.id)}
                    className="ml-4 text-amber-200"
                  >
                    Remove
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="text-center font-bold text-2xl">
          <h1>
            Total ={" "}
            {logins.cart.reduce(
              (acc, value) => (acc += value.price * value.qty),
              0
            )}
          </h1>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
