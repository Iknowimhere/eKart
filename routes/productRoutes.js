import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { createProduct } from '../controllers/productControllers.js';

//router instance
const productRouter=express.Router()


productRouter.post("/",isLogged,createProduct)
// productRouter.get("/",isLogged,getProducts)

export default productRouter;