import express from "express"
import cors from "cors";
import bodyParser from "body-parser";
import {sequelize} from "./sequelize.js"
import{mainRouter} from './routes/mainRouter.js';


import { User } from "./models/userModel.js";
import { Feedback } from "./models/feedbackModel.js";


const app=express();

User.hasMany(Feedback);
Feedback.belongsTo(User, {through: "userID"});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

app.use((error,request,response,next)=>{
    console.error(`[ERROR]: ${error}`)
    response.status(500).json(error);
});

app.use("/api",mainRouter);

app.listen(5001,async()=>{
    console.log("express web server running on port 5001");
    try{
        await sequelize.authenticate();
        console.log("connection has been established!");

    }catch(err){
        console.err("unable to connect to the database",err)
    }
})

