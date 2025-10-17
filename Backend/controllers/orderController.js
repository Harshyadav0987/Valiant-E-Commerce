import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "Stripe"
import razorpay from 'razorpay'

const currency = 'USD'
const deliveryFee = 99;

//payment gateway integration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})

//Function for placing order via cash on delivery
const placeOrder = async (req,res)=>{
  
    try{
        const {items,amount,address} = req.body;
        const userId = req.userId;
        // console.log('req came')

        const orderData = new orderModel({
            userId,
            items,
            address,
            amount,
            paymentMethod : "COD",
            payment : false,
            date : Date.now()
        })

        // console.log("User ID:", userId);

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
    try{
        const {items,amount,address} = req.body;
        const {origin} = req.headers;
        const userId = req.userId;

        //   console.log("Items received:", items);
        // console.log("Delivery Fee:", deliveryFee);

        const orderData = new orderModel({
            userId,
            items,
            address,
            amount,
            paymentMethod : "Stripe",
            payment : false,
            date : Date.now()
        })
        // console.log("reched saved")
        await orderData.save();

        
        const line_items = items.map((item)=>({
            
            price_data : {
                currency : currency,
                product_data : {
                    name : item.product.name
                },
                unit_amount : Math.round(Number(item.product.price)*100)
            },
            quantity : item.quantity
        }))
        
        line_items.push({
            price_data : {
                currency : currency,
                product_data : {
                    name : "Delivery Charge"
                },
                unit_amount :Math.round( Number(deliveryFee)*100)
            },
            quantity :1
        })
        
        // console.log("reached here")

        // console.log("Line items:", JSON.stringify(line_items, null, 2));

        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${orderData._id}` ,
            cancel_url : `${origin}/verify?success=false&orderId=${orderData._id}` ,
            line_items,
            mode : 'payment'
        })
        // console.log("left here step")

        // await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(200).json({success:true,message : "Order placed successfully",session_url : session.url});


    }catch(error){
        res.status(500).json({success:false,message: error.message});
        console.log("Error in Stripe Payment controller");
    }
}

//Stripe verify

const verifyStripe = async(req,res)=>{
    const {orderId,success} = req.body;
    const userId = req.userId;
    try{
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData : {}});

            res.json({success:true,message:"success"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error in verify stripe in controller"})
    }
}

//Placing order via Razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const orderData = new orderModel({
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        });

        await orderData.save();

        const options = {
            amount: Math.round(Number(amount) * 100),
            currency: currency.toUpperCase(),
            receipt: orderData._id.toString()
        };

        const order = await razorpayInstance.orders.create(options);
        res.json({ 
            success: true, 
            order,
            orderId: orderData._id.toString() // Return the MongoDB order ID
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const userId = req.userId;
        
        // Fetch order info from Razorpay
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        
        // console.log(orderInfo.status);
        // Check if order status is 'paid'
        if (orderInfo.status === 'paid') {
            // Update order payment status (using receipt which contains orderId)
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            
            // Clear user's cart
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            
            res.json({ success: true, message: "Payment Successful" });
        } else {
            orderModel.findByIdAndDelete(razorpay_order_id)
            res.json({ success: false, message: "Payment Failed" });
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in verify razorpay controller" });
    }
};
//to delete if backs
const deleteUnpaidOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.userId;
        
        // Find order and check if it belongs to user and is unpaid
        const order = await orderModel.findOne({ _id: orderId, userId: userId, payment: false });
        
        if (order) {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: true, message: "Order cancelled" });
        } else {
            res.json({ success: false, message: "Order not found or already paid" });
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//All orders data for admin 

const allOrders = async (req,res)=>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true,orders});

    }catch(error){
        res.status(500).json({success:false,message : error.message});
        console.log(error);
    }

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
    try{
        const {orderId,status} = req.body;
        await orderModel.findByIdAndUpdate(orderId,{status})

        res.status(200).json({success:true,message:"Status Updated Successfully"});
    }
    catch(error){
        res.status(500).json({success:false,message: error.message});
        console.log("Error in updating status");
        
    }
}

export {deleteUnpaidOrder,verifyRazorpay,verifyStripe,placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus};