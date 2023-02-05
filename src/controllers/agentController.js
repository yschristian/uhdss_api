const {User} = require('../models');
const generatePassword = require("../helper/generatePassword");
const bcrypt = require('bcryptjs');
const sendEmail = require("../helper/transporter");
const {AgentRequest} = require("../models")

class agentController{
    static async createAgent(req, res){
        try {
           const uniqueId = Math.floor(Math.random()*900000) + 100000
           const emailToken = crypto.randomBytes(16).toString("hex");
           const unHashedPassword = generatePassword()
              const user = await  User.build({
                  username :req.body.username,
                  email :  req.body.email,
                  password : unHashedPassword,
                  role: req.body.role,
                  address : req.body.address,
                  emailToken : emailToken,
                  UniqueId: uniqueId,
                  isVerified: false 
               });
               const emailExists = await User.findOne({ where: { email: req.body.email, } });
               if (emailExists ) {
                return res.status(401).json({message: "Email already registered, Try another email"})
               }
               const salt = await bcrypt.genSaltSync(10);
               const hashDocPass = await bcrypt.hash(user.password, salt);
               user.password = hashDocPass;
               const token = await TokenAuth.TokenGenerator({user:user})
               await user.save()
               sendEmail({email:req.body.email,unHashedPassword,username:req.body.username,role:req.body.role},'createAgent')
               return res.status(200).json({message: "agent account created successfully!",token, user})
    
       } catch (error) {
           
           res.status(404).json({message: "something went wrong"})
           
       }
    
    }
    
    static async agentRequest(req,res){
            const emailExists = await AgentRequest.findOne({ where: { Email: req.body.Email, } });
            const emailUserExists = await User.findOne({ where: { email: req.body.Email } });
            if (emailExists || emailUserExists ) {
             return res.status(400).json({error: "Email already registered"})
            }
            const agent = await AgentRequest.create(req.body)
            const agentName ={
              email: agent.Email,
              name : agent.AgencyName
            }
            sendEmail(agentName,"request").catch(error=>{ console.log(error); })
            return res.status(200).json({message: "Request sent Successfully, we will let you know if you are taken",agent})
        
    }
    static async getAllAgentsRequest(req,res){
        try {
            const agents = await AgentRequest.findAll()
            return res.status(200).json({message: "agents fetched successfully",agents})
        } catch (error) {
            
            res.status(404).json({message: "something went wrong"})
            
        }
    }
    static async getAgent(req,res){
        try {
            const agent = await AgentRequest.findOne({where:{uuid:req.params.uuid}})
            return res.status(200).json({message: "agent fetched successfully",agent})
        } catch (error) {
           
            res.status(404).json({message: "something went wrong"})
            
        }
    }
    static async approveAgent(req,res){
        try {
        const agentDetails = await AgentRequest.findOne({where:{uuid:req.params.uuid}})
        if(agentDetails){
            const password = generatePassword();
            const uniqueId = Math.floor(Math.random()*900000) + 100000
            const salt = await bcrypt.genSaltSync(10);
            const hashDocPass = await bcrypt.hash(password, salt);
            
            const agent = await User.create({
                username :agentDetails.AgencyName,
                email :  agentDetails.Email,
                password : hashDocPass,
                role: "agent",
                address : agentDetails.AgencyLocationCountry,
                emailToken : null,
                UniqueId: uniqueId,
                isVerified: true
            })
            agentDetails.destroy()
            agent.save()
            sendEmail({username:agent.username,email:agent.email,password},"approve").catch(error=>{ console.log(error); })
            return res.status(200).json({message: "approved Successfully",agent}) 
        }
        return res.status(500).json({error: "keep waiting something went wrong"})
        } catch (error) {
            
            res.status(404).json({error: "something went wrong"})
            
        }
    }
    static async deleteAgent(req,res){
        try {
            const agent = await AgentRequest.destroy({where:{uuid:req.params.uuid}})
            return res.status(200).json({message: "agent deleted successfully",agent})
        } catch (error) {
            return res.status(404).json({error: error.message})
            
        }
    }
    static async updateAgent(req,res){
        try {
       const { AgencyName,AgencyPhoneNumber,AgencyLocationCountry,AgencyCity,Email } = req.body
       const uuid = req.params.uuid 
             
            const agent = await AgentRequest.findOne({where:{uuid:uuid}})
            agent.AgencyName = AgencyName,
            agent.AgencyPhoneNumber = AgencyPhoneNumber,
            agent.AgencyLocationCountry = AgencyLocationCountry,
            agent.AgencyCity= AgencyCity,
            agent.Email =Email
            await agent.save()
            return res.status(200).json({message: "agent updated successfully", agent})
        } catch (error) {
            return res.status(404).json({error: error.message})
        }
    }

}

module.exports = agentController