const fetch = require('node-fetch')
const moment = require('moment')
const serviceFunction = require('../services/function')

const tripController = {
    trip(req,res){
        const admin = req.session.admin
        const todayDate = new Date().toISOString().substring(0, 10);
        const todayDate_formatted = moment(todayDate).format("DD/MM/YYYY");
        res.render("trip", {admin, todayDate, todayDate_formatted})
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

            if(!req.body.day_trip) {
                data.day_trip = new Date().toISOString().substring(0, 10)
            }



            //we set up anull value to reason if delay_trip is falsy
            if(data.delay_trip == 'false') {
                data.reason = null
            }

            //we transform departure to %5 value
            data.departure = serviceFunction.timeModulo5(data.departure)



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

            const admin = req.session.admin
            trip.day_trip = moment(trip.day_trip).format("YYYY-MM-DD");
            const todayDate = new Date().toISOString().substring(0, 10);
            const todayDate_formatted = moment(todayDate).format("DD/MM/YYYY");

            res.render("modifytrip", { trip, admin, todayDate, todayDate_formatted })
            } catch(error) {
                res.send('Une erreur est survenue, veuillez réesayer ultérieurement');
            }
    },
    async sendModifyTrip(req,res) {
        try{
            data = req.body;
            req.body.user_id_ = req.session.userID

            if(!req.body.day_trip) {
                data.day_trip = new Date().toISOString().substring(0, 10)
            }

            //we set up anull value to reason if delay_trip is falsy
            if(data.delay_trip == 'false') {
                data.reason = null
            }

            //we transform departure to %5 value
            data.departure = serviceFunction.timeModulo5(data.departure)


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