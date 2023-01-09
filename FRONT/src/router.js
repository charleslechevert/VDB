const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const tripController = require('./controllers/tripController');
const excelController = require('./controllers/excelController');
const authMiddleware = require('./services/auth');
const { appendFile } = require('fs');


router.get("/signin",authController.signin);
router.post("/signin",authController.formSignin);

router.get("/signup",authMiddleware.checkIsLogged, authController.renderSignupPage);
router.post("/signup",authMiddleware.checkIsLogged, authController.formSignup);

router.post("/signout",authMiddleware.checkIsLogged, authController.signout);

router.get("/users",authMiddleware.checkIsLogged,authController.users);
router.post("/delete/user/:id",authMiddleware.checkIsLogged,userController.deleteUser);



router.get("/",authMiddleware.checkIsLogged,controller.home);

router.get("/trip",authMiddleware.checkIsLogged,tripController.trip);
router.post("/trip",authMiddleware.checkIsLogged,tripController.addTrip);
router.post("/delete/trip/:id",authMiddleware.checkIsLogged,tripController.deleteTrip);

router.get("/modifytrip/:id",authMiddleware.checkIsLogged,tripController.renderModifyTrip)
router.post("/modifytrip/:id",authMiddleware.checkIsLogged,tripController.sendModifyTrip)

router.get("/history",authMiddleware.checkIsLogged,controller.history);

router.get("/export",authMiddleware.checkIsLogged,excelController.export);
router.post("/export",authMiddleware.checkIsLogged,excelController.exportData);



module.exports = router;