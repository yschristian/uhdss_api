const { Profile } = require("../models")
const { User } = require("../models")
const cloudinary = require("../utils/cloudinary")

class profilePic{
    static deleteProfile = async(req,res)=>{
            try {
                   const uuid = req.params.uuid
                   const profile = await Profile.findOne({ where:{ uuid } })
                   await cloudinary.uploader.destroy(profile.cloudinary_id)
                   await profile.destroy()
                   return res.status(200).json({ message:"Profile deleted successfully" })  
            }catch (error){
                
                 return res.status(500).json({error:"server error"  })
        }
     }
     static getProfile = async (req,res)=>{
        try {
            const uuid = req.params.uuid
            const profile = await Profile.findOne({ where:{uuid}})
            return res.status(200).json({ message:"profile ",profile })
           }catch (error) {
           return res.status(404).json({error:"error"})
          }
    }
    static getuserprofile = async(req,res)=>{
        const userId = req.params.userId;
         try {
            const profile = await Profile.findOne({ where: { userId } })
            return res.status(200).json({ message:"profile ", profile })
         } catch (error) {
             
             return res.status(500).json({error:"server error"})
         }
    }
}
module.exports = profilePic