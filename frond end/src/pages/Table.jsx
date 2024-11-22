import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UseeContext from '../Globalcontext/UseConstext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Table = () => {
  const [,,,,,,,,,,products ] = useContext(UseeContext);
  const nav = useNavigate();

  return (
    <div className="bg-gray-100">
      <Navbar />
      
      {/* Banner Section */}
      <div className="relative w-full">
        <img
          className="w-full h-96 object-cover"
          src="https://gambrick.com/wp-content/uploads/2022/02/how-much-space-do-you-need-around-a-dining-table.jpg"
          alt="Table Banner"
        />
     
      </div>

      {/* Table Products Grid Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Our Table Collection</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products
            .filter((value) => value.type === "table")
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
                  {/* Optional: Add product price */}
                  <p className="text-xl text-gray-600">₹{e.price}</p>
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-blue-600 transition-all"
                    onClick={() => nav(`/${e._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Table;
