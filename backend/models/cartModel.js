
import mongoose from "mongoose";
const  cartSchema=mongoose.Schema({

userid:{
    type:mongoose.Schema.ObjectId,
    required:true,
    ref:"User"
},
productid:{
    type:mongoose.Schema.ObjectId,
    required:true,
    ref:"Product"
},
quantity:{
    type:Number,
    default:1
}

})
const Cart= mongoose.model("Cart",cartSchema)
export default Cart