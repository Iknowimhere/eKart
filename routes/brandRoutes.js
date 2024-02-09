import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from '../controllers/brandControllers.js';

//router instance
const brandRouter=express.Router()


brandRouter.post("/",isLogged,createBrand)
brandRouter.get("/",getBrands)
brandRouter.get("/:id",getBrand)
brandRouter.put("/:id",isLogged,updateBrand)
brandRouter.delete("/:id",isLogged,deleteBrand)


export default brandRouter;