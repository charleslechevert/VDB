const client = require("./dbClient");
const errorHandler = require("../services/error/errorHandler");

const model = {
  async findAll() {
    let trips;
    try {
      const result = await client.query('SELECT * FROM "trip";');
      trips = result.rows;
    } catch (err) {
      errorHandler.logError(err);
    }

    return trips;
  },
  async insert(trip) {
    let tripDB;
    try {
      const sqlQuery =
        "INSERT INTO public.trip(type_trip, boat, harbour, departure, day_trip, quantity, delay_trip, reason, user_id_) VALUES ($1, $2, $3, $4,$5,$6, $7, $8, $9) RETURNING *;";
      const values = [
        trip.type_trip,
        trip.boat,
        trip.harbour,
        trip.departure,
        trip.day_trip,
        trip.quantity,
        trip.delay_trip,
        trip.reason,
        trip.user_id_,
      ];
      const result = await client.query(sqlQuery, values);
      tripDB = result.rows[0];
    } catch (err) {
      errorHandler.logError(err);
    }

    return tripDB;
  },
  async findById(tripId) {
    let tripDB;
    try {
      const sqlQuery = 'SELECT * FROM "trip" WHERE id=$1;';
      const values = [tripId];
      const result = await client.query(sqlQuery, values);
      tripDB = result.rows[0];
    } catch (err) {
      errorHandler.logError(err);
    }

    return tripDB;
  },
  async update(id, trip) {
    let tripDB;
    try {
      const sqlQuery = `UPDATE public.trip
            SET type_trip=$1, boat=$2, harbour=$3, departure=$4, day_trip=$5, quantity=$6, delay_trip=$7, reason=$8, user_id_=$9
            WHERE id=$10 RETURNING *;`;
      const values = [
        trip.type_trip,
        trip.boat,
        trip.harbour,
        trip.departure,
        trip.day_trip,
        trip.quantity,
        trip.delay_trip,
        trip.reason,
        trip.user_id_,
        id,
      ];
      const result = await client.query(sqlQuery, values);
      tripDB = result.rows[0];
    } catch (err) {
      errorHandler.logError(err);
    }

    return tripDB;
  },
  async delete(id) {
    try {
      const sqlQuery = `DELETE FROM public.trip
            WHERE id=$1;`;
      const values = [id];
      const result = await client.query(sqlQuery, values);

      // ?? voir ce que je remonte
    } catch (err) {
      errorHandler.logError(err);
    }

    return;
  },
  async findTripsWithUser() {
    let trips;
    try {
      const result = await client.query(
        `SELECT trip.id, trip.type_trip, trip.boat, trip.harbour, trip.departure, trip.day_trip, trip.quantity, trip.delay_trip, trip.reason, trip.user_id_, "user".fname FROM trip LEFT JOIN "user" ON trip.user_id_="user".id`
      );
      trips = result.rows;
    } catch (err) {
      errorHandler.logError(err);
    }

    return trips;
  },
  async findExcelExport(start, end) {
    let trips;
    try {
      const result = await client.query(
        `SELECT trip.id, trip.type_trip, trip.boat, trip.harbour, trip.departure, trip.day_trip, trip.quantity, trip.delay_trip, trip.reason, "user".fname FROM trip LEFT JOIN "user" ON trip.user_id_="user".id WHERE trip.day_trip BETWEEN '${start}' AND '${end}'`
      );
      trips = result.rows;
    } catch (err) {
      errorHandler.logError(err);
    }
    return trips;
  },
};

module.exports = model;
