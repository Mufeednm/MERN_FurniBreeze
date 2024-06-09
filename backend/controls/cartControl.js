
import Cart from "../models/cartModel.js"
import Product from "../models/products.js"
import User from "../models/userModel.js"


export const addtocart=async (req,res)=>{
 const {id} = req.params
 const {productid} = req.params
 
const user= await User.findById(id)

if (!user) {
return res.status(404).json({message :" user is not found "})    
}
const product= await Product.findById(productid)
if (!product) {
    return res.status(404).json({message :" product is not found "})    
    }
    // console.log(product);

    // add to Cart 
    let cartitem = await Cart.findOne({userid:user._id,productid:product._id}) 
    if (cartitem) {
      console.log( "cartitem",cartitem);
    return res.status(200).json({message:"already in cart"})
    
  } else{
    cartitem=await Cart.create({
        userid:user._id,
        productid:product._id
    })
  }
  user.cart.push(cartitem._id)
await user.save()
return res.status(202).json({message:"user cart is ready"})
}

// viec Cart Products
export const viewCart = async(req,res)=>{
    try {
        const {id}=req.params
        const user = await User.findById(id)
        .populate({
            path : 'cart',
            populate : { path : 'productid'}
        });

        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        if(!user.cart || user.cart.length === 0){
            return res.status(200).json({message:"user cart is empty" , data:[]})
        }
        res.status(200).json(user.cart)
    } catch (error) {

        return res.status(404).json({message:"internal server error"})
        
    }
}

// add quantity of cart
 export const addQuantity = async (req,res)=>{
try {
    const id=req.params.id
    const productid=req.params.productid
    const quantityNum=req.body.quantityNum
   
    const user = await User.findById(id)
    if (!user) {
        res.status(404).json({message:"user not found"})
    }
    const product =await Product.findById(productid)
    if (!product) {
        res.status(404).json({message:"product is not found"})
    }
    const cartitem= await Cart.findOne({userid:user._id , productid:product._id} )
    // console.log("cart",cartitem);
    if (typeof quantityNum !== "number") {
        res.status(404).json({message:"quantity should be number"})
    }else{
        cartitem.quantity +=quantityNum;
        await cartitem.save()
    }
    res.status(200).json({message:"quantity is increased "})
} catch (error) {
    
    res.status(500).json({message:"internal server error"})
}
}

export const decreaseQuantity = async (req,res)=>{
    try {
        const id=req.params.id
        const productid=req.params.productid
        const decrementNum=req.body.decrementNum
       
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({message:"user not found"})
        }
        const product =await Product.findById(productid)
        if (!product) {
            res.status(404).json({message:"product is not found"})
        }
        const cartitem= await Cart.findOne({userid:user._id , productid:product._id} )
        // console.log("cart",cartitem);
        if (typeof decrementNum !== "number") {
          return  res.status(404).json({message:"quantity should be number"})
        }   if  ( cartitem.quantity <= decrementNum) {
         return   res.status(202).json({message:"cant decrese "})
        }else{

            
            cartitem.quantity -=decrementNum;
            await cartitem.save() 
            res.status(200).json({message:"quantity is decreased "})
        }          
    } catch (error) {
        
        res.status(500).json({message:"internal server error"})
    }
    }

    //  REMOVE PRODUCT AND  USER ID  FROM only  CART 
    export const removeCart=async (req,res)=>{
        try {
            const id=req.params.id
            const productid=req.params.productid

            const user = await User.findById(id)
            if (!user) {
                res.status(404).json({message:"user not found"})
            }
            const product =await Product.findById(productid)
            if (!product) {
                res.status(404).json({message:"product is not found"})
            }
            const cart =  await Cart.findOneAndDelete({userid:user._id,productid:product._id})
            const  cartitemintex = user.cart.findIndex(item=>item.equals(cart._id))
                  
            
            if (cartitemintex !==-1) {
                user.cart.splice(cartitemintex,1)
                await user.save()
                res.status(200).json({message:"remove from cart and users Cart"})
            
            }
            
        } catch (error) {
            
        }
    }


    // show all the orders
    export const vieworders= async (req,res)=>{
           try {
            const {userid}=req.params
            console.log(userid);
            const findorder= await User.findById(userid).populate({
                path:"orders",
                populate:{path:"products"}
            })
            /
            res.status(200).json(findorder.orders)
           } catch (error) {
            
           }
    }


    