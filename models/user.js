const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi')


const UserModel = new mongoose.Schema({
    name: {
        type:String,
        require:true,

    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,

    },
   role: {
    type: String,
    enum:['user','admin'],
    default:'user'
   },

},
{
    timestamps:true
})

module.exports = mongoose.model('User',UserModel);






const validateUser = (userData) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.base': 'Name must be a string',
                'string.empty': 'Name is required',
                'string.min': 'Name must be at least 3 characters long',
                'string.max': 'Name must not exceed 30 characters',
                'any.required': 'Name is required',
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please enter a valid email address',
                'string.empty': 'Email is required',
                'any.required': 'Email is required',
            }),
        password: Joi.string()
            .min(6)
            .required()
            .messages({
                'string.base': 'Password must be a string',
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 6 characters long',
                'any.required': 'Password is required',
            }),
            role: Joi.string()
            .valid('user', 'admin')
            .required()
            .messages({
                'string.base': 'Role must be a string',
                'any.only': 'Role must be either "user" or "admin"',
                'string.empty': 'Role is required',
                'any.required': 'Role is required',
            }),
    });

    return schema.validate(userData);
};

module.exports.validateUser = validateUser 
