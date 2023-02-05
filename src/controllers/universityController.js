const {University} = require("../models")

class universtyController{

    static async createUniversity(req,res){
        try {
            let {
                coverImg,
                gallery,
                universityName,
                summary,
                description,
                email,
                website,
                address,
                faculities
            } = req.body;
            const university = await University.create({
                coverImg,
                gallery,
                universityName,
                summary,
                description,
                email,
                website,
                address,
                faculities
            })
            return res.status(200).json({message:"university saved successfully",university})

        } catch (error) {
              
            return res.status(500).json({error:error.message})
        }
    }

    static async getAllUniversity(req,res){
        try {
             const universities = await University.findAll({
                    attributes:['uuid', 'universityName','coverImg','summary','status']
             })
             return res.status(200).json({message:"university retrieved",universities})
            
        } catch (error) {
             return res.staus(500).json({error:error.message})
        }
    }
    static async getOneuniversity(req,res){
        try {
            const uuid = req.params.uuid
            const university = await University.findOne({where:{uuid}})
            return res.status(200).json({message:"university retrieved",university})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
   static async deleteUniversity(req,res){
        try {
             const uuid = req.params.uuid
             const university = await University.findOne({where:{uuid}})
             await university.destroy()
             return res.status(200).json({message:"university deleted",university})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
   }

   static async updateUniversity(req,res){
        try {
            const uuid = req.params.uuid
            const {
                coverImg,
                gallery,
                universityName,
                summary,
                description,
                email,
                website,
                address,
                faculities
            } = req.body;

            const university = await University.findOne({where:{uuid}})
            await university.update({
                coverImg,
                gallery,
                universityName,
                summary,
                description,
                email,
                website,
                address,
                faculities
            })
            return res.status(200).json({message:"university updated",university})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }

}
module.exports = universtyController