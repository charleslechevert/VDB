const client = require("./dbClient");
//const errorHandler = require("../service/error/errorHandler");
//const debug = require('debug')('model');

const model = {
    async findAll(){
        let users;
        try{
            const result = await client.query("SELECT * FROM user;");
            users = result.rows;
        }
        catch(err){
            debug(err);
            errorHandler.logError(err);
        }

        return users;
    },
    async insert(user){
        let userDB;
        debug(user);
        try{
            const sqlQuery = "INSERT INTO public.user(route, label) VALUES ($1, $2) RETURNING *;";
            const values = [user.route,user.label];
            const result = await client.query(sqlQuery,values);
            userDB = result.rows[0];
        }
        catch(err){
            debug(err);
            errorHandler.logError(err);
        }

        return userDB;
    },
    async findById(id){
        let user;
        try{
            const sqlQuery = "SELECT * FROM user WHERE id=$1;";
            const values = [id];
            const result = await client.query(sqlQuery,values);
            user = result.rows[0];
        }
        catch(err){
            debug(err);
            errorHandler.logError(err);
        }

        return user;
    },
    async update(id,user){
        let userDB;
        try{
            const sqlQuery = `UPDATE public.user
            SET route=$1, label=$2
            WHERE id=$3 RETURNING *;`;
            const values = [user.route,user.label,id];
            const result = await client.query(sqlQuery,values);
            userDB = result.rows[0];
        }
        catch(err){
            debug(err);
            errorHandler.logError(err);
        }

        return userDB;
    },
    async delete(id){
       
        try{
            const sqlQuery = `DELETE FROM public.user
            WHERE id=$1;`;
            const values = [id];
            const result = await client.query(sqlQuery,values);
           
            // à voir ce que je remonte
        }
        catch(err){
            debug(err);
            errorHandler.logError(err);
        }

        return;
    }
};

module.exports = model;