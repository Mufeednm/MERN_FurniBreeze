import User from "../models/userModel.js"
import dotenv from "dotenv"
dotenv.config()
import Razorpay from "razorpay"
import Order from "../models/ordersModel.js";
import crypto from 'crypto';
// import { log } from "console";

const razorpay = new Razorpay({
                key_id: process.env.Razorpay_key_id,
                key_secret: process.env.Razorpay_key_secret,
            });
export const payment=async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate({
                    path: "cart",
                    populate:{path:"productid"}
                });
// console.log(user.cart);
        if (!user || user.cart.length === 0) {
            return res.status(400).send('Cart is empty or user not found');
        }
        const amount = user.cart.reduce((total, item) => {
            return total += item.productid.price * item.quantity; 
        }, 0);
        const productNames = user.cart.map(item => item.productid.title).join(', ');
        // console.log(productNames);
            // Assuming each cart item has a quantity and productid has a price
console.log(amount);
        const options = {
            amount: amount*100, // amount in the smallest currency unit
            currency: 'INR',
            receipt: `receipt_order_${Math.random().toString(36).substring(2, 15)}`,
            notes:{
                product : productNames,
                userid : id
            }
            
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
        
        console.log(order);
    } catch (error) {
        console.log(error);
    } }




export const verifypayment = async(req,res)=>{
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).send('Payment verification failed');
        }

        const order = await razorpay.orders.fetch(razorpay_order_id);
        
        const user = await User.findById(order.notes.userid).populate({path:"cart",populate:{path:"productid"}})
        // console.log(user.product);
        
// console.log(order);
        const newOrder = new Order({
            userId: user.id,
            products: user.cart.map(item => ({
                productId: item.productid._id,
                quantity: item.quantity,
                price: item.productid.price
            })),
            amount: order.amount,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            totalPrice: order.amount / 100,
            status: 'paid'
        });

        await newOrder.save();

        user.orders.push(newOrder)
        await user.save();

        res.send('Payment verified successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};    






//  export const payment = async (req,res)=>{
//         const id =req.params.id

//     const user = await User.findById(id).populate({
//         path: "cart",
//         populate:{path:"productid"}
//     })
//     // console.log("payment", paymentData);

//  const paymentCart = user.cart
// if (paymentCart.length==0) {
//     res.status(404).json({message:"cart is empty"})
// }

//     const razorpay = new Razorpay({
//         key_id: process.env.Razorpay_key_id,
//         key_secret: process.env.Razorpay_key_secret,
//     });
//     const options = req.body;
//     const order = await razorpay.orders.create(options);
//     if (!order) {
        
//     }
    
//     }
































//     const id =req.params.id

//     const user = await User.findById(id).populate({
//         path: "cart",
//         populate:{path:"productid"}
//     })
//     // console.log("payment", paymentData);

//  const paymentCart = user.cart
// if (paymentCart.length==0) {
//     res.status(404).json({message:"cart is empty"})
// }
// let totalAmount =0;
// let totalQuantity=0;

// const paymentOrder =paymentCart.map((item)=>{
//     totalAmount+=item.productid.price * item.quantity
//     totalQuantity+=item.quantity
//     return{  price_data: {
//         currency: "inr",
//         product_data: item.productid.title,
//             // name: item.productid.title,
//             // description: item.productid.description
        
//         unit_amount: Math.round(item.productid.price * 100),
//         total_amoun:totalAmount
//     },
//     quantity: item.quantity
    
// }})
// console.log(paymentOrder);



