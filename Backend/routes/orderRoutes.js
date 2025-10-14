import express from 'express';
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus} from '../controllers/orderController.js';
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();

//Admin Features
orderRouter.get('/list',adminAuth, allOrders);
orderRouter.post('/updatestatus',adminAuth, updateStatus);


//Payment Features
orderRouter.post('/placeorder',userAuth, placeOrder);
orderRouter.post('/placestripeorder',userAuth,placeOrderStripe);
orderRouter.post('/placerazorpayorder',userAuth, placeOrderRazorpay);

//User Features
orderRouter.get('/userorders', userOrders);

export default orderRouter;

