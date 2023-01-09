const fetch = require('node-fetch')
const moment = require('moment')
const serviceFunction = require('../services/function')

const tripController = {
    trip(req,res){
        res.render("trip")
    },
    async deleteTrip(req,res) {
        try {
            const response = await fetch(`http://localhost:5000/api/trips/${req.params.id}`, {
                method: 'DELETE',
            });

        } catch(err) {
            res.send('Une erreur est survenue, veuillez réesayer ultérieurement')
        }

        res.redirect('/history')

    },
    async addTrip(req,res) {
        try{
            data = req.body;
            data.user_id_ = req.session.userID

            //we set up anull value when arrival input is not filled up (may change)
            if(!data.arrival) {
                data.arrival = null
            }

            //we set up anull value to reason if delay_trip is falsy
            if(data.delay_trip == 'false') {
                data.reason = null
            }

            //we transform departure and arrival to %5 value
            data.departure = serviceFunction.timeModulo5(data.departure)
            if(data.arrival) {
                data.arrival = serviceFunction.timeModulo5(data.arrival)
            }

            //return errorMsg if arrival < departure
            if(data.arrival != null && data.departure > data.arrival) {
                res.render('trip', {errMsg: "L'heure de départ est supérieure à l'heure d'arrivée"})
                return;
            }

            data.quantity = parseInt(data.quantity)
            const response = await fetch(`http://localhost:5000/api/trips`, {
                method: 'POST',
                // on passe les données du formulaire en body du POST
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                  }
            });

            if (!response.ok) throw new Error(response);

            const createdCard = await response.json()
        
        } catch(err) {
            res.send('Une erreur est survenue, veuillez réesayer ultérieurement')
        }
        res.redirect('/history')
    },
    async renderModifyTrip(req,res) {
        try {
            const response = await fetch(`http://localhost:5000/api/trips/${req.params.id}`)
            let trip = await response.json()

            //transform date format

            trip.day_trip =moment(trip.day_trip).format("YYYY-MM-DD")

            res.render("modifytrip", { trip })
            } catch(error) {
                res.send('Une erreur est survenue, veuillez réesayer ultérieurement');
            }
    },
    async sendModifyTrip(req,res) {
        try{
            data = req.body;
            req.body.user_id_ = req.session.userID
            if(!data.arrival) {
                data.arrival = null
            }
            //we set up anull value to reason if delay_trip is falsy
            if(data.delay_trip == 'false') {
                data.reason = null
            }

            //we transform departure and arrival to %5 value
            data.departure = serviceFunction.timeModulo5(data.departure)
            if(data.arrival) {
                data.arrival = serviceFunction.timeModulo5(data.arrival)
            }

            //return errorMsg if arrival < departure
            if(data.arrival != null && data.departure > data.arrival) {
                trip.day_trip = `${trip.day_trip.substring(6,10)}-${trip.day_trip.substring(3,5)}-${trip.day_trip.substring(0,2)}` 
                res.render('modifytrip', {trip, errMsg: "L'heure de départ est supérieure à l'heure d'arrivée"})
                return;
            }




            data.quantity = parseInt(data.quantity)
            const response = await fetch(`http://localhost:5000/api/trips/${req.params.id}`, {
                method: 'PATCH',
                // on passe les données du formulaire en body du POST
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                  }
            });

            if (!response.ok) throw new Error(response);

            //const createdCard = await response.json()
        
        } catch(err) {
            res.send('Une erreur est survenue, veuillez réesayer ultérieurement')
        }
        res.redirect('/history')

    }

};

module.exports = tripController;