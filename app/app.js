import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import userRouter from '../routes/userRoutes.js'
import {dbConfig} from '../config/dbConfig.js'

dbConfig()

//app instance
let app=express();

//middleware to process incoming json data
app.use(express.json());

app.use("/api/v1/users",userRouter);

export default app;