import express from "express"
import { sequelize } from "../sequelize.js";
import {userRouter} from "../routes/userRouter.js"

import { User } from "../models/userModel.js";
import { Feedback } from "../models/feedbackModel.js";



const router=express.Router()
router.use("/user",userRouter)

router.put("/createDatabase", async (request, response, next) => {
  try {
    await sequelize.sync({ force: true });
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
});


router.post("/data", async (request, response, next) => {
    try {
      const registry = {}; 
     
      for (let u of request.body) {
        const user = await User.create(u);
        
        for (let s of u.feedbacks) {
          const feedback = await Feedback.create(s);  //aici s a blocat
          registry[s.key] = feedback;
          user.addFeedbacks(feedback)
        }
       
        await user.save(); 
      }
      response.sendStatus(204);
    } catch (error) {
      next(error);
    }
});


  

router.get("/data", async(request,response,next)=>{
    try{
    const result=[]
    for(let u of await User.findAll()){
        const user={
            id:u.id,
            username:u.username,
            email: u.email,
            password: u.password,
            feedbacks:[],
        };
        for(let f of await u.getFeedbacks()){  //eroare
            user.feedbacks.push({
                
                
                startingPoint:f.startingPoint,
                endingPoint:f.endingPoint,
                transportType:f.transportType,
                observations:f.observations,
                statisfactionLevel:f.statisfactionLevel,
                key:f.id,
            });
        }
        result.push(user)
    }
    if (result.length > 0) {
        response.json(result);
      } else {
        response.sendStatus(204);
      }
    }catch(error){
       next(error)
    } 
})

export {router as mainRouter}

