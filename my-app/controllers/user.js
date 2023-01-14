import { Op } from "sequelize";
import { Feedback } from "../models/feedback.js";
import { User } from "../models/user.js";
import { authUser } from "../service/user.js";
import { updatePassword } from "../service/user.js";

const insertUserIntoDB=async(req,res)=>{
    try{
      const user=req.body;
      await User.create(user)
      res.status(200).json('Object has been added to DB')

    }catch(err){
      return res.status(500).json(err)
    }
}

const getAllUsersFromDB=async(req,res)=>{

  try{
    const user=await User.findAll()  
    return res.status(200).json(user);
  }catch(err){
      res.status(500).json(err);
  }
}

const getUserFromDBById=async(req,res)=>{
  try{
const user= await User.findByPk(req.params.userId)
if(user){
   return res.status(200).json(user)
}else{
return res.status(404).json({error: "USER with specified id does not exist"})
}
  }catch(err){
    res.status(500).json(err)
  }
}

const updateUser=async(req,res)=>{

  try{
    const user= await User.findByPk(req.params.userId)
    if(movie){
      const user=await movie.update(req.body)
      return res.status(200).json(user)
    }else{
      return res
      .status(500)
      .json({error: ""})
    }
  }catch(err){
    res.status(500).json(err)
  }
}

const deleteUser=async(req,res)=>{
  try{
    const user= await User.findByPk(req.params.userId)
    if(user){
      await user.destroy()
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



// ------------------------------------------------------------------------------------------------
const authUser = async(req, res, ) => {
    try {
        const user = req.body;
        console.log(user);
        const responseUser = await User.authUser(user.username, user.password);
        console.log(responseUser.isEnabled);
        if (user.username === responseUser.username) {
            if (responseUser.isEnabled) {
                res.status(200).json({
                    message: 'user auth succesfull',
                    disabled: false
                });
            }
            else {
                res.status(200).json({
                    message: 'user is disabled',
                    disabled: true
                })
            }
        }
    }
    catch (err) {
        response.status(404).json({
            message: 'user not found' + err.message
        });
    }
}

const resetPassword = async(req,res) => {
    try {
        const email = req.body.email;

        const randomCode = await User.reset(email);

        res.status(200).json({
            code: randomCode
        });
    }
    catch (err) {
        res.status(400).json({
            message: "could not send email" + err.message
        });
    }
}

const updatePassword = async(req,res) => {
    try {
        const email = req.params.email;
        const newPassword = req.body.newPassword;

        await User.updatePassword(email, newPassword);

        res.status(200).json({
            message: "password updated"
        });
    }
    catch (err) {
        res.status(400).json({
            message: "could not reset password " + err.message
        })
    }
}


module.exports={
    insertUserIntoDB,
    getAllUsersFromDB,
    getUserFromDBById,
    updateUser,
    deleteUser,
    authUser,
    resetPassword,
    updatePassword
}


// const createUser = async(request, response, next) => {
//     const user = request.body;
//     if (user.username && user.email && user.password) {
//         const result = await userService.create(user);
//         response.status(201).send({
//             message: 'User added successfully'
//         });
//     }
//     else {
//         response.status(400).send({
//             message: 'Invalid user payload.'
//         });
//     }
// }

// const getUserById = async(request, response, next) => {
//     try {
//         const id = request.params.id;
//         if (id) {
//             try {
//                 const user = await userService.getById(id);
//                 response.status(200).send(user);
//             }
//             catch (err) {
//                 response.status(500).send({
//                     message: 'Error occured' + err.message
//                 });
//             }
//         }
//         else {
//             response.status(400).send({
//                 message: 'No id specified'
//             })
//         }
//     }
//     catch (err) {
//         response.status(500).send({
//             message: 'Error occured' + err.message
//         })
//     }
// }

// const disableUser = async(request, response, next) => {
//     try {
//         const username = request.params.username;
//         const user = await userService.disable(username);

//         response.status(200).json({
//             message: `user with email address ${user.email} has been disabled`
//         });
//     }
//     catch (err) {
//         response.status(404).json({
//             message: 'id not found'
//         });
//     }
// }

// const enableUser = async(request, response, next) => {
//     try {
//         const username = request.params.username;
//         const user = await userService.enable(username);

//         response.status(200).json({
//             message: `user with email address ${user.email} has been enabled`
//         });
//     }
//     catch (err) {
//         response.status(404).json({
//             message: 'id not found'
//         });
//     }
// }

// const modifyUser = async(request, response, next) => {
//     try {
//         await userService.update(request.body);

//         response.status(200).json({
//             message: `password updated successfully`
//         });
//     }
//     catch (err) {
//         response.status(404).json({
//             message: 'user not found' + err.message
//         });
//     }
// }

// const authUser = async(request, response, next) => {
//     try {
//         const user = request.body;
//         console.log(user);
//         const responseUser = await userService.authUser(user.username, user.password);
//         console.log(responseUser.isEnabled);
//         if (user.username === responseUser.username) {
//             if (responseUser.isEnabled) {
//                 response.status(200).json({
//                     message: 'user auth succesfull',
//                     disabled: false
//                 });
//             }
//             else {
//                 response.status(200).json({
//                     message: 'user is disabled',
//                     disabled: true
//                 })
//             }
//         }
//     }
//     catch (err) {
//         response.status(404).json({
//             message: 'user not found' + err.message
//         });
//     }
// }

// const resetPassword = async(request, response, next) => {
//     try {
//         const email = request.body.email;

//         const randomCode = await userService.reset(email);

//         response.status(200).json({
//             code: randomCode
//         });
//     }
//     catch (err) {
//         response.status(400).json({
//             message: "could not send email" + err.message
//         });
//     }
// }

// const updatePassword = async(request, response, next) => {
//     try {
//         const email = request.params.email;
//         const newPassword = request.body.newPassword;

//         await userService.updatePassword(email, newPassword);

//         response.status(200).json({
//             message: "password updated"
//         });
//     }
//     catch (err) {
//         response.status(400).json({
//             message: "could not reset password " + err.message
//         })
//     }
// }

// module.exports = {
//     createUser,
//     getUserById,
//     enableUser,
//     disableUser,
//     modifyUser,
//     authUser,
//     resetPassword,
//     updatePassword
// }

