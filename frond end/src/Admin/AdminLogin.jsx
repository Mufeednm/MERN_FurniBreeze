import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, { Axios } from 'axios';
import {  toast } from 'react-toastify';
const AdminLogin = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const admin = {
  //   name :"mufeed",
  //   password : "admin"
  // }
  const handleadmin =async (e)=>{
    e.preventDefault()
try {
  // const response= await axios.post(`http://localhost:3000/api/admin/login`,{username,password})
  const response= await axios.post(`https://mern-furnibreeze.onrender.com/api/admin/login`,{username,password})
  console.log(response);
  if(response.status ==200){
    const adminTokens = response.data.token
    localStorage.setItem("adminToken",adminTokens)
    console.log("admintoken",adminTokens);

 toast("admin logged successfully")
 navigate("/AdminPage")
  }else{
    alert("login failed unautharised")
  }
} catch (error) {
  alert(error.response.data.message)
  console.log(error);
}

//     if (e.target.name.value==admin.name&& e.target.password.value==admin.password)   {
// navigate("/Adminpage")
//     } else { alert ("you are not admin")}
  }

  return (
    <div className="h-screen bg-zinc-700  flex items-center justify-center r">
    <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold pb-5">ADMIN</h2>
      <form  onSubmit={handleadmin}>
 
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium"> ADMIN </label>
   <input type="text"    id="name" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="Admin"
            onChange={(e)=>{setUsername(e.target.value)}}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Your password</label>
          <input
            type="password"
            id="password"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
         onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        <div>
          <p className="text-red-500 pb-5"></p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
          >
            LOG IN
          </button>
        
        </div>
      </form>
    </div>
  </div>
  )
}

export default AdminLogin