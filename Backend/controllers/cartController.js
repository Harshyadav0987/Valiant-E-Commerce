import userModel from "../models/userModel.js";
import Joi from "joi";

//Function to add item to cart
const addToCart = async(req, res) => {
    try{
        const {itemId,size} = req.body;
        const userId = req.userId;
        // console.log("Data from cartcontroller","UserId:",userId,"ItemId:",itemId,"Size:",size);
        const userData = await userModel.findById(userId);
        // console.log(userData);
        let cartData = await userData.cartData; 
        // console.log(cartData);

        if(cartData[itemId]){
            //item already exists in cart
            if(cartData[itemId].sizes[size]){
                //size already exists in cart
                cartData[itemId].sizes[size] += 1;
            }
            else{
                //size does not exist in cart
                cartData[itemId].sizes[size] = 1;
            }
        }
        else{
            //item does not exist in cart
            cartData[itemId] = {sizes: {[size]: 1}};
        }

        await userModel.findByIdAndUpdate(userId, {cartData: cartData});
        return res.status(200).json({success: true, message: 'Item added to cart successfully', cartData: cartData});
    }
    catch(error){
        return res.status(500).json({success: false, message: 'Server Error'});
    }
}

//function to validate update cart request

const updateCartSchema = Joi.object({
    itemId: Joi.string().length(24).hex().required(),
    size: Joi.string().required(),
    quantity: Joi.number().integer().min(0).required()
});

//Function to Update cart

const updateCart = async (req, res) => {
    try {
        const {error} = updateCartSchema.validate(req.body);
        if(error){
            console.log("Update cart validation error:", error.details[0].message);
            return res.status(400).json({success:false,message:error.details[0].message});
        }   

        if (!mongoose.isValidObjectId(req.body.itemId)) {
            return res.status(400).json({ success: false, message: "Invalid item ID" });
        }


        const { itemId, size, quantity } = req.body;
        const userId = req.userId;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData; // already an array/object

        if (quantity === 0) {
            // Remove the size entry
            if (cartData[itemId] && cartData[itemId].sizes) {
                delete cartData[itemId].sizes[size];

                // If no sizes left for this item, remove the item entirely
                if (Object.keys(cartData[itemId].sizes).length === 0) {
                    delete cartData[itemId];
                }
            }
        } else {
            // Update the quantity
            if (!cartData[itemId]) cartData[itemId] = { sizes: {} };
            cartData[itemId].sizes[size] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        return res.status(200).json({ success: true, message: 'Cart updated successfully', cartData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};


//Function to get user cart data 

const getUserCart = async(req,res) => {
    try{
        const userId = req.userId;
        // console.log("UserId from getUserCart:",userId);

        const userData = await userModel.findById(userId).lean();
        let cartData = await userData.cartData; 

        return res.status(200).json({success: true, message: 'Cart data fetched successfully', cartData: cartData});
    }
    catch(error){
        return res.status(500).json({success: false, message: 'Server Error'});
    }
}

export {addToCart, updateCart, getUserCart};