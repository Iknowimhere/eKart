import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { deleteReviewOfProduct, getReviewsOfProduct, postReview } from '../controllers/reviewControllers.js';
import isAdmin from '../middlewares/isAdmin.js';

//router instance
const reviewRouter=express.Router()


reviewRouter.post("/:productID",isLogged,postReview)
reviewRouter.get("/:productID",isLogged,getReviewsOfProduct)
reviewRouter.delete("/delete/:reviewId",isLogged,isAdmin,deleteReviewOfProduct)


export default reviewRouter;