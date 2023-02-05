const {User, sequelize} = require('../models');
const {Message} = require('../models');
const { Op }  = require('sequelize');

class messageController{
   static async getUser(req,res){
        try {
            const useruuid = req.user.uuid
            const user = await User.findOne({where:{ uuid: useruuid }})
            if(user){
             const username = user.username
             username.save()
             return res.status(200).json({message:"user found",user})
            }
        } catch (error) {
            
            return res.status(400).json({error:"user not found"})
        }
    }
    static async createMessage(req,res){
        try {
            const senderId = req.user.uuid;
            const receiverId = req.params.uuid;
            const sentMessage = req.body.messages;
            const message = await Message.create({
                senderId,
                receiverId,
                messages:sentMessage,
                time: new Date()
            })
            return res.status(200).json({message})
        } catch (error) {
            
            return res.status(404).json({error: "Something went wrong"})
        }
    }
    
    static async getAllMessages (req,res) {
        try {
            const userId = req.user.uuid;
            const [results] = await sequelize.query(`select * from messages
            where "id" in (
                select max("id") from messages
                group by least(
                    "senderId" = '978c41ac-4aee-4263-bffe-992561f1819c'
                )
            )`)
            return res.status(200).json({messages: results})    
        } catch (error) {
           
            return res.status(404).json({error:"error"})
        }
    }

    static async getAllChats(req,res){
        try {
            const useruuid = req.user.uuid
            const receiver = req.params.uuid
            const user = await User.findOne({where:{ uuid: useruuid }})
            if(user){
                const chats = await Message.findAll({ where:{[Op.or]:[
                    {senderId:user.uuid, receiverId: receiver},
                    {senderId: receiver, receiverId:user.uuid}
                ]}})
                return res.status(200).json({message:"chats got sucessfully",chats })
            }
            return res.status(404).json({error:"chats not found!"})
        } catch (error) {
            
            return res.status(400).json({error:"chats not found"})
        }
    } 
    static async deleteMessage(req,res){
         try {
             const uuid = req.params.uuid
             const message = await Message.findOne({where :{ uuid}})
             if(message){
                 await message.destroy()
                 return res.status(201).json({message:"message deleted successfully"})
             }
             
         } catch (error) {
             return res.status(400).json({error:"bad request"})
         }
    }

}
module.exports = messageController