import mongoose from "mongoose";
const wishlistSchema =mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Corrected reference name to singular form
        required: true,
    },
    quantity: {
        type: Number,
        default: 1 // Default quantity is 1
    }

})
const wishList = mongoose.model("Wishlist", wishlistSchema)
export default wishList
 