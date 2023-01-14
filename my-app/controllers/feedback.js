import { Op } from "sequelize";
import { Feedback } from "../models/feedback.js";


const insertFeedbackIntoDB=async(req,res)=>{
    try{
      const recieveFeedback=req.body;
      await Feedback.create(recieveFeedback)
      res.status(200).json('Object has been added to DB')

    }catch(err){
      return res.status(500).json(err)
    }
}

const getAllFeedbackFromDB=async(req,res)=>{

    try{
      const feedback=await Feedback.findAll() 
      return res.status(200).json(feedback);
    }catch(err){
        res.status(500).json(err);
    }
  }
  
  const getFeedbackById=async(req,res)=>{
    try{
  const feedback= await Feedback.findByPk(req.params.feedbackID)
  if(feedback){
     return res.status(200).json(feedback)
  }else{
  return res.status(404).json({error: "The specified element does not exist"})
  }
    }catch(err){
      res.status(500).json(err)
    }
  }
  
  const updateFeedback=async(req,res)=>{
  
    try{
      const feedback= await Feedback.findByPk(req.params.feedbackID)
      if(feedback){
        const updatedFeedback=await feedback.update(req.body)
        return res.status(200).json(updatedFeedback)
      }else{
        return res
        .status(500)
        .json({error: ""})
      }
    }catch(err){
      res.status(500).json(err)
    }
  }
  
  const deleteFeedback=async(req,res)=>{
    try{
      const feedback= await Feedback.findByPk(req.params.feedbackID)
      if(feedback){
        await feedback.destroy()
        return res.status(200).json("entity deleted succesfully")
      }else{
        return res
        .status(500)
        .json({error: "entity was not deleted"})
      }
      
    }catch(err){
      res.status(500).json(err)
    }
  }
  
  const filterFeedback=async(req,res)=>{
    try{
    //    const minYear=req.query.minYear;
    //    const filteredMovies=await Movie.findAll({
    //     where: minYear? {year:{ [Op.gte]:minYear }} :undefined

        const type = req.params.type;
        const keyword = req.params.keyword;
        const feedback = await Feedback.filter(type, keyword);

        res.status(200).json(feedback);
    }
        catch (err) {
        res.status(404).send(err.message);
    }

}
  

  // const getFilteredFeedbacks = async(req, res, next) => {
//     try {
//         const type = req.params.type;
//         const keyword = req.params.keyword;
//         const feedbacks = await feedbackService.filter(type, keyword);

//         res.status(200).json(feedbacks);
//     }
//     catch (err) {
//         res.status(404).send(err.message);
//     }
// }
  
 




// const updateFeedback = async(req, res, next) => {
//     try {
//         console.log(req.body);
//         await feedbackService.update(req.body);

//         res.status(200).send('feedback updated successfully');
//     }
//     catch (err) {
//         res.status(404).send(err.message);
//     }
// }

// const getAllFeedbacks = async(req, res, next) => {
//     try {
//         const feedbacks = await feedbackService.getAll();
//         res.status(200).send(feedbacks);
//     }
//     catch (err) {
//         res.status(500).send({
//             message: `Error: ${err.message}`
//         });
//     }
// }

// const getFeedbacksByUsername = async(req, res, next) => {
//     try {
//         const username = req.params.username;
//         const feedbacks = await feedbackService.getByUsername(username);
//         res.status(200).send(feedbacks);
//     }
//     catch (err) {
//         res.status(500).send({
//             message: `Error: ${err.message}`
//         })
//     }
// }

// const deleteFeedback = async(req, res, next) => {
//     try {
//         const feedbackId = req.params.id;
//         console.log(feedbackId);
//         await feedbackService.delete(feedbackId);

//         res.status(200).send('Click dreapta delete');
//     }
//     catch (err) {
//         res.status(500).send({
//             message: `Error: ${err.message}`
//         })
//     }
// }

// const getFilteredFeedbacks = async(req, res, next) => {
//     try {
//         const type = req.params.type;
//         const keyword = req.params.keyword;
//         const feedbacks = await feedbackService.filter(type, keyword);

//         res.status(200).json(feedbacks);
//     }
//     catch (err) {
//         res.status(404).send(err.message);
//     }
// }


// module.exports = {
//     createFeedback,
//     getAllFeedbacks,
//     getFeedbacksByUsername,
//     updateFeedback,
//     getFilteredFeedbacks,
//     deleteFeedback
// }

module.exports={
    insertFeedbackIntoDB,
    getAllFeedbackFromDB,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
    filterFeedback,


}