const client = require("./dbClient");
const errorHandler = require("../service/error/errorHandler");


const model = {
    async findAll(){
        let users;
        try{
            const result = await client.query('SELECT * FROM "user";');
            users = result.rows;
        }
        catch(err){
            
            errorHandler.logError(err);
        }

        return users;
    },
    async insert(user){
        let userDB;
        try{
            const sqlQuery = "INSERT INTO public.user(fname, lname, email, companyrole) VALUES ($1, $2, $3, $4) RETURNING *;";
            const values = [user.fname,user.lname,user.email,user.companyrole];
            const result = await client.query(sqlQuery,values);
            userDB = result.rows[0];
        }
        catch(err){
            
            errorHandler.logError(err);
        }

        return userDB;
    },
    async findById(id){
        let user;
        try{
            const sqlQuery = 'SELECT * FROM "user" WHERE id=$1;';
            const values = [id];
            const result = await client.query(sqlQuery,values);
            user = result.rows[0];
        }
        catch(err){
            
            errorHandler.logError(err);
        }

        return user;
    },
    async update(id,user){
        let userDB;
        try{
            const sqlQuery = `UPDATE public.user
            SET fname=$1, lname=$2, email=$3, companyrole=$4
            WHERE id=$5 RETURNING *;`;
            const values = [user.fname,user.lname,user.email,user.companyrole,id];
            const result = await client.query(sqlQuery,values);
            userDB = result.rows[0];
        }
        catch(err){
            
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
            
            errorHandler.logError(err);
        }

        return;
    }
};

module.exports = model;