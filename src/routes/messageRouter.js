const express = require("express")
const messageController = require("../controllers/messageController")
const veriyToken = require("../middleware/verifyToken")
const routerMessage  = express.Router()

routerMessage.post('/create/:uuid', veriyToken,messageController.createMessage)
routerMessage.get('/getuser',messageController.getUser)
routerMessage.get('/getchats/:uuid', veriyToken, messageController.getAllChats)
routerMessage.get('/getMessage' ,veriyToken,messageController.getAllMessages)

module.exports = routerMessage
