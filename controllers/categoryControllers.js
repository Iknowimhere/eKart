import Category from '../models/Category.js'
import expressAsyncHandler from 'express-async-handler'

//@desc     Create Category
//@path     /api/v1/categories
//@access   Private/Admin
export const createCategory=expressAsyncHandler(async (req,res)=>{
    const {name}=req.body
    const existingCategory=await Category.findOne({name:name})
    if(existingCategory){ 
        throw new Error('Category exists already')
    }
    const product=await Category.create({
        name,
        image:req.file.path,
        user:req.userId
    }) 
    res.status(201).json({
        status:"success",
        message:"category created",
        product
    })
})

//@desc     Get Categories
//@path     /api/v1/categories
//@access   Private/Admin
export const getCategories=expressAsyncHandler(async (req,res)=>{
    const categories=await Category.find() 
    res.status(201).json({
        status:"success",
        message:"categories fetched successfully",
        categories
    })
})

//@desc     Get Category
//@path     /api/v1/categories/:id
//@access   Public

export const getCategory=expressAsyncHandler(async (req,res)=>{
    const category=await Category.findById(req.params.id)
    res.status(200).json({
        status:"success",
        message:"category fetched successfully",
        category
    })
})


//@desc     Update Category
//@path     /api/v1/categories/:id
//@access   Private/Admin

export const updatecategory=expressAsyncHandler(async (req,res)=>{
    const updatedcategory=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    res.status(200).json({
        status:"success",
        message:"category updated successfully",
        updatedcategory
    })
})

//@desc     Delete Category
//@path     /api/v1/categories/:id
//@access   Private/Admin

export const deletecategory=expressAsyncHandler(async (req,res)=>{
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:"success",
        message:"category deleted successfully"
    })
})