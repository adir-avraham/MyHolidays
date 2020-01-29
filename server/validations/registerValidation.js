const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    userName: Joi.string().email().required(),
    password: Joi.string().min(4).required()
})


function registerValidation (req, res, next) {
    const { error } = userSchema.validate(req.body);
    if (error) return res.json({errMessage: error, status: false});
    next(); 
}


module.exports = registerValidation;

