import express from "express"
import { User} from "../models/userModel.js";
import{Feedback} from "../models/feedbackModel.js";


const userRouter=express.Router();
userRouter.get("/allUsers",async(request,response,next)=>{
    try{
        const user=await User.findAll()
        if(user.length>0){
            response.json(user)
        }else{
            response.sendStatus(204)
        }
    }catch(error){
        next(error)
    }

    
  // try{
  //   const users=await User.findAll()  //array of objects
  //   return response.status(200).json(users);
  // }catch(err){
  //     response.status(500).json(err);
  // }
})

userRouter.get("/:userId",async(request,response)=>{
  console.log("here 1 GET")
  try{
      const user=await User.findByPk(request.params.userId)
      response.json(user)
      return response.status(204).send()
  }catch(error){
      return response.status(500).send();
  }
})

//get all feedbacks
userRouter.get("/feedbacks",async(request,response,next)=>{
  try{
      const feedback=await Feedback.findAll()
      if(feedback.length>0){
          response.json(feedback)
          return response.status(204).send()
      }else{
          return response.status(500).send();
      }
  }catch(error){
      next(error)
  }

  
// try{
//   const users=await User.findAll()  //array of objects
//   return response.status(200).json(users);
// }catch(err){
//     response.status(500).json(err);
// }
})


//creates the user alone
userRouter.post("/addUsers", async(request,response,next)=>{
    try{
    const user= await User.create(request.body)
    response.status(201).location(user.id).send()
    }catch(error){
        next(error)
    }

})


//update user
userRouter.put("/:userId", async(request,response,next)=>{
  console.log("here")
    try{
        const user= await User.findByPk(request.params.userId)
        if(user){

         await user.update(request.body)
         response.status(202).json()
        
        }else{
          response.status(404).json()  
        }
      }catch(err){
        next(err)
      }
})




//delete user - merge

userRouter.delete("/:userid", async(request,response,next)=>{
    try{
        const user= await User.findByPk(request.params.userid)
        if(user){
          // const feedbacks= await Feedback.findAll()
          await user.destroy()
          console.log("destroyed")
           response.sendStatus(204)
        }else{
          response.sendStatus(404)
        }
        
      }catch(err){
        console.log("ceva")
        next(err)
      }
})


// specific user's feedback list
userRouter.get("/:userId/feedbacks",
async (request, response)=>{
try{
    const user=await User.findByPk(request.params.userId)
    if(user){
        const feedbacks=await user.getFeedbacks() //problema
            response.json(feedbacks)
            response.sendStatus(204)
      
    }else{
      return response.status(404).send()
    }
}catch(error){
  return response.status(500).send();
}
})




//post new feedback into user
userRouter.post("/:userId/addFeedback",
async(request,response,next)=>{
    try{
        const user=await User.findByPk(request.params.userId);
       if(user){
        const feedback=await Feedback.create(request.body)
        user.addFeedback(feedback)
        await user.save()
        response.status(201).location(user.id).send()
       }else{
        return response.status(404).send()
       }
       
       
    }catch(error){
        next(error)
    }
})




//get feedback by id from user by id
userRouter.get(
    "/:userId/feedbacks/:feedbackId",
    async (request, response, next) => {
      try {
        const user = await User.findByPk(request.params.userId);
        if (user) {
          const feedbacks = await user.getFeedbacks({
            where: { id: request.params.feedbackId },
          });
          const feedback = feedbacks.shift();  //select the first result from a array and return it as a json
          if (feedback) {
            response.json(feedback);
          } else {
            return response.status(204).send()
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
    "/:userid/feedbacks/:feedbackid",
    async (request, response, next) => {
        try {
          const user = await User.findByPk(request.params.userid);
          if (user) {
            const feedbacks = await user.getFeedbacks({
              where: { id: request.params.feedbackid },
            });
            const feedback = feedbacks.shift();  //select the first result from a array and return it as a json
            if (feedback) {
                await feedback.update(request.body)
                return response.status(204).send()
            } else {
              return response.status(404).send()
            }
          } else {
            return response.status(404).send()
          }
        } catch (error) {
          next(error);
        }
      }
  );


  //delete feedback from user 
  userRouter.delete(
    "/:userId/feedbacks/:feedbackId",
    async (request, response, next) => {
        try {
          const user = await User.findByPk(request.params.userId);
          if (user) {
            const feedbacks = await user.getFeedbacks({
              where: { id: request.params.feedbackId },
            });
            const feedback = feedbacks.shift();  //select the first result from a array and return it as a json
            if (feedback) {
                await feedback.destroy()
                return response.status(204).send()
            } else {
              return response.status(404).send()
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