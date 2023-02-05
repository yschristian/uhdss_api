const TokenAuth = require("../helper/AuthToken")
const {User} = require("../models")

const veriyToken = async(req,res,next) =>{
 try {
     const token = req.headers.authorization
     if(!token) {
        return res.status(403).json({message:"A token is required for authentication"});
      }
      const data = TokenAuth.decodeToken(token)
      const {name} = data
      if(name ==="jsonWebTokenError"){
          return res.status(403).json({error:"invalid token"})
      }
      if (name==="TokenExpiredError"){
        return res.status(400).json({error:"JWT token is expired"})
      }
      req.user = data.data.user
      next()
 } catch (error) {
     console.log(error);
     return res.status(404).json({error:"token required"})
  }
}

module.exports = veriyToken