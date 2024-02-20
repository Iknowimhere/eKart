import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productControllers.js';
import upload from '../config/fileUpload.js';
import isAdmin from '../middlewares/isAdmin.js';

//router instance
const productRouter=express.Router()


productRouter.post("/",isLogged,isAdmin,upload.array('images'),createProduct)
productRouter.get("/",getProducts)
productRouter.get("/:id",getProduct)
productRouter.put("/:id",isLogged,isAdmin,updateProduct)
productRouter.delete("/:id",isLogged,isAdmin,deleteProduct)


export default productRouter;