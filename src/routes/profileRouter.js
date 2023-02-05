const express = require("express")
const {Profile} = require('../models')
const {User} = require('../models')
const {upload} = require("../utils/multer")
const cloudinary = require('../utils/cloudinary')
const profilePic = require("../controllers/profileController")
const verifyToken = require("../middleware/verifyToken")
const profileRouter = express()

profileRouter.post("/user",verifyToken,upload.single("images"), async(req,res)=>{
    try {
           const userUuid = req.user.uuid
           const user = await User.findOne({ where:{ uuid : userUuid} })
           const isProfile = await Profile.findOne({ where:{ userId : user.uuid } })
           if (isProfile) {
                const profile = await Profile.findOne({ where:{ userId : user.uuid } })
                await cloudinary.uploader.destroy(profile.cloudinary_id)
                await profile.destroy()
           }
           const result = await cloudinary.uploader.upload(req.file.path)
           const profile = await Profile.create({
           avatar: result.secure_url,
           cloudinary_id : result.public_id,
           userId:user.uuid
        })
         return res.status(200).json({message: "profile uploaded",profile})  
        }catch (error) {
         console.log(error);
         res.status(400).json({error: "bad request"})
     }
   })
profileRouter.delete("/delete/:uuid", profilePic.deleteProfile)
profileRouter.get("/get/:uuid", profilePic.getProfile)

module.exports = profileRouter