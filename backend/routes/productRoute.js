import express from "express";
import { allProduct, productbyCategory, productbyId } from "../controls/productController.js";
import { addQuantity, addtocart, decreaseQuantity, removeCart, viewCart, vieworders } from "../controls/cartControl.js";
import { payment, verifypayment } from "../controls/paymentControl.js";
import { addWishlist, deletewishlist, showwishList } from "../controls/wishlistControl.js";
import { usertoken } from "../middleware/userMiddleware.js";

const router=express.Router()

// all product Route
router.get("/products", allProduct)
// id product Route
router.get("/products/:id",productbyId)
// category Product Route
router.get("/products/category/:categoryName",productbyCategory)

router.use(usertoken)
// Route fo CART
router.post("/:id/cart/:productid",addtocart)
// view cart items
router.get("/cart/:id",viewCart)
// add quantity to cart
router.post("/:id/carts/:productid",addQuantity)
// decrease quantity to cart
router.post("/:id/carts/decrement/:productid",decreaseQuantity)
// remove   product from cart
router.post("/:id/carts/remove/:productid",removeCart)
// get all the order
router.get("/allorders/:userid",vieworders)


//WISHLIST 
router.post("/:userid/wishlist/product/:productid",addWishlist)
router.get("/wishlist/:id",showwishList)
router.delete("/:userid/wishlist/deleteproduct/:productid",deletewishlist)


// PAYMENT ROUTE
router.post("/payment/:id",payment)
router.post("/verifypayment",verifypayment)

export default router

