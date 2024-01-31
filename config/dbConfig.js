import mongoose from "mongoose";

export const dbConfig=()=>{
    mongoose.connect(process.env.MONGO_URI).then((db)=>{
        console.log(`db connected ${db.connection.host}`);
    }).catch((err)=>{
        console.log(err);
    })
}
