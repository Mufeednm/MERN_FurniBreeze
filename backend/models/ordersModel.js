import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    orderTime: {
        type: String,
        required: true,
        default: () => new Date().toTimeString()
    },
    orderId: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
