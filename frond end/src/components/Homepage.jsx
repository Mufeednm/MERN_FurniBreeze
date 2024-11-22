import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UseeContext from "../Globalcontext/UseConstext";
import Footer from "./Footer";

const Homepage = () => {
  const [,,,,,,,,,, products] = useContext(UseeContext);
  const nav = useNavigate();

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* New Arrivals Section */}
      <div className="text-center my-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">New Arrivals</h1>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {/* Card Type */}
          {[
            { to: "/Beds", title: "BEDS", img: "https://homesofrajasthan.com/wp-content/uploads/2023/05/bd19p-860x860.jpeg" },
            { to: "/Sofas", title: "Premium Leather Sofa", img: "https://homesofrajasthan.com/wp-content/uploads/2022/11/sauvage-chesterfield-leather-sofa-3-910x1155-1.jpg" },
            { to: "/Table", title: "First Class Dining Table", img: "https://homesofrajasthan.com/wp-content/uploads/2023/04/1-17.jpg" }
          ].map((item, idx) => (
            <Link to={item.to} key={idx} className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-white shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transition-transform transform hover:scale-105">
                <img
                  className="w-full h-64 object-cover rounded-t-2xl"
                  src={item.img}
                  alt={item.title}
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Items Section */}
      <div className="px-6 py-12 bg-gray-100">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-12">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => nav(`/${product._id}`)}
            >
              <img
                className="w-full h-56 object-cover rounded-t-2xl"
                src={product.productImg}
                alt={product.title}
              />
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-xl font-bold text-orange-600">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
