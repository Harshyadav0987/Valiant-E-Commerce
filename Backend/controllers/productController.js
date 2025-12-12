import {v2 as cloudinary} from 'cloudinary';
import connectCloudinary from '../config/cloudinary.js';
import productModel from '../models/productModel.js';
import sanitizeHtml from 'sanitize-html';
import Joi from 'joi';
import redisClient from '../config/redis.js';
import mongoose from 'mongoose';

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

    await redisClient.del("products:list");
    // 6) Save to DB    

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
    const cacheKey = "products:list";

    // 1) Check cache
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log("📌 Cache HIT for product list");
      return res.status(200).json({
        success: true,
        message: "Products fetched from cache",
        products: JSON.parse(cached),
      });
    }

    // 2) If no cache → hit DB
    console.log("🌐 Cache MISS for product list");
    const products = await productModel.find({}).lean();

    // 3) Store in cache with TTL (e.g., 60 seconds)
    await redisClient.set(cacheKey, JSON.stringify(products),  "EX", 60 );

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

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
        await redisClient.del("products:list");

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
        const {error} = singleProductSchema.validate(req.params);
        if(error){
            console.log("Single product validation error:", error.details[0].message);
            return res.status(400).json({success:false,message:error.details[0].message});
        }

        if (!mongoose.isValidObjectId(req.params.productId)) {    
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }
        const {productId} = req.params;
        const product = await productModel.findById(productId).lean();
        res.status(200).json({ success: true, product });
    }   catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const updateProductSchema = Joi.object({
  productId: Joi.string().required(),
  name: Joi.string().min(2).max(200),
  description: Joi.string().min(5).max(5000),
  price: Joi.number().min(0),
  category: Joi.string().min(2).max(100),
  subCategory: Joi.string(),
  sizes: Joi.string(), // will be JSON string from form-data
  bestseller: Joi.string().valid("true", "false"),
  existingImages: Joi.string() // JSON string of existing image URLs to keep
});

// Function to update an existing product
const updateProduct = async (req, res) => {
  try {
    // 1) Validate body with Joi
    const { error } = updateProductSchema.validate(req.body, { 
      abortEarly: false 
    });
    
    if (error) {
      console.log("Update product validation error:", error.details[0].message);
      return res.json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    const { productId } = req.params;
    const { existingImages } = req.body;

    // 2) Check if product exists
    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      return res.json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    // 3) Build update object with sanitized values
    const updateData = {};

    // Sanitize and update name
    if (req.body.name) {
      const cleanName = sanitizeHtml(req.body.name, {
        allowedTags: [],
        allowedAttributes: {}
      }).trim();
      
      if (!cleanName) {
        return res.json({ 
          success: false, 
          message: "Invalid name" 
        });
      }
      updateData.name = cleanName;
    }

    // Sanitize and update description
    if (req.body.description) {
      const cleanDescription = sanitizeHtml(req.body.description, {
        allowedTags: [],
        allowedAttributes: {}
      }).trim();
      
      if (!cleanDescription) {
        return res.json({ 
          success: false, 
          message: "Invalid description" 
        });
      }
      updateData.description = cleanDescription;
    }

    // Update price
    if (req.body.price !== undefined) {
      updateData.price = Number(req.body.price);
    }

    // Sanitize and update category
    if (req.body.category) {
      updateData.category = sanitizeHtml(req.body.category, {
        allowedTags: [],
        allowedAttributes: {}
      }).trim();
    }

    // Sanitize and update subCategory
    if (req.body.subCategory) {
      updateData.subCategory = sanitizeHtml(req.body.subCategory, {
        allowedTags: [],
        allowedAttributes: {}
      }).trim();
    }

    // Parse and update sizes
    if (req.body.sizes) {
      try {
        const parsedSizes = JSON.parse(req.body.sizes);
        if (!Array.isArray(parsedSizes)) {
          throw new Error("Sizes should be an array");
        }
        updateData.sizes = parsedSizes;
      } catch (e) {
        return res.json({ 
          success: false, 
          message: "Invalid sizes format" 
        });
      }
    }

    // Update bestseller
    if (req.body.bestseller) {
      updateData.bestseller = req.body.bestseller === "true";
    }

    // 4) Handle images
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];
    const newImages = [image1, image2, image3, image4].filter(Boolean);

    // Parse existing images that should be kept
    let keptImages = [];
    if (existingImages) {
      try {
        keptImages = JSON.parse(existingImages);
        if (!Array.isArray(keptImages)) {
          keptImages = [];
        }
      } catch (e) {
        console.log("Error parsing existingImages:", e);
        keptImages = [];
      }
    }

    // Upload new images to Cloudinary
    let newImagesUrl = [];
    if (newImages.length > 0) {
      await connectCloudinary();
      
      newImagesUrl = await Promise.all(
        newImages.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image"
          });
          return result.secure_url;
        })
      );
    }

    // Combine kept images and new images
    const finalImages = [...keptImages, ...newImagesUrl];

    // Ensure at least one image exists
    if (finalImages.length === 0) {
      return res.json({ 
        success: false, 
        message: "At least one product image is required" 
      });
    }

    updateData.images = finalImages;

    // 5) Delete old images from Cloudinary that are no longer used
    const oldImages = existingProduct.images || [];
    const imagesToDelete = oldImages.filter(img => !keptImages.includes(img));
    
    if (imagesToDelete.length > 0) {
      await connectCloudinary();
      
      // Extract public IDs and delete from Cloudinary
      for (const imageUrl of imagesToDelete) {
        try {
          // Extract public ID from URL
          const publicId = imageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (deleteError) {
          console.log("Error deleting old image:", deleteError);
          // Continue even if deletion fails
        }
      }
    }

    // 6) Update the product in database
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    // Clear Redis cache
    await redisClient.del("products:list");

    res.json({ 
      success: true, 
      message: "Product updated successfully", 
      product: updatedProduct 
    });

  } catch (error) {
    console.error("Error updating product:", error);
    res.json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

const validatesearchProductsSchema = Joi.object({
    query: Joi.string().min(1).max(100).required()
});

const searchProducts = async (req, res) => {
  try{
    const { error } = validatesearchProductsSchema.validate(req.query);
    // console.log("Search query:", req.query.query);
    // console.log("Validation result:", error);
    if (error) {
      console.log("Search products validation error:", error.details[0].message);
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const {query} = req.query;
    const cleanQuery = sanitizeHtml(query, {
      allowedTags: [],
      allowedAttributes: {}
    }).trim();

    // console.log("Cleaned search query:", cleanQuery);

    if (!cleanQuery) {
      res.status(200).json({ success: true, products: [] });
      return;
    }

    if (cleanQuery.length > 100) {
      res.status(400).json({ success: false, message: "Search query too long" });
      return;
    }
  
    const results = await productModel.find(
      { $text: { $search: cleanQuery } },
      { score: { $meta: "textScore" } }
    )
      .sort({score: {$meta: "textScore"}})
      .lean();
    // console.log("Search results:", results);
    res.status(200).json({ success: true, products: results });
  }
  catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {addProduct, listProducts, removeProduct, updateProduct, singleProduct, searchProducts};