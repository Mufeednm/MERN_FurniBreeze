import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AdminProductEdit = () => {
  const [result, setResult] = useState({});
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const productFind = async () => {
      try {
        // const response = await axios.get(`http://localhost:3000/api/users/products/${id}`);
        const response = await axios.get(`https://mern-furnibreeze.onrender.com/api/users/products/${id}`);
        if (response.status === 200) {
          const product = response.data.productbyId;
          setResult(product);
          setTitle(product.title);
          setPrice(product.price?.toString() || '');
          setType(product.type);
          setDescription(product.description);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    productFind();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        title,
        price: parseFloat(price),
        type,
        description
      };

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.put(`http://localhost:3000/api/admin/Product/${id}`, updatedProduct, config);

      if (response.status === 200) {
        console.log("Product successfully updated");
        navigate('/Productedit'); // Make sure this route is correct
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h2>
        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductEdit;
