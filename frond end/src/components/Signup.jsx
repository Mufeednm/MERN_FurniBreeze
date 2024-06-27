import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { toast } from 'react-toastify';
const Signup = () => {
  const nav = useNavigate();
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/register", { email, username, password });
      if (response.status === 201) {
        nav('/signin');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        (error.response.data.message); // Display the error message from the server
        setError(error.response.data.message); // Display the error message from the server
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-sm mx-auto mt-10">
        <div className="w-full backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
          <h2 className="text-2xl font-bold pb-5">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Your name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                placeholder="*********"
                required
              />
            </div>
            {error && (
              <div className="mb-4">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <button
                type="submit"
                className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 mb-2 sm:mb-0 sm:w-auto"
              >
                Register
              </button>
              <div className="flex items-center text-sm">
                <p className="mb-2 sm:mb-0">Already have an account?</p>
                <Link to="/signin">
                  <button className="underline cursor-pointer ml-1">
                    Sign in
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
