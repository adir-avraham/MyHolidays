const Joi = require('@hapi/joi');

const holidaySchema = Joi.object({
    destination: Joi.string().max(25).required(),
    from: Joi.date().greater('now').required(),
    to: Joi.date().greater(Joi.ref('from')).required(),
    price: Joi.number().integer().required(),
    picture: Joi.string().required(),
    id: Joi.number().required(),
})


function holidayValidation (req, res, next) {
 //   console.log("from validation update", req.body)
    const { error } = holidaySchema.validate(req.body);
    if (error) return res.json({errMessage: error, redirectValidation: false});
    next(); 
}


module.exports = holidayValidation;