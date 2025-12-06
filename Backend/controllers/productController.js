import {v2 as cloudinary} from 'cloudinary';
import connectCloudinary from '../config/cloudinary.js';
import productModel from '../models/productModel.js';
import sanitizeHtml from 'sanitize-html';
import Joi from 'joi';

const addProductSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  description: Joi.string().min(5).max(5000).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().min(2).max(100).required(),
  subCategory: Joi.string().required(),
  sizes: Joi.string().required(), // will be JSON string from form-data
  bestseller: Joi.string().valid("true", "false").required()
});


//Function to add a new product
const addProduct = async (req, res) => {
  try {
    // 1) Validate body (text fields) with Joi
    const { error } = addProductSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log("Add product validation error:", error.details[0].message);
      return res.json({ success: false, message: error.details[0].message });
    }

    let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // 2) Sanitize strings that will be shown in UI
    const cleanName = sanitizeHtml(name, {
      allowedTags: [],
      allowedAttributes: {}
    }).trim();

    const cleanDescription = sanitizeHtml(description, {
      allowedTags: [],
      allowedAttributes: {}
    }).trim();

    const cleanCategory = sanitizeHtml(category, {
      allowedTags: [],
      allowedAttributes: {}
    }).trim();

    const cleanSubCategory = subCategory
      ? sanitizeHtml(subCategory, {
          allowedTags: [],
          allowedAttributes: {}
        }).trim()
      : "";

    // If name/description become empty after sanitization → reject
    if (!cleanName || !cleanDescription) {
      return res.json({ success: false, message: "Invalid name or description" });
    }

    // 3) Parse sizes safely
    let parsedSizes;
    try {
      parsedSizes = JSON.parse(sizes); // expecting '["S","M","L"]'
      if (!Array.isArray(parsedSizes)) {
        throw new Error("Sizes should be an array");
      }
    } catch (e) {
      return res.json({ success: false, message: "Invalid sizes format" });
    }

    // 4) Handle images
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    if (images.length === 0) {
      return res.json({ success: false, message: "At least one product image is required" });
    }

    await connectCloudinary();

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image"
        });
        return result.secure_url;
      })
    );

    // 5) Build product object using CLEAN values
    const newProduct = {
      name: cleanName,
      description: cleanDescription,
      price: Number(price),
      category: cleanCategory,
      subCategory: cleanSubCategory,
      sizes: parsedSizes,
      bestseller: bestseller === "true",
      images: imagesUrl,
      date: Date.now()
    };

    console.log("New product:", newProduct);

    const product = new productModel(newProduct);
    await product.save();

    res.json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

//Funtion to list products 

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.status(200).json({success: true,message: "Products fetched successfully", products});
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

//function to validate remove product request

const removeProductSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
});

//Function to remove product 

const removeProduct = async (req, res) => {
    try {
        const {error} = removeProductSchema.validate(req.body);
        if(error){
            console.log("Remove product validation error:", error.details[0].message);
            return res.status(400).json({success:false,message:error.details[0].message});
        }

        if (!mongoose.isValidObjectId(req.body.id)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }

        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({success:true, message: "Product removed successfully" });
    }   catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

//function to validate single product request

const singleProductSchema = Joi.object({
    productId: Joi.string().length(24).hex().required()
});

//function to get single product details

const singleProduct = async (req, res) => {
    try {

        const {error} = singleProductSchema.validate(req.body);
        if(error){
            console.log("Single product validation error:", error.details[0].message);
            return res.status(400).json({success:false,message:error.details[0].message});
        }

        if (!mongoose.isValidObjectId(req.body.productId)) {    
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.status(200).json(product);
    }   catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateProduct = async (req, res) => {

}   

export {addProduct, listProducts, removeProduct, updateProduct, singleProduct};