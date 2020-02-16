const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(20).required().messages({
        'string.empty': 'Please enter your firstName'
    }),
    lastName: Joi.string().min(2).max(20).required().messages({
        'string.empty': 'Please enter your lastName'
    }),
    userName: Joi.string().email().required().messages({
        'string.empty': 'Please enter your userName'
    }),
    password: Joi.string().min(4).required().messages({
        'string.empty': 'Please enter your password'
    }),   
}).options({ abortEarly: false });


function registerValidation (req, res, next) {
    const { error } = userSchema.validate(req.body);
    if (error) return res.json({errMessage: error.details, status: false});
    next(); 
};


module.exports = registerValidation;