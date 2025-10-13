import userModel from "../models/userModel.js";

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

//Function to Update cart

const updateCart =async(req,res) => {
    try{
        const {itemId,size,quantity} = req.body;
        const userId = req.userId;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData; 

        cartData[itemId].sizes[size] = quantity;

        await userModel.findByIdAndUpdate(userId, {cartData: cartData});
        return res.status(200).json({success: true, message: 'Cart updated successfully', cartData: cartData});
    }
    catch(error){
        return res.status(500).json({success: false, message: 'Server Error'});
    }
}

//Function to get user cart data 

const getUserCart = async(req,res) => {
    try{
        const userId = req.userId;
        // console.log("UserId from getUserCart:",userId);

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData; 

        return res.status(200).json({success: true, message: 'Cart data fetched successfully', cartData: cartData});
    }
    catch(error){
        return res.status(500).json({success: false, message: 'Server Error'});
    }
}

export {addToCart, updateCart, getUserCart};