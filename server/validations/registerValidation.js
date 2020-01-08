const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    firstName: Joi.string().max(20).required(),
    lastName: Joi.string().max(20).required(),
    userName: Joi.string().required(),
    password: Joi.string().required()
})


function registerValidation (req, res, next) {
    const { error } = userSchema.validate(req.body);
    if (error) return res.json({errMessage: error, status: false});
    next(); 
}


module.exports = registerValidation;

