const jwt = require('jsonwebtoken');
const secretKey = process.env.jwtSecretKey


function tokenGenerate(user){


    const payload = {
        id :user._id,
        email: user.email,
        role:user.role 
    }

    return jwt.sign(payload,secretKey,{
        expiresIn:'7h'
    })
}

module.exports = tokenGenerate;

