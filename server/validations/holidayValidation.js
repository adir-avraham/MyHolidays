const Joi = require('@hapi/joi');

const holidaySchema = Joi.object({
    destination: Joi.string().min(2).max(25).required().messages({
        'string.empty': 'please enter destination'
    }),   
    start_date: Joi.date().greater('now').required().required().messages({
        'date.greater': 'start_date must be later than today'
    }),      
    end_date: Joi.date().greater(Joi.ref('start_date')).required().messages({
        'date.greater': 'end_date must be later than start date'
    }),      
    price: Joi.number().integer().required(),   
    picture: Joi.string().required().messages({
        'string.empty': 'please enter your picture url'
    })
}).options({ abortEarly: false });


function holidayValidation (req, res, next) {
    const { error } = holidaySchema.validate(req.body);
    if (error) return res.json({errMessage: error.details, status: false});
    next(); 
};


module.exports = holidayValidation;