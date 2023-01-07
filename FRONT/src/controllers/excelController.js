const fetch = require('node-fetch')
const fs = require("fs")
const exceljs = require("exceljs")

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

            let workbook = new exceljs.Workbook()
            const sheet = workbook.addWorksheet('data')
            sheet.columns = [
                {header: "id" , key: "id"},
                {header: "type" , key: "type_trip"},
                {header: "bateau" , key: "boat"},
                {header: "port" , key: "harbour"},
                {header: "heure_départ" , key: "departure"},
                {header: "heure_arrivée" , key:"arrival"},
                {header: "jour" , key:"day_trip"},
                {header: "nb_passagers" , key:"quantity"},
                {header: "retard" , key:"delay_trip"},
                {header: "raison" , key:"reason"},
                {header: "pilote" , key:"fname"}
            ]

            //let object = JSON.parse(fs.readFileSync(trips,'utf8'))

            trips.map((value) => {
                sheet.addRow({
                    id : value.id,
                    type_trip : value.type_trip,
                    boat : value.boat,
                    harbour : value.harbour,
                    departure : value.departure,
                    arrival : value.arrival,
                    day_trip : value.day_trip,
                    quantity : value.quantity,
                    delay_trip : value.delay_trip,
                    reason : value.reason,
                    fname : value.fname
                })
            })

            
            res.setHeader(
                "Content-Type",
                 "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
           )
        
           res.setHeader(
               "Content-Disposition",
                "attachment;filename=" + "books.xlsx"
          )
              
        workbook.xlsx.write(res)
        
        } catch(err) {
            console.log(err)
        }
        res.redirect('/exports')
    }
}

module.exports = excelController