const fetch = require('node-fetch')
const moment = require('moment')
const _ = require('lodash');


const controller = {

    home(req,res){
        res.render("home")
    },
    async history(req,res){
        try {
        const response = await fetch('http://localhost:5000/api/trips/with-sailor')
        let trips = await response.json()



        //Render data by date and time in descending order
        trips = _.orderBy(trips, [item => new Date(item.day_trip), item => item.departure], ['desc','desc']);

        for(trip of trips) {
            trip.day_trip =moment(trip.day_trip).format("DD-MM-YYYY")
        }

        //filter by date
        //trips = trips.filter(trip => trip.day_trip == '09-01-2023')
        
        
        res.render("history", { trips })

        } catch(error) {
            console.log(error)
        }
    }

};

module.exports = controller;