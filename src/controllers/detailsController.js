const { Details } = require("../models")
const {User }= require('../models')
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const cloudinary = require("../utils/cloudinary")
const sendEmail = require("../helper/transporter");

class detailsController {

    static async createDetail(req,res) {
        try {
            const userUuid = req.user.uuid
            let {
                FirstName,
                LastName,
                Gender,
                EnglishProficiency,
                Recommandation,
                Nationality,
                WhatsapNumber,
                CallNumber,
                CountryToStudy,
                EducationDegree,
                UniverstyToStudy,
                Passport,
                Transcript,
                Diploma
            } = req.body;
            const user = await User.findOne({ where:{ uuid : userUuid} })
            console.log('auth user: ', user)
        
            const detail = await Details.create({
                userId:user.uuid,
                FirstName,
                LastName,
                Status: "pending",
                Gender,
                EnglishProficiency,
                Recommandation,
                Nationality,
                WhatsapNumber,
                CallNumber,
                CountryToStudy,
                EducationDegree,
                UniverstyToStudy,
                Passport,
                Transcript,
                Diploma
            });
            const userEmail={
                username: user.username,
                email :user.email,
                UniqueId: detail.UniqueId
            }
            sendEmail(userEmail,"submitDetails")
            return res.status(200).json({ message:"Information sent successsfuly",detail })  
    } catch(error){
        console.log(error)
        return res.status(400).json({ error: "bad request" })
        }
    }
    
   static async search(req,res){
       const details = await Details.findAll()
       const march = {}
       if(req.query.UniqueId){
         march.UniqueId = req.query.UniqueId === `${details.UniqueId}`
       }else{
           console.log("does not match");
       }
       try {
        const details = await Details.findOne( Op.march )
        if(!details){
            return res.status(404).json({error:"error"})
        }
        
        return res.status(200).json(details)
       } catch (error) {
           
           return res.status(404).json({error:"sonething went wrong"})
       }
   }

   static async uploadFile(req, res){
    try {
        const file = req.files.file[0].path;
        const link = await cloudinary.uploader.upload(file)
       return res.status(200).json({ message: "file uploaded", link:link.secure_url
        })
    } catch (error) {
        return res.status(404).json({error})
    }
   }

   static async getDetails(req,res){
       try {
        const uuid = req.params.uuid;
        const  details = await Details.findOne( {where: { uuid }})
        if(details){
            return res.status(200).json(details)
        }
        return res.status(404).json({error:"Information not found!"})
       } catch (error) {
           return res.status(404).json({error:"Information not found!"})
           
       }
   }

   static async getAllDetails(req,res){
    try {
     const details = await Details.findAll({include: [{model: User ,as : 'user' }]})
     if(details){
         return res.status(200).json({message:"information got sucessfully",details })
     }
     return res.status(404).json({message:"Information not found!"})
    } catch (error) {
        console.log(error)
        return res.status(404).json({error:"Information not found!"})
        
    }
}
    static async userDetails(req,res){
        try {
            const uuid = req.params.uuid;
            const user = await User.findOne({where: { uuid }})
            if(user){
                const details = await Details.findAll({where: { userId: user.uuid }})
                if(details){
                    return res.status(200).json({message:"information got sucessfully",details })
                }
                return res.status(404).json({message:"Information not found!"})
            }
            return res.status(404).json({message:"Information not found!"})
        } catch (error) {
            return res.status(404).json({error:"Information not found!"})
        }
    }
   static async detleteDetails(req,res){
         try {
               const uuid = req.params.uuid
               const details = await Details.findOne({where:{uuid}})
               await details.destroy()
               return res.status(200).json({message:"details deleted",details})

         } catch (error) {
             return res.status(404).json({error:"something went wrong"})
         }
   }

   static async AdmitRejectDetail(req, res) {
    try {
        const uuid = req.params.uuid
        const { status } = req.body;
        const detail = await Details.findOne({ where: {uuid} });
        if (detail) {
            await Details.update({ Status: status }, { where : { uuid } })
            return res.status(200).json({
                message: `application ${status} successfully`,
            })
        }
        return res.status(404).json({ error: "application not found in database"})
    } catch (error) {
        return res.status(500).json({error})
    }
   }

   static async updateDetails(req,res){
    try {
        const uuid = req.params.uuid
        const {
            FirstName,
            LastName,
            Gender,
            EnglishProficiency,
            Recommandation,
            Nationality,
            WhatsapNumber,
            CallNumber,
            CountryToStudy,
            EducationDegree,
            UniverstyToStudy,
            Passport,
            Transcript,
            Diploma
            }= req.body
            const detail = await findOne({where:{uuid:uuid}})
                detail.FirstName=FirstName,
                detail.LastName = LastName,
                detail.Gender=Gender,
                detail.EnglishProficiency=EnglishProficiency,
                detail.Recommandation = Recommandation,
                detail.Nationality = Nationality,
                detail.WhatsapNumber = WhatsapNumber,
                detail.CallNumber = CallNumber,
                detail.CountryToStudy = CountryToStudy,
                detail.EducationDegree =EducationDegree ,
                detail.UniverstyToStudy = UniverstyToStudy,
                detail.Passport = Passport,
                detail.Transcript = Transcript,
                detail.Diploma =Diploma
                await detail.save()
                return res.status(200).json({message: "user updated successfully", detail})

    } catch (error) {
        return res.status(404).json({error: error.message})
    }
   }
}
module.exports = detailsController