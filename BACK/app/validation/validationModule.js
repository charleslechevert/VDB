const e = require("express");
const errorHandler = require("../service/error/errorHandler");

const validationModule = {
    // validateQuery(req,res,next){
    //     const {error} = schemaQuery.validate(req.query);
    //     console.log("ERROR - ",error);
    //     if(error){
    //         errorHandler._500(req,res);
    //     }
    //     else{
    //         next();
    //     }
    // },
    // validateBody(req,res,next){
    //     const {error} = schemaBody.validate(req.body);
    //     console.log("ERROR - ",error);
    //     if(error){
    //         errorHandler._500(req,res);
    //     }
    //     else{
    //         next();
    //     }
    // },

    /**
     * Valide un schéma vis à vis d'une clef au niveau de la requête (req[key])
     * @param {object} schema schema issu du module Joi
     * @param {string} key  ici est attendu "query", "body" ou "params"
     * @error renvoie une erreur 500
     * @returns {} next()
     */
    validate(schema,key){
        return (req,res,next)=>{
            const {error} = schema.validate(req[key]);
            // console.log("ERROR - ",error);
            if(error){
                errorHandler._500(req,res);
            }
            else{
                next();
            }
        }
    }
};

module.exports = validationModule;