const express = require("express");
const router = express.Router();
router.use("../routes/routes",router)

const userController = require('../controllers/user');
const feedbackController = require('../controllers/feedback');

// router.post("/register", userController.createUser);
// router.post("/login", userController.authUser);
// router.get("/user/:id", userController.getUserById);
// router.put("/user/:id/update", userController.modifyUser);
// router.put("/user/:id/enable", userController.enableUser);
// router.put("/user/:username/disable", userController.disableUser);
// router.post("/resetpassword", userController.resetPassword)
// router.put("/resetpassword/:email", userController.updatePassword)

router.post("/register",userController.insertUserIntoDB);
router.post("/login", userController.authUser);
router.get("/user/:id", userController.getUserFromDBById);
router.put("/user/:id/update", userController.updateUser);
router.put("/user/:username/disable", userController.deleteUser);
router.post("/resetpassword", userController.resetPassword)
router.put("/resetpassword/:email", userController.updatePassword)



// router.get("/feedback/getall", feedbackController.getAllFeedbacks);
// router.post("/user/:username/feedback", feedbackController.createFeedback);
// router.get("/user/:username/feedback", feedbackController.getFeedbacksByUsername);
// router.delete("/feedback/delete", feedbackController.deleteFeedback);
// router.put('/feedback/update', feedbackController.updateFeedback);
// router.get("/feedback/search/:type/:keyword", feedbackController.getFilteredFeedbacks);

router.get("/feedback/getall", feedbackController.getAllFeedbackFromDB);
router.post("/user/:username/feedback", feedbackController.insertFeedbackIntoDB);
router.delete("/feedback/delete", feedbackController.deleteFeedback);
router.get("/feedback/getid", feedbackController.getFeedbackById);
router.put('/feedback/update', feedbackController.updateFeedback);
router.get("/feedback/search/:type/:keyword", feedbackController.filterFeedback);

module.exports = router;