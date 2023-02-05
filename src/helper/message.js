const {Message} = require("../models");

const generateMessage = async()=>{
       const senderId =req.user.uuid;
       const receiverId =req.params.receiverId;
       const messages =req.body.messages;
       const time = new Date().getTime();
       const message = await Message.create({senderId,receiverId,messages,time})
       return message;
}
module.exports =  generateMessage;