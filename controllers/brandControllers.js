import Brand from '../models/Brand.js'
import expressAsyncHandler from 'express-async-handler'

//@desc     Create Brand
//@path     /api/v1/brands
//@access   Private/Admin
export const createBrand=expressAsyncHandler(async (req,res)=>{
    const {name}=req.body
    const existingBrand=await Brand.findOne({name:name})
    if(existingBrand){ 
        throw new Error('Brand exists already')
    }
    const newBrand=await Brand.create({
        name,
        user:req.userId
    }) 
    res.status(201).json({
        status:"success",
        message:"Brand created",
        newBrand
    })
})

//@desc     Get Brand
//@path     /api/v1/brands
//@access   Private/Admin
export const getBrands=expressAsyncHandler(async (req,res)=>{
    const brands=await Brand.find() 
    res.status(201).json({
        status:"success",
        message:"brands fetched successfully",
        brands
    })
})

//@desc     Get Brand
//@path     /api/v1/brands/:id
//@access   Public

export const getBrand=expressAsyncHandler(async (req,res)=>{
    const brand=await Brand.findById(req.params.id)
    res.status(200).json({
        status:"success",
        message:"brand fetched successfully",
        brand
    })
})


//@desc     Update Brand
//@path     /api/v1/brands/:id
//@access   Private/Admin

export const updateBrand=expressAsyncHandler(async (req,res)=>{
    const updatedBrand=await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    res.status(200).json({
        status:"success",
        message:"Brand updated successfully",
        updatedBrand
    })
})

//@desc     Delete Brand
//@path     /api/v1/categories/:id
//@access   Private/Admin

export const deleteBrand=expressAsyncHandler(async (req,res)=>{
    await Brand.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:"success",
        message:"Brand deleted successfully"
    })
})