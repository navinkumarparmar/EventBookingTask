module.exports.checkRole =  function(allowedRollers){


    return (req,res,next)=>{
        try {
            const userRole = req.user
            console.log("userRole",userRole)

            if(!allowedRollers.includes(userRole.role)){
              return res.status(403).json({
                  success: false,
                  message: "Access denied. You do not have permission to perform this action.",
              });
      
            }
      
              next();
      
          }
         catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });

            
        }

     



    }





}