const moment = require("moment");
const _ = require("lodash");
const tripModel = require("../models/tripModel");

const controller = {
  home(req, res) {
    const admin = req.session.admin;

    res.render("home", { admin });
  },
  async history(req, res) {
    try {
      let trips = await tripModel.findTripsWithUser();

      //Render data by date and time in descending order
      trips = _.orderBy(
        trips,
        [(item) => new Date(item.day_trip), (item) => item.departure],
        ["desc", "desc"]
      );

      for (let trip of trips) {
        trip.day_trip = moment(trip.day_trip).format("DD/MM/YYYY");
      }

      //Render data for the correct date
      const todayDate = moment(
        new Date().toISOString().substring(0, 10)
      ).format("DD/MM/YYYY");
      if (!req.body.day_selected) {
        trips = trips.filter((item) => item.day_trip == todayDate);
      } else {
        const dateSelected = moment(req.body.day_selected).format("DD/MM/YYYY");
        trips = trips.filter((trip) => trip.day_trip == dateSelected);
      }

      //Render only data that belong to the user (except admin)
      if (!req.session.admin) {
        trips = trips.filter((trip) => trip.user_id_ == req.session.userID);
      }

      //Render passengers stats for the day
      let passengers_sum = [];
      const trip_types = ["DIRECTE", "TOUR", "EXTÉRIEUR", "AFFRÊTEMENT"];

      if (trips.length) {
        for (let type of trip_types) {
          let totalPassengers;
          if (trips.filter((item) => item.type_trip == type).length) {
            totalPassengers = trips
              .filter((item) => item.type_trip == type)
              .map((item) => item.quantity)
              .reduce((prev, next) => prev + next);
          } else {
            totalPassengers = 0;
          }
          passengers_sum.push(totalPassengers);
        }

        passengers_sum.push(
          trips.map((item) => item.quantity).reduce((prev, next) => prev + next)
        );
      } else {
        passengers_sum = [0, 0, 0, 0, 0];
      }

      // Calculate sum of no_quota for DIRECTE and TOUR
      let no_quota_sum_directe = 0;
      let no_quota_sum_tour = 0;

      if (trips.length) {
        no_quota_sum_directe = trips
          .filter(
            (item) => item.type_trip == "DIRECTE" && item.harbour == "BRÉHAT"
          )
          .map((item) => item.no_quota)
          .reduce((prev, next) => prev + next, 0);

        no_quota_sum_tour = trips
          .filter(
            (item) => item.type_trip == "TOUR" && item.harbour == "BRÉHAT"
          )
          .map((item) => item.no_quota)
          .reduce((prev, next) => prev + next, 0);
      }

      // Push the no_quota sums to passengers_sum array
      passengers_sum.push(no_quota_sum_directe, no_quota_sum_tour);
      console.log(passengers_sum);

      const admin = req.session.admin;

      res.render("history", { trips, admin, passengers_sum });
    } catch (error) {
      res.send("Une erreur est survenue, veuillez réessayer ultérieurement");
    }
  },
};

module.exports = controller;
