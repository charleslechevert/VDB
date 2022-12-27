const fetch = require('node-fetch')

const excelController = {
    async exportData(req,res) {
        try{
            console.log(req.body)
            const response = await fetch(`http://localhost:5000/api/trips/excel`, {
                method: 'POST',
                // on passe les données du formulaire en body du POST
                body: JSON.stringify(req.body),
                headers: {
                    'Content-Type': 'application/json'
                  }
            });

            if (!response.ok) throw new Error(response);

            const trips = await response.json()
            console.log(trips)

            //Call excel workbook


        
        } catch(err) {
            console.log(err)
        }
        res.redirect('/history')
    }
}

module.exports = excelController