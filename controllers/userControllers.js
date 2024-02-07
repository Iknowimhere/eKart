import User from "../models/User.js"
// import { asyncErrorHandler } from "../utils/asyncErrorHandler.js"
import expressAsyncHandler from "express-async-handler"
import { genToken } from "../utils/genToken.js"

//@desc     Register User
//@path     /api/v1/users/register
//@access   Public

export const registerUser=expressAsyncHandler(async (req,res,next)=>{
    const {fullName,email,password}=req.body
    const existingUser=await User.findOne({email:email})
    if(existingUser){
        // next(new Error('user is already present,Please login'))
        throw new Error('User is already present,Please login')
    }
    const user=await User.create({
        fullName,
        email,
        password
    })
    res.status(201).json({
        status:"success",
        message:"user registered",
        user
    })
})

//@desc     Login User
//@path     /api/v1/users/login
//@access   Public

export const loginUser=expressAsyncHandler(async (req,res)=>{
    const {email,password}=req.body
    const existingUser=await User.findOne({email:email})
    if(!existingUser || (!(await existingUser.verifyPwd(password,existingUser.password)))){
        // return res.json({
        //     message:"username and password do not match"
        // })
        throw new Error("username and password do not match")
    }
    const token=await genToken(existingUser._id)
    res.status(201).json({
        status:"success",
        message:"user logged in",
        token,
        existingUser
    })
})

export const getProfile=async(req,res)=>{
    res.send("hello this is profile page")
}