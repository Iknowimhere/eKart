import Product from "../models/Product.js"


//@desc     Create Prodcut
//@path     /api/v1/products
//@access   Private/Admin

export const createProduct=async (req,res)=>{
    try {
        const {name,description,brand,category,sizes,colors,price,totalQty}=req.body

        const product=await Product.create({
            name,description,brand,category,sizes,colors,price,totalQty,user:req.userId
        })
        res.status(201).json({
            status:"success",
            message:"product created",
            product
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}
