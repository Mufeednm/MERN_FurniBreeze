import Product from "../models/products.js";
import express from "express";
import { productJoi } from "../validation/authJOI.js";

// Add product
export const addproduct = async (req, res, next) => {

  try {

   
    // const {title,description,price,category}= req.body;
    const validatedProduct = await productJoi.validateAsync(req.body);

    //  to mongodb
    const newProduct = new Product({
      title: validatedProduct.title,
      description: validatedProduct.description,
      price: validatedProduct.price,
      type: validatedProduct.type,
      productImg: req.cloudinaryImageUrl,
      crossprice:validatedProduct.crossprice,
    });

    await newProduct.save();
    res.status(201).json({ message: "new product is ready" });
  } catch (error) {
    next(error);
  }
};

// show all products
export const adminproduct = async (req, res) => {
  const allproduct = await Product.find();
  if (allproduct.length == 0) {
    res.status(404).json({ message: "No Products" });
  }
  res.status(200).json(allproduct);
};
//  admin get products by category
export const showbycategory = async (req, res) => {
  const category = req.query.category;
  const regex = new RegExp(category, "i");
  const product = await Product.find({
    $or: [{ category: regex }, { title: regex }],
  });
  if (product.length == 0) {
    res.status(404).json({ message: "no product is found" });
  }
  res.status(200).json({
    status: "success",
    message: "Successfully fetched products detail.",
    data: product,
  });
};

// admin update product
export const updateproduct =async (req,res)=>{
  try {
    const { id } = req.params;
    const updatedproduct = await Product.findById(id);

    // Destructure the fields from req.body
    const { title, description, price, type } = req.body;
    console.log(title);
    console.log(description);
    console.log(price);
    console.log(type);

    // Update fields if they exist in req.body
    if (title) {
      updatedproduct.title = title;
    }
    if (description) {
      updatedproduct.description = description;
    }
    if (price) {
      updatedproduct.price = price;
    }
    if (req.cloudinaryImageUrl) {
      updatedproduct.productImg = req.cloudinaryImageUrl;
    }
    if (type) {
      updatedproduct.type = type;
    }

    // Save the updated product
    await updatedproduct.save();

    // Respond with the updated product
    res.status(200).json(updatedproduct);
  } catch (error) {
    // Handle errors appropriately
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// delete product Admin
export const deleteproduct=async(req,res)=>{
  const {productid}=req.params
  console.log(productid);
  const product = await Product.findByIdAndDelete(productid)
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }
// await product.save()
res.status(200).json({ message: "Product successfully deleted" });
} 

