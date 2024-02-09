import Color from '../models/Color.js'
import expressAsyncHandler from 'express-async-handler'

//@desc     Create Color
//@path     /api/v1/colors
//@access   Private/Admin
export const createColor=expressAsyncHandler(async (req,res)=>{
    const {name}=req.body
    const existingColor=await Color.findOne({name:name})
    if(existingColor){ 
        throw new Error('Color exists already')
    }
    const newColor=await Color.create({
        name,
        user:req.userId
    }) 
    res.status(201).json({
        status:"success",
        message:"Color created",
        newColor
    })
})

//@desc     Get Color
//@path     /api/v1/colors
//@access   Private/Admin
export const getColors=expressAsyncHandler(async (req,res)=>{
    const colors=await Color.find() 
    res.status(201).json({
        status:"success",
        message:"Colors fetched successfully",
        colors
    })
})

//@desc     Get Color
//@path     /api/v1/colors/:id
//@access   Public

export const getColor=expressAsyncHandler(async (req,res)=>{
    const color=await Color.findById(req.params.id)
    res.status(200).json({
        status:"success",
        message:"Color fetched successfully",
        color
    })
})


//@desc     Update Color
//@path     /api/v1/colors/:id
//@access   Private/Admin

export const updateColor=expressAsyncHandler(async (req,res)=>{
    const updatedColor=await Color.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    res.status(200).json({
        status:"success",
        message:"Color updated successfully",
        updatedColor
    })
})

//@desc     Delete Color
//@path     /api/v1/categories/:id
//@access   Private/Admin

export const deleteColor=expressAsyncHandler(async (req,res)=>{
    await Color.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:"success",
        message:"Color deleted successfully"
    })
})