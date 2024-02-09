import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { createColor, deleteColor, getColor, getColors, updateColor } from '../controllers/colorControllers.js';

//router instance
const colorRouter=express.Router()


colorRouter.post("/",isLogged,createColor)
colorRouter.get("/",getColors)
colorRouter.get("/:id",getColor)
colorRouter.put("/:id",isLogged,updateColor)
colorRouter.delete("/:id",isLogged,deleteColor)


export default colorRouter;