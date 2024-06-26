import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';

const OrderList = () => {
  const [orderlist, setOrderlist] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  console.log("ordersss",orderlist);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/adminAllorders');
        setOrderlist(response.data);
        calculateTotals(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const calculateTotals = (orders) => {
    let productsCount = 0;
    let totalAmount = 0;

    orders.forEach(order => {
      order.products.forEach(product => {
        productsCount += product.quantity;
        totalAmount += product.price * product.quantity;
      });
    });

    setTotalProducts(productsCount);
    setTotalRevenue(totalAmount);
  };

  return (
<div className="p-4 bg-slate-600 min-h-screen">
  <div className="mb-4">
    <Link to="/AdminPage">
      <button className="text-white bg-slate-400 hover:bg-slate-500 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5">
        <IoMdArrowBack className="inline mr-2" />
        Back to Admin Page
      </button>
    </Link>
  </div>
  <h2 className="text-center text-white text-2xl mb-6"> About Order & Revenue </h2>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr>
          <th className="py-3 px-6 bg-gray-200 text-left text-sm uppercase font-medium text-gray-600">Order ID</th>
          <th className="py-3 px-6 bg-gray-200 text-left text-sm uppercase font-medium text-gray-600">User Name</th>
          {/* <th className="py-3 px-6 bg-gray-200 text-left text-sm uppercase font-medium text-gray-600">Product ID</th> */}
          <th className="py-3 px-6 bg-gray-200 text-left text-sm uppercase font-medium text-gray-600">Product Name</th>
          <th className="py-3 px-6 bg-gray-200 text-left text-sm uppercase font-medium text-gray-600">Quantity</th>
          <th className="py-3 px-6 bg-gray-200 text-left text-sm uppercase font-medium text-gray-600">Total Price</th>
          <th className="py-3 px-6 bg-gray-200 text-left text-sm uppercase font-medium text-gray-600">Status</th>
        </tr>
      </thead>
      <tbody>
        {orderlist.map((order) => (
          <React.Fragment key={order._id}>
            {order.products.map((product, index) => (
              <tr key={`${order._id}-${product.productId}`} className="border-b">
                {index === 0 && (
                  <>
                    <td className="py-4 px-6 text-sm text-gray-700" rowSpan={order.products.length}>
                      {order._id}
                    </td>
                    <td className="py-4 px-6 text-sm uppercase font-medium text-gray-700" rowSpan={order.products.length}>
                      {order.userId.username}
                    </td>
                  </>
                )}
                {/* <td className="py-4 px-6 text-sm text-gray-700">{product.productId}</td> */}
                <td className="py-4 px-6 text-sm text-gray-700">{product.title}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{product.quantity}</td>
                <td className="py-4 px-6 text-sm text-gray-700">₹{product.price}</td>
                {index === 0 && (
                  <td className="py-4 px-6 text-sm text-gray-700" rowSpan={order.products.length}>
                    {order.status}
                  </td>
                )}
              </tr>
            ))}
          </React.Fragment>
        ))}
        {/* Total Row */}
        <tr className="border-b">
          <td colSpan="4" className="py-3 px-6 font-medium text-right">Total:</td>
          <td className="py-3 px-6 font-medium">{totalProducts}</td>
          <td className="py-3 px-6 font-medium">₹{totalRevenue}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

  );
};

export default OrderList;
