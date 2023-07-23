const fs = require("fs");
const excelJS = require("exceljs");
const moment = require("moment");
const tripModel = require("../models/tripModel");

const excelController = {
  export(req, res) {
    res.render("export");
  },
  async exportData(req, res) {
    const trips = await tripModel.findExcelExport(req.body.start, req.body.end);

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Raw Data");

    worksheet.columns = [
      { header: "id", key: "id" },
      { header: "type", key: "type_trip" },
      { header: "bateau", key: "boat" },
      { header: "port", key: "harbour" },
      { header: "heure_départ", key: "departure" },
      { header: "jour", key: "day_trip" },
      { header: "nb_passagers", key: "quantity" },
      { header: "retard", key: "delay_trip" },
      { header: "raison", key: "reason" },
      { header: "pilote", key: "fname" },
      { header: "non quotas", key: "no_quota" },
    ];

    trips.forEach((row) => {
      worksheet.addRow([
        row.id,
        row.type_trip,
        row.boat,
        row.harbour,
        row.departure,
        row.day_trip,
        row.quantity,
        row.delay_trip,
        row.reason,
        row.fname,
        row.no_quota,
      ]);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment;filename=" +
        `RAPPORT-DU${req.body.start}AU${req.body.end}.xlsx`
    );

    workbook.xlsx.write(res);
  },
};

module.exports = excelController;
