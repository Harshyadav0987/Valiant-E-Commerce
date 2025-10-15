//Function for placing order via cash on delivery

import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

const placeOrder = async (req,res)=>{
  
    try{
        const {items,amount,address} = req.body;
        const userId = req.userId;
        console.log('req came')

        const orderData = new orderModel({
            userId,
            items,
            address,
            amount,
            paymentMethod : "COD",
            payment : false,
            date : Date.now()
        })

        console.log("User ID:", userId);

        await orderData.save();
        
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(200).json({success:true,message : "Order placed successfully"});
    }
    catch(error){
        res.status(500).json({success:false,message : error.message});
        console.log(error);
    }
}

//Placing order via Stripe

const placeOrderStripe = async (req,res)=>{

}

//Placing order via Razorpay
const placeOrderRazorpay = async (req,res)=>{

}

//All orders data for admin 

const allOrders = async (req,res)=>{

}

//User orders data for frontend

const userOrders = async (req,res)=>{
    try{
        // console.log("check done from controller")
        const userId = req.userId;
        const orders = await orderModel.find({userId});
        res.json({success:true,orders});
    }catch(error){
        res.status(500).json({success:false,message: error.message});
        console.log(error);
    }
}

//Order status update by admin

const updateStatus = async (req,res)=>{

}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus};