const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
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

router.get("/trip",authMiddleware.checkIsLogged,controller.trip);
router.post("/trip",authMiddleware.checkIsLogged,controller.addTrip);

router.get("/modifytrip/:id",authMiddleware.checkIsLogged,controller.renderModifyTrip)
router.post("/modifytrip/:id",authMiddleware.checkIsLogged,controller.sendModifyTrip)

router.get("/history",authMiddleware.checkIsLogged,controller.history);

router.get("/export",authMiddleware.checkIsLogged,controller.export);
router.post("/export",authMiddleware.checkIsLogged,excelController.exportData);



module.exports = router;