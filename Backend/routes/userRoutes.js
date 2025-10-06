import express from "express";
import {userSignup,adminLogin, userLogin} from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/login',userLogin);
userRouter.post('/signup',userSignup);
userRouter.post('/admin',adminLogin);

export default userRouter;