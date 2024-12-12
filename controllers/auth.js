const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validateUser} = require('../models/user')
const tokenGenerate = require('../middleweres/tokengenerate')

module.exports.register = async function(req,res,next){

    const {error} = validateUser(req.body);
    
    
   
    if(error){
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        })
    }
   try {

    let userdata = req.body;
    console.log("userdata",userdata)

    const isEmail = await UserModel.find({email:userdata.email});
    if(isEmail.length>0){
        return res.status(404).json({
            success: false,
            message: "Email is already registered"
        })
    }

    const user = new UserModel(userdata);
  user.password = await bcrypt.hash(user.password,10);

await user.save();

return res.status(201).json({
    success: true,
    message:"successfully user created"

})

   } catch (error) {
    console.log(error.message);

    return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message
    })
    
   }

}



module.exports.login = async function(req,res,next){


    try {
       const {email,password} = req.body;
       console.log("password",password)

    if(!email || !password){
       return res.status(400).json({
           success: false,
           message: "please enter email and password"
       })
    }
 
    const user = await UserModel.findOne({email:email});
    console.log("user",user)
    if(!user){
          return res.status(400).json({
           success: false,
           message: "email is not found"
       })
    }

    const isValidPassword = await bcrypt.compare(password,user.password);
    console.log("isValidPassword",isValidPassword)

    if(!isValidPassword){
       return res.status(400).json({
           success: false,
           message: "password does not match"
       })
    }

    let token = tokenGenerate(user)

    return res.status(200).json({
       success: true,
       message: "successfully login",
       token: token
       
    })
    } catch (error) {
       console.log(error.message);
       return res.status(500).json({
           success: false,
           message: "Something went wrong",
           
       })
       
    }

}
