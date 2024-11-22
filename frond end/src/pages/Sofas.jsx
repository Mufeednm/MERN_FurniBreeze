import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UseeContext from '../Globalcontext/UseConstext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Sofas = () => {
  const [user, setUser, logins, setLogins, cart, setCart, mydata, setMydata, render, setRender, products, setProducts, cartitems, setCartitems, orderDetails, setOrderDetails, adminuser, setAdminuser, login, logout] = useContext(UseeContext);
  const nav = useNavigate();

  return (
    <div className="bg-gray-100">
      <Navbar />
      
      {/* Banner Section */}
      <div className="relative w-full">
        <img
          className="w-full h-96 object-cover"
          src="https://mysleepyhead.com/media/wysiwyg/uploads/HomePage/Sept30DesktopbannerSofa.jpg"
          alt="Sofas Banner"
        />
      
      </div>

      {/* Products Grid Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Our Sofas Collection</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products
            .filter((value) => value.type === "sofa")
            .map((e, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                  className="w-full h-80 object-cover cursor-pointer"
                  src={e.productImg}
                  alt={e.title}
                  onClick={() => nav(`/${e._id}`)}
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-900">{e.title}</h3>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sofas;
