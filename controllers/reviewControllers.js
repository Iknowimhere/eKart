import expressAsyncHandler from 'express-async-handler'
import Product from '../models/Product.js'
import Review from '../models/Review.js'

export const postReview=expressAsyncHandler(async(req,res)=>{
    let productID=req.params.productID

    const productFound=await Product.findOne({_id:productID}).populate("reviews")

    if(!productFound){
        throw new Error('No product found')
    }
    const {message,rating}=req.body

    //check whether user has reviewed the product already
    const userFound= productFound.reviews.find(review=>{
        return review?.user.toString()===req.userId.toString()
    })
    if(userFound){
        throw new Error('You have reviewd this product already')
    }

   const review= await Review.create({
        user:req.userId,
        product:productFound._id,
        message,
        rating
    })

    //pushing reveiws into product
    productFound.reviews.push(review._id)
    //re save the product
    await productFound.save()

    res.status(201).json({
        status:"success",
        message:"review posted successfully",
        review
    })

})

export const getReviewsOfProduct=expressAsyncHandler(async(req,res)=>{
    let productID=req.params.productID

    const productFound=await Product.findOne({_id:productID}).populate("reviews")
    const reviews=productFound.reviews
    res.status(201).json({
        status:"success",
        message:"reviews fetched successfully",
        reviews
    })
    
})

export const deleteReviewOfProduct=expressAsyncHandler(async(req,res)=>{
    let reviewID=req.params.reviewId

    await Review.findByIdAndDelete(reviewID)

    res.status(201).json({
        status:"success",
        message:"review deleted successfully",
    })
    
})