import Product from "../models/Product.js"


//@desc     Create Prodcut
//@path     /api/v1/products
//@access   Private/Admin

export const createProduct=async (req,res)=>{
    try {
        const {name,description,brand,category,sizes,colors,price,totalQty}=req.body
        const existingProduct=await Product.findOne({name:name})
        if(existingProduct){
            return res.json({
                message:"product exists already",
            })  
        }
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


//@desc     Get Products
//@path     /api/v1/products
//@access   Public

export const getProducts=async (req,res)=>{
    try {
        //query object
        let productQuery=Product.find()
        //based on name
        if(req.query.name){
            productQuery=productQuery.find({name:{$regex:req.query.name,$options:"i"}})
        }
        //based on color
        if(req.query.colors){
            productQuery=productQuery.find({colors:req.query.colors})
        }
        //getting results by resolving query object
        let products= await productQuery;
        res.status(200).json({
            status:"success",
            message:"products fetched successfully",
            products
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//@desc     Get Product
//@path     /api/v1/products/:id
//@access   Public

export const getProduct=async (req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        res.status(200).json({
            status:"success",
            message:"product fetched successfully",
            product
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}


//@desc     Update Product
//@path     /api/v1/products/:id
//@access   Private/Admin

export const updateProduct=async (req,res)=>{
    try {
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(200).json({
            status:"success",
            message:"product updated successfully",
            updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//@desc     Delete Product
//@path     /api/v1/products/:id
//@access   Private/Admin

export const deleteProduct=async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:"success",
            message:"product deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}