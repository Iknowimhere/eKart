import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {dbConfig} from '../config/dbConfig.js'

dbConfig()

//app instance
let app=express()

app.get("/",(req,res)=>{
    res.send("eapparel")
})

export default app;