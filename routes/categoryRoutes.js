import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { createCategory, deletecategory, getCategories, getCategory, updatecategory } from '../controllers/categoryControllers.js';

//router instance
const categoryRouter=express.Router()


categoryRouter.post("/",isLogged,createCategory)
categoryRouter.get("/",getCategories)
categoryRouter.get("/:id",getCategory)
categoryRouter.put("/:id",isLogged,updatecategory)
categoryRouter.delete("/:id",isLogged,deletecategory)


export default categoryRouter;