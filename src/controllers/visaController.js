const {Visa} = require("../models")
const cloudinary = require("../utils/cloudinary")
class visaController{

    static async createVisa(req,res){
        try {
    const {fullName,countryOfLocation,typeOfVisa,countryOfInterest,passport,photoImage,invitationLetter,admissionLetter,financialSupport,hotelBooking,flightTickets, travelPurpose, otherDocuments} = req.body
    const visa = await Visa.create({fullName,countryOfLocation,typeOfVisa,countryOfInterest,passport,photoImage,invitationLetter,admissionLetter,financialSupport,hotelBooking,flightTickets, travelPurpose, otherDocuments})
    return res.status(200).json({message:"visa applied!! ",visa})
        } catch (error) {
            return res.status(400).json({ error: "bad request" })
        }
    }

    static async uploadFile(req, res){
        try {
            const file = req.files.file[0].path;
            const link = await cloudinary.uploader.upload(file)
           return res.status(200).json({ message: "file uploaded", link:link.secure_url
            })
        } catch (error) {
            return res.status(404).json({error:error.message})
        }
       }

    static async getAllVisa(req,res){
        try {
            const visa = await Visa.findAll()
            if(visa){
                return res.status(200).json({message:"visa got sucessfully",visa })
            }
            return res.status(404).json({message:"visa not found!"})
        } catch (error) {
            return res.status(404).json({error:"visa not found!"})
        }
    }

    static async getVisaById(req,res){
        try {
            const uuid = req.params.uuid;
            const visa = await Visa.findOne( {where: { uuid }})
            return res.status(200).json(visa)
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
    
    static async deleteVisa(req,res){
        try {
            const uuid = req.params.uuid;
            const visa = await Visa.findOne({where : { uuid }})
            await visa.destroy()
            return res.status(200).json({message:"visa deleted successfully"})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }

    static async updateVisa(req,res){
        try {
            const uuid = req.params.uuid
            const {
                fullName,
                countryOfLocation,
                typeOfVisa,
                countryOfInterest,
                passport,
                photoImage,
                invitationLetter,
                admissionLetter,
                financialSupport,
                hotelBooking,
                flightTickets} = req.body
            const visa = await Visa.findOne({ where:{ uuid }})
                visa.fullName=fullName,
                visa.countryOfLocation=countryOfLocation,
                visa.typeOfVisa=typeOfVisa,
                visa.countryOfInterest=countryOfInterest,
                visa.passport=passport,
                visa.photoImage=photoImage,
                visa.invitationLetter=invitationLetter,
                visa.admissionLetter=admissionLetter,
                visa.financialSupport=financialSupport,
                visa.hotelBooking=hotelBooking,
                visa.flightTickets=flightTickets
                await visa.save()
                return res.status(200).json({message:"visa updated"})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
}

module.exports = visaController