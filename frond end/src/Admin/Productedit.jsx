import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';

const Productedit = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/products');
        setProducts(response.data); // Assuming response.data is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  
  const removeProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/Product/${id}`);
      setProducts(oldProducts => oldProducts.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="p-1 bg-slate-600">
      <Link to={"/AdminPage"}>
        <button className="text-white bg-slate-400 hover:bg-slate-500 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto">
          <IoMdArrowBack />
        </button>
      </Link>
      <h2 className="text-center">Products</h2>
      <div className="grid-cols-1">
        {products.map((value, index) => (
          <div key={index} className="bg-orange-300 p-5 gap-3 m-2">
            <div className="flex justify-between">
              <img
                style={{ height: 150, padding: 10 }}
                src={value.productImg}
                alt={value.title}
              />
              <div className="flex-grow mx-4">
                <h1 className="text-lg font-bold">{value.title}</h1>
                <h1 className="text-gray-600">₹{value.price}</h1>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => navigate(`/Adminproductedit/${value._id}`)}
                  className="ml-4 text-amber-200"
                >
                  Edit
                </button>
              </div>
              <button
                onClick={() => removeProduct(value._id)}
                className="ml-4 text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productedit;
