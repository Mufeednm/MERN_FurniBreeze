import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import {  toast } from 'react-toastify';
import axios from 'axios';

const Userslist = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/admin/Users`);
        setUsers(response.data);
      } catch (error) {
  
        console.error('Error fetching users:', error);
      } 
    };
    fetchUsers();
    
  }, []);
  
  const blockuser= async(userid)=>{
    try {
      const response = await axios.post(`http://localhost:3000/api/admin//Userblock/${userid}`)
      if (response) {
        toast("user bloccked")
      }
    } catch (error) {
      
    }
  }
  const unblockuser= async(userid)=>{
    try {
      const response = await axios.post(`http://localhost:3000/api/admin//Userunblock/${userid}`)
      if (response) {
        toast("user unbloccked")
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="p-4">
    <div className="mb-4">
      <Link to="/AdminPage">
        <button
          className="text-white bg-slate-400 hover:bg-slate-600 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto flex items-center"
        >
          <IoMdArrowBack className="mr-2" /> Back
        </button>
      </Link>
    </div>
    <h2 className="text-center text-2xl mb-4">Users</h2>
    <div className="grid grid-cols-1 gap-4">
      {users.map((user) => (
        <div key={user._id} className="bg-orange-300 p-5 rounded-lg shadow-md flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">NAME: {user.username}</h1>
            <h1 className="text-gray-600">EMAIL: {user.email}</h1>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => { blockuser(user._id) }}
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Block
            </button>
            <button
              onClick={() => { unblockuser(user._id) }}
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Unblock
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  
  );
};

export default Userslist;
