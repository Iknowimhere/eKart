import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { createColor, deleteColor, getColor, getColors, updateColor } from '../controllers/colorControllers.js';
import isAdmin from '../middlewares/isAdmin.js';

//router instance
const colorRouter=express.Router()


colorRouter.post("/",isLogged,isAdmin,createColor)
colorRouter.get("/",getColors)
colorRouter.get("/:id",getColor)
colorRouter.put("/:id",isLogged,isAdmin,updateColor)
colorRouter.delete("/:id",isLogged,isAdmin,deleteColor)


export default colorRouter;