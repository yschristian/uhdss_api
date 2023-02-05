const express = require('express');
const studentController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const authSchema = require("../helper/validate");
const validate = require("../middleware/validateinput");
const verifyEmail = require("../middleware/verifyEmail");
const studentRouter = express();

studentRouter.post('/createStudent',validate(authSchema), studentController.createStudent);
studentRouter.post('/loginUser',verifyEmail, studentController.loginUser);
studentRouter.get('/refresh', verifyToken, studentController.refreshTokens);
studentRouter.get('/getAllUser', studentController.getAllUser)
studentRouter.get('/getuser/:uuid',studentController.getUserById)
studentRouter.delete('/deleteUser/:uuid',studentController.deleteUser)
studentRouter.put("/updateUser/:uuid",studentController.updateUser)
studentRouter.get('/verify-email/:token',studentController.emailVerification)
studentRouter.post("/forgotPassword",studentController.forgotPassword)
studentRouter.post("/resetPassword/:token",studentController.resetPassword)

module.exports = studentRouter;