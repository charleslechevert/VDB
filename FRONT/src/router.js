const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller');
const excelController = require('./controllers/excelController');


router.get("/login",controller.login);
router.get("/",controller.home);

router.get("/trip",controller.trip);
router.post("/trip",controller.addTrip);

router.get("/modifytrip/:id",controller.renderModifyTrip)
router.post("/modifytrip/:id",controller.sendModifyTrip)

router.get("/history",controller.history);

router.get("/export",controller.export);
router.post("/export",excelController.exportData);


module.exports = router;