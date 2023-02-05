const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config();

class TokenAuth{
    
    static TokenGenerator(data){
        const token=jwt.sign({
            data
              },
            process.env.JWT_KEY
            ,{
                expiresIn:'24h'
            }
           );
        return token;
    }
    static decodeToken(token){
       try{ 
           const data= jwt.verify(token ,process.env.JWT_KEY);
           return data;
    }
    catch(error){
            console.log(error);
            return res.status(404).json({error: 'Invalid Token'});
        }
    }
}

module.exports=TokenAuth;