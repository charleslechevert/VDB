const Joi = require('joi')



const schemaUser = Joi.object({
    fname: Joi.string(),
    lname: Joi.string(),
    email: Joi.string().email(),
    companyrole: Joi.string()
}).required().min(4);

const schemaTrip = Joi.object({
    type_trip : Joi.string(),
    boat : Joi.string(),
    harbour : Joi.string(),
    departure : Joi.string().regex(RegExp("/^([0-9]{2})\:([0-9]{2})$/")),
    arrival : Joi.string().regex(RegExp("/^([0-9]{2})\:([0-9]{2})$/")),
    //day_trip : Joi.date().format('YYYY-MM-DD'),
    quantity : Joi.number().integer().positive(),
    delay_trip : Joi.boolean(),
    reason : Joi.string(),
    user_id_ : Joi.number().integer().positive(),
    

}).required().min(9);


module.exports = { schemaUser , schemaTrip };