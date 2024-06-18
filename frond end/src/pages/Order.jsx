import React from 'react';

const OrderList = ({ orders }) => {
  return (
    
    <div className="container mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4 text-center">User Orders</h1>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="mb-2">
              <span className="font-semibold">Payment Date:</span> {new Date(order.paymentDate).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Amount:</span> ${order.amount.toFixed(2)}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Product:</span> {order.product}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
