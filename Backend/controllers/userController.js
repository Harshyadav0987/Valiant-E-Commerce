import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    })
} 

//route for user Login
const userLogin= async (req,res)=>{
    try{
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

//route for user Signup

const userSignup= async (req,res)=>{
    try{
        const {name,email,password} =req.body;
        
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:'User already exists'})
        }

        //validating email format and strong password

        if(!validator.isEmail(email)){
            return res.json({success:false,message : "Invalid Email"})
        }
        if(password.length<8){
            return res.json({success:false,message : "Enter stronger password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel ({
            name ,
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

//route for admin login
const adminLogin = async(req,res)=>{
    try{
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