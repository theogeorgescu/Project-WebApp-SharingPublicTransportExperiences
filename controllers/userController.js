import { User } from "../models/userModel";
import { Op } from "sequelize";

const insertUserIntoDB=async(req,res)=>{
    try{
        const user=req.body;
        await User.create(user)
        res.status(200).json('object has been added to db')

    }catch(err){
        return res.status(500).json(err)
    }
}