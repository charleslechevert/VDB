const Joi = require('joi')



const schemaUser = Joi.object({
    fname: Joi.string(),
    lname: Joi.string(),
    email: Joi.string().email(),
    admin: Joi.boolean()
}).required().min(4);

const schemaTrip = Joi.object({
    type_trip : Joi.string().required(),
    boat : Joi.string().required(),
    harbour : Joi.string().required(),
    departure : Joi.string().regex(RegExp("/^([0-9]{2})\:([0-9]{2})$/")).required(),
    arrival : Joi.string().regex(RegExp("/^([0-9]{2})\:([0-9]{2})$/")).required(),
    day_trip : Joi.date().required(),
    quantity : Joi.number().integer().positive().required(),
    delay_trip : Joi.boolean().required(),
    reason : Joi.string().required(),
    user_id_ : Joi.number().integer().positive().required(),
    

});


module.exports = { schemaUser , schemaTrip };