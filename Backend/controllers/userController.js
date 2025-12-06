import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import sanitizeHtml from "sanitize-html";

//function to create JWT token

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    })
} 

//Signup Schema for validation JOI
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

//route for user Login
const userLogin= async (req,res)=>{
    try{

        const {error} = loginSchema.validate(req.body,{abortEarly:false});
        if(error){
            console.log("Validation error:", error.details[0].message);
            return res.json({success:false,message:error.details[0].message});
        }
        const {email,password} = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:'User not found'})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:'Incorrect password'})
        }
        const token = createToken(user._id);
        res.json({success:true,message:'Login successful',token})

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err.message})
    }
}

//Signup Schema for validation JOI

const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});


//route for user Signup

const userSignup= async (req,res)=>{
    try{
        const {error} = signupSchema.validate(req.body,{abortEarly:false});
        if(error){
            console.log("Validation error:", error.details[0].message);
            return res.json({success:false,message:error.details});
        }
        
        const {name,email,password} =req.body;

        const cleanName = sanitizeHtml(name, {
        allowedTags: [],
        allowedAttributes: {}
        }).trim();
        
        // If sanitization removes everything, reject
        if (!cleanName) {
        return res.json({ success:false, message:"Invalid name" });
        }

        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:'User already exists'})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        console.log("cleanName:", cleanName);

        const newUser = new userModel ({
            name:cleanName ,
            email,
            password:hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({success:true,message:'User created successfully',token})
    }    
    catch(err){
        console.log(err);
        res.json({success:false,message:'Error in signup'})
    }
}


//validation schema for admin login

const adminLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});



//route for admin login
const adminLogin = async(req,res)=>{
    try{

        const {error} = adminLoginSchema.validate(req.body,{abortEarly:false});
        if(error){
            console.log("Validation error:", error.details[0].message);
            return res.json({success:false,message:error.details[0].message});
        }
        
        const {email,password} = req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            return res.json({success:true,message:'Login successful',token})
        }
        else{
            return res.json({success:false,message:'Invalid admin credentials'})
        }
    }catch(err){
        console.log("error in admin login");
        res.json({success:false,message:"Error in admin login"});
    }
}

export {userLogin,userSignup,adminLogin};