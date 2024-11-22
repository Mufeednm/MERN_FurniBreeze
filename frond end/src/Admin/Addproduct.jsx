import React, { useContext, useState } from 'react';
import UseeContext from '../Globalcontext/UseConstext';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Addproduct = () => {
  const { products, setProducts } = useContext(UseeContext);
  const navigate = useNavigate(); // Moved this outside the handlesubmit function
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    price: '',
    crossprice: '',
    image: null // Assuming you want to store the image file
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const newProductData = new FormData();
      newProductData.append('title', formData.title);
      newProductData.append('description', formData.description);
      newProductData.append('type', formData.type);
      newProductData.append('price', formData.price);
      newProductData.append('crossprice', formData.crossprice);
      newProductData.append('image', formData.image);
      
      // const response = await axios.post(`http://localhost:3000/api/admin/addproducts`, newProductData);
      const response = await axios.post(`https://mern-furnibreeze.onrender.com/api/admin/addproducts`, newProductData);
      if (response.status === 201) {
        navigate("/Productedit");

        const newProduct = {
          id: response.data.id, // Assuming the response contains the new product's ID
          title: response.title,
          description: response.description,
          type: response.type,
          price: parseFloat(response.price),
          crossprice: parseFloat(response.crossprice),
          image: URL.createObjectURL(response.image)
        };
        
        setProducts([...products, newProduct]);
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className='h-screen bg-zinc-700 flex items-center justify-center'>
      <div className="max-w-sm mx-auto">
        <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
          <h2 className="text-2xl font-bold pb-5">ADD PRODUCT</h2>
          <form onSubmit={handlesubmit}>
            <div className="mb-5">
              <label htmlFor="title" className="block mb-2 text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                name='title'
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                placeholder="Title"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="description" className="block mb-2 text-sm font-medium">
                Description
              </label>
              <input
                type="text"
                name='description'
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                placeholder="Description"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="type" className="block mb-2 text-sm font-medium">
                Type
              </label>
              <input
                type="text"
                name='type'
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                placeholder="Type"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block mb-2 text-sm font-medium">
                Price
              </label>
              <input
                type="number"
                name='price'
                id="price"
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                placeholder="Price"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="crossprice" className="block mb-2 text-sm font-medium">
                Cross Price
              </label>
              <input
                type="number"
                name='crossprice'
                id="crossprice"
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                placeholder="Cross Price"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block mb-2 text-sm font-medium">
                Image
              </label>
              <input
                type="file"
                name='image'
                onChange={handleChange}
                id="image"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                required
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
                ADD
              </button>
              <Link to="/AdminPage">
                <button          
                  className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"> 
                  <IoMdArrowBack /> 
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addproduct;
