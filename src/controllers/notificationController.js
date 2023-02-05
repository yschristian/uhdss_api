const {Notification} = require("../models")
// const {User} = require("../models")

class NotifiController{
   static async pushNotification(req,res){
        try {
            const userId = req.params.uuid
            const message = req.body.message
            const notification = await Notification.create({
                userId,
                message
            })
            return res.status(200).json({ message: "notification sent", notification })
        } catch (error) {
            
             return res.status(404).json({error:"notification not sent"})
        }
   }

   static async AllNotification(req,res){
        try {
            const notifications = await Notification.findAll()
            return res.status(200).json({message:"notifications found", notifications})
        } catch (error) {
            
            return res.status(404).json({error:"notifications not found"})
        }
    }

   static async UserNotification(req,res){
    try {
        const userId = req.params.uuid;
        const notifications = await Notification.findAll({ where: { userId } });
        return res.status(200).json({message: 'getting user notification', notifications});
    } catch (error) {
        
        return res.status(404).json({error: "fail to get user notification"});
    }
   }
}

module.exports = NotifiController