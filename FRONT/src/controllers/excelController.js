const fetch = require('node-fetch')
const fs = require("fs")
const excelJS = require("exceljs")
const moment = require('moment')

const excelController = {
    export(req,res){
        res.render("export")
    },
    async exportData(req,res) {
        
        try {
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
    
            const workbook = new excelJS.Workbook();
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


        trips.forEach(row => {
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

        } catch(err) {
            res.send('Une erreur est survenue. Veuillez réessayer plus tard!')
        }
        res.redirect('/export')

    }
}

module.exports = excelController