const client = require("./dbClient");
const errorHandler = require("../service/error/errorHandler");


const model = {
    async findAll(){
        let trips;
        try{
            const result = await client.query('SELECT * FROM "trip";');
            trips = result.rows;
        }
        catch(err){
            errorHandler.logError(err);
        }

        return trips;
    },
    async insert(trip){
        let tripDB;
        try{
            const sqlQuery = "INSERT INTO public.trip(type_trip, boat, harbour, departure, arrival, day_trip, quantity, delay_trip, reason, user_id_) VALUES ($1, $2, $3, $4,$5,$6, $7, $8, $9,$10) RETURNING *;";
            const values = [trip.type_trip,trip.boat,trip.harbour,trip.departure,trip.arrival,trip.day_trip,trip.quantity,trip.delay_trip,trip.reason,trip.user_id_];
            const result = await client.query(sqlQuery,values);
            tripDB = result.rows[0];
        }
        catch(err){
            errorHandler.logError(err);
        }

        return tripDB;
    },
    async findById(id){
        let trip;
        try{
            const sqlQuery = 'SELECT * FROM "trip" WHERE id=$1;';
            const values = [id];
            const result = await client.query(sqlQuery,values);
            trip = result.rows[0];
        }
        catch(err){
            
            errorHandler.logError(err);
        }

        return trip;
    },
    async update(id,trip){
        let tripDB;
        try{
            const sqlQuery = `UPDATE public.trip
            SET type_trip=$1, boat=$2, harbour=$3, departure=$4, arrival=$5, day_trip=$6, quantity=$7, delay_trip=$8, reason=$9, user_id_=$10
            WHERE id=$11 RETURNING *;`;
            const values = [trip.type_trip,trip.boat,trip.harbour,trip.departure,trip.arrival,trip.day_trip,trip.quantity,trip.delay_trip,trip.reason,trip.user_id_,id];
            const result = await client.query(sqlQuery,values);
            tripDB = result.rows[0];
        }
        catch(err){
            
            errorHandler.logError(err);
        }

        return tripDB;
    },
    async delete(id){
       
        try{
            const sqlQuery = `DELETE FROM public.trip
            WHERE id=$1;`;
            const values = [id];
            const result = await client.query(sqlQuery,values);
           
            // à voir ce que je remonte
        }
        catch(err){
            
            errorHandler.logError(err);
        }

        return;
    },
    async findTripbyDayWithUser() {
        let trips;
        try{
            const result = await client.query(`SELECT trip.id, trip.type_trip, trip.boat, trip.harbour, trip.departure, trip.arrival, trip.day_trip, trip.quantity, trip.delay_trip, trip.reason, "user".fname FROM trip LEFT JOIN "user" ON trip.user_id_="user".id`);
            trips = result.rows;
        }
        catch(err){
            errorHandler.logError(err);
        }

        return trips;
    }
    
};

module.exports = model;