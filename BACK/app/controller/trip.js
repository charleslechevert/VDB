const { tripModel } = require("../model");

const controller = {
    async getAllTrips(req,res){
        const trips = await tripModel.findAll();
        res.json(trips);
    },
    async addTrip(req,res){
        const trip = req.body;

        const tripDB = await tripModel.insert(trip);

        res.json(tripDB);
    },
    async getTrip(req,res){

        const trip = await tripModel.findById(req.params.id);

        res.json(trip);
    },
    async modifyTrip(req,res){
        const trip = req.body; // les modifications apportées à la catégorie

        const tripDB = await tripModel.update(req.params.id,trip);

        res.json(tripDB);
    },
    async deleteTrip(req,res){

        const result = await tripModel.delete(req.params.id);

        res.json(result);
    },
    async getTripWithUser(req,res){

        const result = await tripModel.findTripWithUser();

        res.json(result);
    },
    async getExcelExport(req,res) {
        const result= await tripModel.findExcelExport(req.body.start, req.body.end)
        res.json(result)
    }

};

module.exports = controller;