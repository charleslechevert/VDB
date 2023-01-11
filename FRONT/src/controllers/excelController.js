const fetch = require('node-fetch')
const fs = require("fs")
const exceljs = require("exceljs")
const moment = require('moment')

const excelController = {
    export(req,res){
        res.render("export")
    },
    async exportData(req,res) {

        /*
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
            for(trip of trips) {
                trip.day_trip = moment(trip.day_trip).format("DD-MM-YYYY")
            }
            console.log(trips)

            //Call excel workbook
            let workbook = new exceljs.Workbook()
            const worksheet = workbook.addWorksheet('Raw Data')
            
            worksheet.columns = [
                {header: "id" , key: "id"},
                {header: "type" , key: "type_trip"},
                {header: "bateau" , key: "boat"},
                {header: "port" , key: "harbour"},
                {header: "heure_départ" , key: "departure"},
                {header: "jour" , key:"day_trip"},
                {header: "nb_passagers" , key:"quantity"},
                {header: "retard" , key:"delay_trip"},
                {header: "raison" , key:"reason"},
                {header: "pilote" , key:"fname"}
            ] 

            //let object = JSON.parse(fs.readFileSync(trips,'utf8'))

            trips.forEach(row => {
                worksheet.addRow([row.id, row.type_trip, row.boat, row.harbour, row.departure, row.day_trip, row.quantity, row.delay_trip,row.reason, row.fname]);
              });

            
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
            res.send('Une erreur est survenue. Veuillez réessayer plus tard!')
        }
        res.redirect('/export')
    }*/

    req.body = { start: '2022-12-29', end: '2023-01-11' }

data =
[
  {
    id: 4,
    type_trip: 'TOUR',
    boat: 'KEHOPS',
    harbour: 'BRÉHAT',
    departure: '17:30:00',
    day_trip: '13-08-2022',
    quantity: 30,
    delay_trip: false,
    reason: null,
    fname: 'FRANCOIS'
  },
  {
    id: 5,
    type_trip: 'DIRECTE',
    boat: 'BRÉHATINE',
    harbour: 'ARCOUEST',
    departure: '08:30:00',
    day_trip: '13-07-2022',
    quantity: 50,
    delay_trip: true,
    reason: 'mauvaise mer',
    fname: 'MAD'
  },
  {
    id: 6,
    type_trip: 'DIRECTE',
    boat: 'ENEZ',
    harbour: 'ARCOUEST',
    departure: '17:30:00',
    day_trip: '13-08-2022',
    quantity: 30,
    delay_trip: false,
    reason: null,
    fname: 'JUSTINE'
  },
  {
    id: 7,
    type_trip: 'Directe',
    boat: 'Bréhatine',
    harbour: 'Arcouest',
    departure: '15:15:00',
    day_trip: '25-12-2022',
    quantity: 7,
    delay_trip: false,
    reason: null,
    fname: 'FRANCOIS'
  },
  {
    id: 3,
    type_trip: 'Directe',
    boat: 'Bréhatine',
    harbour: 'Arcouest',
    departure: '15:15:00',
    day_trip: '25-12-2022',
    quantity: 7,
    delay_trip: false,
    reason: null,
    fname: 'FRANCOIS'
  },
  {
    id: 8,
    type_trip: 'DIRECTE',
    boat: 'BRÉHATINE',
    harbour: 'ARCOUEST',
    departure: '19:05:00',
    day_trip: '09-01-2023',
    quantity: 32,
    delay_trip: false,
    reason: null,
    fname: 'CARLOS'
  }
]

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Raw Data');

worksheet.columns = [
  {header: "id" , key: "id"},
  {header: "type" , key: "type_trip"},
  {header: "bateau" , key: "boat"},
  {header: "port" , key: "harbour"},
  {header: "heure_départ" , key: "departure"},
  {header: "jour" , key:"day_trip"},
  {header: "nb_passagers" , key:"quantity"},
  {header: "retard" , key:"delay_trip"},
  {header: "raison" , key:"reason"},
  {header: "pilote" , key:"fname"}
]



    data.forEach(row => {
        worksheet.addRow([row.id, row.type_trip, row.boat, row.harbour, row.departure, row.day_trip, row.quantity, row.delay_trip,row.reason, row.fname]);
      });

    res.setHeader(
        "Content-Type",
         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
   )

   res.setHeader(
       "Content-Disposition",
        "attachment;filename=" + `RAPPORT-DU${req.body.start}AU${req.body.end}.xlsx`
  )


      workbook.xlsx.write(res)

}
}

module.exports = excelController