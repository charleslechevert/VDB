const fetch = require('node-fetch')

const controller = {
    login(req,res){
        res.render("login")
    },
    home(req,res){
        res.render("home")
    },
    trip(req,res){
        res.render("trip")
    },
    async history(req,res){
        try {
        const response = await fetch('http://localhost:5000/api/trips/with-sailor')
        const trips = await response.json()
        res.render("history", { trips })
        } catch(error) {
            console.error(error);
        }
    },
    async addTrip(req,res) {
        try{
            data = req.body;
            data.user_id_ = 1
            if(!data.arrival) {
                data.arrival = '00:00'
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
            console.log(err)
        }
        res.redirect('/history')
    },
    async modifyTrip(req,res) {
        try {
            const response = await fetch(`http://localhost:5000/api/trips/${req.params.id}`)
            const trip = await response.json()
            res.render("modifytrip", { trip })
            } catch(error) {
                console.error(error);
            }
    }

};

module.exports = controller;