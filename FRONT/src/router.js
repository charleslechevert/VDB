const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller');
const authController = require('./controllers/authController');
const excelController = require('./controllers/excelController');


router.get("/signin",authController.signin);
router.post("/signin",authController.formSignin);

router.get("/users",authController.users);
router.get("/signup",authController.renderSignupPage);
router.post("/signup",authController.formSignup);

router.get("/",controller.home);

router.get("/trip",controller.trip);
router.post("/trip",controller.addTrip);

router.get("/modifytrip/:id",controller.renderModifyTrip)
router.post("/modifytrip/:id",controller.sendModifyTrip)

router.get("/history",controller.history);

router.get("/export",controller.export);
router.post("/export",excelController.exportData);


module.exports = router;