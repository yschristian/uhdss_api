const verifyAccess =(requireRole)=>{
 return async (req, res ,next)=>{
   try{
         const {role} = req.user;
        if(requireRole != role){
          return res.status(403).json({message: "role does not match"})
        }
        return next()
       }catch (error){
       console.log(error);
       return res.status(404).json({error:"role not found"})
    }
  }
}
module.exports = verifyAccess