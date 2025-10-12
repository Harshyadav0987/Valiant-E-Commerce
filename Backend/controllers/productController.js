import {v2 as cloudinary} from 'cloudinary';
import connectCloudinary from '../config/cloudinary.js';
import productModel from '../models/productModel.js';

//Function to add a new product
const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, subCategory,sizes,bestseller} = req.body;
        
        const image1= req.files.image1 && req.files.image1[0];
        const image2= req.files.image2 && req.files.image2[0];
        const image3= req.files.image3 && req.files.image3[0];
        const image4= req.files.image4 && req.files.image4[0];

        // Collect all uploaded images
        const images = [image1, image2, image3, image4].filter(img => img !== undefined);
        await connectCloudinary();

        // Upload images to Cloudinary and get their URLs

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
        );

        // Create a new product object
        const newProduct = {
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes : JSON.parse(sizes),
            bestseller : bestseller === 'true'? true : false,
            images: imagesUrl,
            date : Date.now()
        };

        console.log(newProduct);

        const product = new productModel(newProduct);
        await product.save();
        res.json({success: true, message: "Product added successfully", product });

    } catch (error) {
        console.error("Error adding product:", error);
        res.json({ success: false,  message: "Internal server error" });
    }    
}

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

//Function to remove product 

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({success:true, message: "Product removed successfully" });
    }   catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

//function to get single product details

const singleProduct = async (req, res) => {
    try {
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