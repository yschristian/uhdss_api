const express = require("express")
const NotifiController = require("../controllers/notificationController")
const notificRouter = express()


notificRouter.post("/push/:uuid",NotifiController.pushNotification)
notificRouter.get("/user/:uuid", NotifiController.UserNotification)
notificRouter.get("/all", NotifiController.AllNotification)
module.exports = notificRouter