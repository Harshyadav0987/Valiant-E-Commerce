import userModel from "../models/userModel.js";
import Joi from "joi";
import mongoose from "mongoose";

// Function to add item to wishlist
const addToWishlist = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;

        if (!mongoose.isValidObjectId(itemId)) {
            return res.status(400).json({ success: false, message: "Invalid item ID" });
        }

        const userData = await userModel.findById(userId);
        let wishlist = userData.wishlist || [];

        if (!wishlist.includes(itemId)) {
            wishlist.push(itemId);
            await userModel.findByIdAndUpdate(userId, { wishlist });
            return res.status(200).json({ success: true, message: 'Item added to wishlist', wishlist });
        } else {
            return res.status(200).json({ success: true, message: 'Item already in wishlist', wishlist });
        }
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

// Function to remove item from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;

        if (!mongoose.isValidObjectId(itemId)) {
            return res.status(400).json({ success: false, message: "Invalid item ID" });
        }

        const userData = await userModel.findById(userId);
        let wishlist = userData.wishlist || [];

        if (wishlist.includes(itemId)) {
            wishlist = wishlist.filter(id => id !== itemId);
            await userModel.findByIdAndUpdate(userId, { wishlist });
        }

        return res.status(200).json({ success: true, message: 'Item removed from wishlist', wishlist });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

// Function to get user wishlist data
const getUserWishlist = async (req, res) => {
    try {
        const userId = req.userId;

        const userData = await userModel.findById(userId).lean();
        let wishlist = userData.wishlist || [];

        return res.status(200).json({ success: true, message: 'Wishlist fetched successfully', wishlist });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export { addToWishlist, removeFromWishlist, getUserWishlist };
