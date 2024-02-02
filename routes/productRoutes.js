import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productControllers.js';

//router instance
const productRouter=express.Router()


productRouter.post("/",isLogged,createProduct)
productRouter.get("/",getProducts)
productRouter.get("/:id",getProduct)
productRouter.put("/:id",isLogged,updateProduct)
productRouter.delete("/:id",isLogged,deleteProduct)


export default productRouter;