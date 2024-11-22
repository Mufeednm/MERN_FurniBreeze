import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiAdminFill } from 'react-icons/ri';
import { FaUser, FaSearch,  } from 'react-icons/fa';
import { BsCartCheckFill } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import UseeContext from '../Globalcontext/UseConstext';

const Navbar = () => {
  const [
    user, setUser,
    logins, setLogins,
    cart, setCart,
    mydata, setMydata,
    render, setRender,
    products, setProducts,
    cartitems, setCartitems,
    orderDetails, setOrderDetails
  ] = useContext(UseeContext);

  const loginsdta = localStorage.getItem('name');
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    navigate(`/Search/${searchData}`);
    setSearchData('');
  };

  return (
    <div className="Navbar bg-gray-50 shadow-lg">
      <div className="navbar flex flex-col lg:flex-row justify-between items-center px-6 py-4 border-b-2 border-gray-200">
        {/* Logo */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to="/">
            <h2 className="text-3xl font-bold text-amber-600 hover:text-amber-500 transition-colors duration-300">FurniBreeze</h2>
          </Link>
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden text-2xl text-gray-700"
          >
            {isMobileMenuOpen ? 'X' : '☰'}
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchClick} className="flex items-center justify-center w-full lg:max-w-lg mx-auto bg-gray-100 rounded-full px-4 py-2 shadow-md mt-4 lg:mt-0">
          <input
            type="text"
            placeholder="Search Furniture"
            onChange={(e) => setSearchData(e.target.value)}
            value={searchData}
            className="border-none p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-300 w-full"
          />
          <button
            type="submit"
            className="bg-amber-600 text-white p-2 rounded-full ml-2 hover:bg-amber-700 transition-colors duration-300"
          >
            <FaSearch />
          </button>
        </form>

        {/* User Options (Visible on large screens) */}
        <div className="hidden lg:flex items-center gap-8 text-gray-700 mt-4 lg:mt-0">
          <p className="text-sm lg:text-base font-semibold">{loginsdta ? loginsdta : 'Guest'}</p>

          <button onClick={handleLogout} className="text-lg hover:text-red-500 transition-colors duration-300">
            <CiLogout />
          </button>

          <Link to="/signup">
            <FaUser className="text-2xl hover:text-teal-600 transition-colors duration-300" />
          </Link>

          <button
            onClick={() => navigate('/AdminLogin')}
            className="text-2xl hover:text-green-600 transition-colors duration-300"
          >
            <RiAdminFill />
          </button>

          <button
  onClick={() => {
    loginsdta ? navigate('/cart') : navigate('/Signin');
  }}
  className="relative flex items-center gap-1 text-2xl hover:text-orange-600 transition-colors duration-300"
>
  <AiOutlineShoppingCart />
  {cartitems.length > 0 && (
    <span className="absolute top-0 right-0 text-xs font-bold bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
      {cartitems.length}
    </span>
  )}
</button>

          <button
            onClick={() => navigate('/Userorder')}
            className="text-2xl hover:text-teal-500 transition-colors duration-300"
          >
            <BsCartCheckFill />
          </button>
        </div>
      </div>

      {/* Categories (Dropdown on Mobile) */}
      <div className={`category bg-amber-600 ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="flex flex-col lg:flex-row justify-around py-2 lg:py-4 px-4 lg:px-5">
          {['Sofas', 'Beds', 'Table', 'Chairs', 'Wardrobes'].map((category, index) => (
            <Link to={`/${category}`} key={category}>
              <button className="text-lg font-semibold text-white hover:bg-amber-500 hover:text-white px-4 py-2 rounded-md transition-colors duration-300">
          
                {category}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
