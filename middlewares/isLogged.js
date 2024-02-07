import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import expressAsyncHandler from 'express-async-handler'

export const isLogged=expressAsyncHandler(async (req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1]
    if(!token){
        // return res.json({
        //     message:"please login"
        // })
        throw new Error('Please login')
    }
    const decodedToken=await jwt.verify(token,process.env.JWT_SECRET)
    const user=await User.findById(decodedToken?.id)
    if(!user){
        // return res.json({
        //     message:"user doesnt exist"
        // })
        throw new Error("user doesnt exist")
    }
    req.userId=user?._id
    next()
})