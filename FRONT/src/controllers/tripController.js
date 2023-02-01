const moment = require("moment");
const serviceFunction = require("../services/function");
const tripModel = require("../models/tripModel");

const tripController = {
  trip(req, res) {
    const admin = req.session.admin;
    const todayDate = new Date().toISOString().substring(0, 10);
    const todayDate_formatted = moment(todayDate).format("DD/MM/YYYY");
    res.render("trip", { admin, todayDate, todayDate_formatted });
  },
  async deleteTrip(req, res) {
    try {
      const result = await tripModel.delete(req.params.id);
    } catch (err) {
      res.send("Une erreur est survenue, veuillez réessayer ultérieurement");
    }

    res.redirect("/history");
  },
  async addTrip(req, res) {
    try {
      data = req.body;
      data.user_id_ = req.session.userID;

      if (!req.body.day_trip) {
        data.day_trip = new Date().toISOString().substring(0, 10);
      }

      //we set up anull value to reason if delay_trip is falsy
      if (data.delay_trip == "false") {
        data.reason = null;
      }

      //we transform departure to %5 value
      data.departure = serviceFunction.timeModulo5(data.departure);

      data.quantity = parseInt(data.quantity);

      const tripDB = await tripModel.insert(data);
    } catch (err) {
      res.send("Une erreur est survenue, veuillez réessayer ultérieurement");
    }
    res.redirect("/history");
  },
  async renderModifyTrip(req, res) {
    let trip;
    let admin;
    let todayDate;
    let todayDate_formatted;
    try {
      trip = await tripModel.findById(req.params.id);
    } catch (error) {
      res.send("Une erreur est survenue, veuillez réessayer ultérieurementt");
    }
    //transform date format
    admin = req.session.admin;
    trip.day_trip = moment(trip.day_trip).format("YYYY-MM-DD");
    todayDate = new Date().toISOString().substring(0, 10);
    todayDate_formatted = moment(todayDate).format("DD/MM/YYYY");
    res.render("modifytrip", { trip, admin, todayDate, todayDate_formatted });
    return;
  },
  async sendModifyTrip(req, res) {
    try {
      data = req.body;
      req.body.user_id_ = req.session.userID;

      if (!req.body.day_trip) {
        data.day_trip = new Date().toISOString().substring(0, 10);
      }

      //we set up anull value to reason if delay_trip is falsy
      if (data.delay_trip == "false") {
        data.reason = null;
      }

      //we transform departure to %5 value
      data.departure = serviceFunction.timeModulo5(data.departure);

      data.quantity = parseInt(data.quantity);

      const tripDB = await tripModel.update(req.params.id, data);
    } catch (err) {
      res.send("Une erreur est survenue, veuillez réessayer ultérieurement");
    }
    res.redirect("/history");
  },
};

module.exports = tripController;
