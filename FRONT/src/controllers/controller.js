const fetch = require('node-fetch')
const moment = require('moment')
const _ = require('lodash');


const controller = {

    home(req,res){

        const admin = req.session.admin

        res.render("home", { admin })
    },
    async history(req,res){
        try {
        const response = await fetch('http://localhost:5000/api/trips/with-sailor')
        let trips = await response.json()



        //Render data by date and time in descending order
        trips = _.orderBy(trips, [item => new Date(item.day_trip), item => item.departure], ['desc','desc']);

        for(trip of trips) {
            trip.day_trip =moment(trip.day_trip).format("DD/MM/YYYY")
        }

        //Render data for the correct date
        const todayDate = moment(new Date().toISOString().substring(0, 10)).format("DD/MM/YYYY");
        if(!req.body.day_selected) {
            trips =  trips.filter(item => item.day_trip == todayDate)
        } else  {
            const dateSelected = moment(req.body.day_selected).format("DD/MM/YYYY");
            trips = trips.filter(trip => trip.day_trip == dateSelected ) 
        }

        //Render only data that belong to the user (except admin)
        if(!req.session.admin) {
            trips = trips.filter( trip => trip.user_id_ == req.session.userID)
        }
        
        const admin = req.session.admin
        
        
        res.render("history", { trips, admin })

        } catch(error) {
            res.send('Une erreur est survenue, veuillez réessayer ultérieurement')
        }
    }

};

module.exports = controller;