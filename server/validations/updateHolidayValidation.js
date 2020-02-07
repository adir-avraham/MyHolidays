const Joi = require('@hapi/joi');

const holidaySchema = Joi.object({
    destination: Joi.string().min(2).max(25).required(),
    start_date: Joi.date().greater('now').required(),
    end_date: Joi.date().greater(Joi.ref('start_date')).required(),
    price: Joi.number().integer().required(),
    picture: Joi.string().required(),
    id: Joi.number().required(),
})


function holidayValidation (req, res, next) {
    const { error } = holidaySchema.validate(req.body);
    if (error) return res.json({errMessage: error, status: false});
    next(); 
}


module.exports = holidayValidation;