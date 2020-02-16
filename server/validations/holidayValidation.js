const Joi = require('@hapi/joi');

const holidaySchema = Joi.object({
    destination: Joi.string().min(2).max(25).required().messages({
        'string.empty': 'Please enter destination'
    }),   
    start_date: Joi.date().greater('now').required(),   
    end_date: Joi.date().greater(Joi.ref('start_date')).required(),
    price: Joi.number().integer().required(),   
    picture: Joi.string().required().messages({
        'string.empty': 'Please enter your picture url'
    })
}).options({ abortEarly: false });


function holidayValidation (req, res, next) {
    const { error } = holidaySchema.validate(req.body);
    if (error) return res.json({errMessage: error.details, status: false});
    next(); 
};


module.exports = holidayValidation;