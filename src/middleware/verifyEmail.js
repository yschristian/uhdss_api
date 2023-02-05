const {User} = require("../models")
const  verifyEmail = async(req,res,next)=>{
    try {
        const user = await User.findOne({ where: {email:req.body.email} })
        if(user.isVerified){
            next()
        }else{
            res.status(201).json({message:"please check your email to verify account"})
        }
       } catch (error) {
        return res.status(500).json({error: "user credentials not found"})
    }
}
module.exports = verifyEmail