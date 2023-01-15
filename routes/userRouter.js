import express from "express"
import { User} from "../models/userModel.js";
import{Feedback} from "../models/feedbackModel.js";


const userRouter=express.Router();

userRouter.get("/allUsers",async(request,response,next)=>{
    try{
        const users=await User.findAll()
        if(users.length>1){
            response.json(users)
        }else{
            response.sendStatus(204)
        }
    }catch(error){
        next(error)
    }
})


userRouter.post("/addUser", async(request,response,next)=>{
    try{
    const user= await User.create(request.body)
    response.status(201).location(user.id).send()
    }catch(error){
        next(error)
    }

})


//update user
userRouter.put("/:userID", async(request,response,next)=>{
    try{
        const user= await User.findByPk(request.params.userID)
        if(user){
         await user.update(request.body)
           response.status(204)
        }else{
          response.sendStatus(404)
        }
      }catch(err){
        next(err)
      }
})


//delete user
userRouter.delete("/:userID", async(request,response,next)=>{
    try{
        const user= await User.findByPk(request.params.userID)
        if(user){
          await user.destroy()
           response.status(200)
        }else{
           response.sendStatus(404)
        }
        
      }catch(err){
        next(err)
      }
})


// specific user's feedback list
userRouter.get(":userID/feedback",
async (request, response, next)=>{
try{
    const user=await User.findByPk(request.params.userID)
    if(user){
        const feedback=await user.getFeedback()
        if(feedback.length>0){
            response.json(feedback)
        }else{
            response.sendStatus(204)
        }
    }else{
        response.sendStatus(404)
    }
}catch(error){
    next(error)
}
})


//post new feedback

userRouter.post("/:userID/feedback",
async(request,response,next)=>{
    try{
        const user=await User.create(request.body)
       if(user){
        const feedback=await Feedback.create(request.body)
        user.addFeedback(feedback)
        await user.save()
        response.status(201).location(user.id).send()
       }else{
        response.sendStatus(404)
       }
       
       
    }catch(error){
        next(error)
    }
})


//get feedback by id from user by id
userRouter.get(
    "/:userID/feedback/:feedbackID",
    async (request, response, next) => {
      try {
        const user = await User.findByPk(request.params.userID);
        if (user) {
          const feedbacks = await user.getFeedback({
            where: { id: request.params.feedbackID },
          });
          const feedback = feedbacks.shift();  //select the first result from a array and return it as a json
          if (feedback) {
            response.json(feedback);
          } else {
            response.sendStatus(404);
          }
        } else {
          response.sendStatus(404);
        }
      } catch (error) {
        next(error);
      }
    }
  );


  //update feedback from user
  userRouter.put(
    "/:userID/feedback/:feedbackID",
    async (request, response, next) => {
        try {
          const user = await User.findByPk(request.params.userID);
          if (user) {
            const feedbacks = await user.getFeedback({
              where: { id: request.params.feedbackID },
            });
            const feedback = feedbacks.shift();  //select the first result from a array and return it as a json
            if (feedback) {
                await feedback.update(request.body)
              response.status(204)
            } else {
              response.sendStatus(404);
            }
          } else {
            response.sendStatus(404);
          }
        } catch (error) {
          next(error);
        }
      }
  );


  //delete feedback from user
  userRouter.delete(
    "/:userID/feedback/:feedbackID",
    async (request, response, next) => {
        try {
          const user = await User.findByPk(request.params.userID);
          if (user) {
            const feedbacks = await user.getFeedback({
              where: { id: request.params.feedbackID },
            });
            const feedback = feedbacks.shift();  //select the first result from a array and return it as a json
            if (feedback) {
                await feedback.destroy()
              response.status(204)
            } else {
              response.sendStatus(404);
            }
          } else {
            response.sendStatus(404);
          }
        } catch (error) {
          next(error);
        }
      }
  );

  export {userRouter as userRouter}