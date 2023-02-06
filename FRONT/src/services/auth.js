const { trip } = require("../controllers/tripController");
const moment = require("moment");
const tripModel = require("../models/tripModel");

const authMiddleware = {
  // Le but de ce middleware est de rediriger l'utilisateur sur la page de connection si il essaye d'accèder à une route nécessitant la connection.
  checkIsLogged(req, res, next) {
    // Si mon utilisateur n'est pas connecter, je le redirige sur la page de login
    if (!req.session.userID) {
      res.redirect("/signin");
    } else {
      // Si il est connecter je le laisse faire l'action
      next();
    }
  },
  checkIsAdmin(req, res, next) {
    // Si mon utilisateur n'est pas connecter, je le redirige sur la page de login
    if (!req.session.admin) {
      res.redirect("/signin");
    } else {
      // Si il est connecter je le laisse faire l'action
      next();
    }
  },
  async checkIsTripOwner(req, res, next) {
    //If admin, get access anyway
    if (req.session.admin) {
      next();
      return;
      //If not admin, get access only if the trip belong to the user and only if the current day matches with the day of the trip.
    } else {
      try {
        const trip = await tripModel.findById(req.params.id);
        trip.day_trip = moment(trip.day_trip).format("YYYY-MM-DD");
        if (
          trip.user_id_ == req.session.userID &&
          trip.day_trip ==
            moment(new Date().toISOString().substring(0, 10)).format(
              "YYYY-MM-DD"
            )
        ) {
          next();
          return;
        } else {
          res.redirect("/");
        }
      } catch (error) {
        res.send("Une erreur est survenue, veuillez réessayer ultérieurement");
      }
    }
  },
  checkIsPublic(req, res, next) {
    if (req.session.userPseudo == "ADMINPUBLIQUE") {
      res.redirect("/");
    } else {
      // Si il est connecter je le laisse faire l'action
      next();
    }
  },
};

module.exports = authMiddleware;
