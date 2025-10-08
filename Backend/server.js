import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';

//app config 
const app = express();
const port = process.env.PORT || 3000
connectDB();
connectCloudinary();

//middlewares

app.use(express.json())
app.use(cors())

//api endpoints

app.use('/api/user/',userRouter)
app.use('/api/product/',productRouter)

app.get('/',(req,res)=>{
    res.send('Api is working');
})

app.listen(port,()=>{
    console.log(`server started at port : `+port)
})