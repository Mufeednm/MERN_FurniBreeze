import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UseeContext from '../Globalcontext/UseConstext'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from "axios"
import {  toast } from 'react-toastify';
const Signin = () => {
  const nav = useNavigate()
  
  const { user, setLogins } = useContext(UseeContext)
  const [email,setEmail] = useState("")
  const [password, setPasswords] = useState("")
  const [error, setError] = useState('');

  const handlesubmit =  async (e) => {
    
    e.preventDefault() 
    try {
      
      const response= await axios.post("http://localhost:3000/api/users/Login",{email,password})
      if (response.status ===200) {
        // console.log(response.data);
        const token = response.data.token
        const id =response.data.rest._id
        const cart=response.data.rest.cart.length
        
        const name=response.data.rest.username
        
        
        
        localStorage.setItem("token", token)
        localStorage.setItem("id", id)
        localStorage.setItem("name", name)
        localStorage.setItem("cartlength", cart)
        // console.log("data is",response.data.rest.cart.length);
        
        nav('/')
        
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast(error.response.data.message); // Display the error message from the server
        setError(error.response.data.message); // Display the error message from the server
   
    }
  }
    


    // let userData = user.find((item) => item.email === gmail)
    // if (userData && userData.password === passwords) {
    //   setLogins(userData)
    //   nav('/');
    // } else {
    //   setLogins(null)
    //   alert("Invalid credentials. Please try again.")
    // }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-sm mx-auto mt-10">
        <div className="w-full backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
          <h2 className="text-2xl font-bold pb-5">Sign In</h2>
          <form onSubmit={handlesubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your email
              </label>
              <input
                type="email"
                onChange={(e) =>setEmail(e.target.value)}
                id="email"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                placeholder="andrew@mail.com"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                Your password
              </label>
              <input
                type="password"
                onChange={(e) => setPasswords(e.target.value)}
                id="password"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                placeholder="*********"
                required
              />
            </div>
            <div>
              <p className="text-red-500 pb-5"></p>
            </div>
            {error && (
             
             <p className="text-red-500">{error}</p>
       
         )}
            <div className="flex items-center justify-between mb-4">
          
              <button
                type="submit"
                className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
              >
                Sign In
              </button>
              <div className="flex items-center text-sm">
                <p>Don't have an account?</p>
                <Link to="/signup">
                  <button className="underline cursor-pointer ml-1">Sign Up</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Signin
