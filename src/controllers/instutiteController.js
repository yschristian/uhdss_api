const {University: Institution} = require("../models")

class instituteController {
       
     static async createInstitution(req, res) {
        try {
        const {name, country, city, streeAddress, website, email, availableProgram, scholarship} = req.body
        const institution = await Institution.create({name, country, city, streeAddress, website, email, availableProgram, scholarship})
        return res.status(201).json({message: "institution created successfully", institution})
        } catch (error) {
             
             return res.status(404).json({error: "something went wrong"})
        }
     }
     static async getInstitutes(req,res){
        try {
            const institution = await Institution.findAll()
            return res.status(200).json({message: "institution  found successfully", institution})
     }catch(error){
        console.log(error)
        return res.status(400).json({error: "bad request"}) 
     } 
 } 
    static async getInstituteById(req,res){
        try {
            const uuid = req.params.uuid
            const institution = await Institution.findOne({where:{uuid}})
            return res.status(200).json(institution)
           } catch (error) {
             
             return res.status(400).json({error: "bad request"}) 
        }
    }
    static async deleteInstitute(req,res){
       try {
            const uuid =  req.params.uuid
            const institution = await Institution.findOne({ where:{uuid} })
            await institution.destroy()
            return res.status(200).json({message: " institution deleted successfully"})
       } catch (error) {
           
           return res.status(500).json({error:"server error"})
       }

    }
}
module.exports = instituteController