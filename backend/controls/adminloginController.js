import  JsonWebToken from 'jsonwebtoken';
import dotenv from "dotenv"
import User from '../models/userModel.js';
import Order from '../models/ordersModel.js';

// import items from 'razorpay/dist/types/items.js';
dotenv.config()
const jwt =JsonWebToken

// admin Login
 export const adminlogin =async (req,res)=>{
    const username =req.body.username
    const password=req.body.password
   
    if (username == process.env.Admin_username && password == process.env.Admin_password) {
       
        // token
        const token = jwt.sign({username},process.env.ADMIN_JWT_SECRET)
        res.cookie('access_token' , token , {httpOnly:true }).status(200)
        .json({message:"admin logined",token})
        // cokkie
    }else{
        res.status(400).json({message:"You are not the admin "})
    }
   

  
}

// Show all users
export  const allusers =async (req,res)=>{
 
        const allusers = await User.find()
        if (allusers.length==0) {
            res.status(404).json({message:"no users"})
        }else {
            res.status(200).json(allusers)
        }
    
    }
// block users
export  const blockuser =async (req,res)=>{
 
    const {userid}=req.params
    const blockuser =await User.findByIdAndUpdate({_id:userid}, {$set:{isDeleted:true}})
 if (!blockuser) {
    res.status(400).json({message:"user not found"})
 }
  res.status(200).json({message:"user is blocked"})

}
// unBlock user
export  const unblockuser =async (req,res)=>{
 
    const {userid}=req.params
    const unblockuser =await User.findByIdAndUpdate({_id:userid}, {$set:{isDeleted:false}})
 if (!unblockuser) {
    res.status(400).json({message:"user not found"})
 }
  res.status(200).json({message:"user is unblocked"})

}


    // show all orders
    export  const allorders =async (req,res)=>{
        try {
            const allorders = await Order.find().populate({ path: "userId" });
            // console.log("orderssssss", allorders);
            if (allorders.length === 0) {
                res.status(404).json({ message: "no users" });
            } else {
                res.status(200).json(allorders);
            }
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    };


// Show user as per id

export const finduser=async(req,res)=>{
 const {id}=req.params
 const finduser=await User.findById(id)
 if (finduser.length==0) {
    res.status(404).json({message:"user not found"})
 }
 res.status(200).json(finduser)
    
}

// Total products purchased.
export const totalpurchased=async(req,res)=>{
   
    // const findtotalpurchase=await Order.find().populate({path:"products"})
    const findtotalpurchase=await Order.find().populate('products.productId')
   
    
    const totalproducts = findtotalpurchase.reduce((acc, order) => acc + order.products, 0);

    const totalRevenue = findtotalpurchase.reduce((acc, order) => acc + order.totalPrice, 0);

    const allProducts = findtotalpurchase.flatMap(order => order.products)
    const productTitless = allProducts.map(product => product.productId.title)
    
    console.log("total products ",totalproducts);
    console.log("total revenue ",totalRevenue);
    console.log("total products name purchased ",productTitless);

    if (findtotalpurchase.length==0) {
       res.status(404).json({message:"user not found"})
    }
    res.status(200).json({totalpurchased: totalproducts,
        productsname:productTitless,
    totalRevenue: totalRevenue
    
});
       
   }