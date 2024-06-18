import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
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
            <div key={user._id} className="bg-orange-300 p-5 rounded-lg shadow-md">
              <div className="flex flex-col">
                <h1 className="text-lg font-bold">NAME: {user.username}</h1>
                <h1 className="text-gray-600">EMAIL: {user.email}</h1>
              </div>
            </div>
          ))}
        </div>
      
    </div>
  );
};

export default Userslist;
