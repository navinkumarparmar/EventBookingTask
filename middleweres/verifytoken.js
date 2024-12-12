
const jwt = require('jsonwebtoken');
const secretKey = process.env.jwtSecretKey

module.exports.verifyToken = async function(req,res,next){


    try {

        const token = req.headers['authorization'];

        if(!token){
            return res.status(400).json({
                success: false,
                message: "please provide token"
            })
        }
    
        console.log("token",token)
        const verified = jwt.verify(token,secretKey);
       
 
         if(!verified){
            return res.status(400).json({
                success: false,
                message: "Token essxpried"
            })
         }
    
        
    
        req.user = verified
        next();
    
    
        
    } catch (error) {

        if(error.name === 'TokenExpiredError' ){
            return res.status(500).json({
                            success: false,
                            message: "Token expired",
                            // error: error.message
                        });
            
        }else if(error.name === 'JsonWebTokenError'){
            return res.status(500).json({
                success: false,
                message: "Invalid Token",
                // error: error.message
            });

        }

          
  return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });



}
}



