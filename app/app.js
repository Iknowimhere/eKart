import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import userRouter from '../routes/userRoutes.js'
import {dbConfig} from '../config/dbConfig.js'
import productRouter from '../routes/productRoutes.js'
import { globalErrorHandler } from '../middlewares/globalErrorHandler.js'

dbConfig()

//app instance
let app=express();

//middleware to process incoming json data
app.use(express.json());

app.use("/api/v1/users",userRouter);
app.use("/api/v1/products",productRouter);

//not found route
app.all("*",(req,res,next)=>{
    const err=new Error(`path ${req.originalUrl} is not found`)
    err.status=404;
    next(err)
})

app.use(globalErrorHandler)

export default app;