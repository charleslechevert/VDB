const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const tripController = require("./controllers/tripController");
const excelController = require("./controllers/excelController");
const authMiddleware = require("./services/auth");
const { appendFile } = require("fs");

//PUBLIC ROUTES
router.get("/signin", authController.signin);
router.post("/signin", authController.formSignin);

//USER ROUTES
router.post("/signout", authMiddleware.checkIsLogged, authController.signout);

router.get("/", authMiddleware.checkIsLogged, controller.home);

router.get(
  "/trip",
  authMiddleware.checkIsLogged,
  authMiddleware.checkIsPublic,
  tripController.trip
);
router.post(
  "/trip",
  authMiddleware.checkIsLogged,
  authMiddleware.checkIsPublic,
  tripController.addTrip
);
router.post(
  "/delete/trip/:id",
  authMiddleware.checkIsLogged,
  authMiddleware.checkIsPublic,
  tripController.deleteTrip
);

router.get(
  "/modifytrip/:id",
  authMiddleware.checkIsLogged,
  authMiddleware.checkIsTripOwner,
  authMiddleware.checkIsPublic,
  tripController.renderModifyTrip
);
router.post(
  "/modifytrip/:id",
  authMiddleware.checkIsLogged,
  authMiddleware.checkIsTripOwner,
  authMiddleware.checkIsPublic,
  tripController.sendModifyTrip
);

router.get("/history", authMiddleware.checkIsLogged, controller.history);
router.post("/history", authMiddleware.checkIsLogged, controller.history);

router.get(
  "/export",
  authMiddleware.checkIsAdmin,
  authMiddleware.checkIsPublic,
  excelController.export
);
router.post(
  "/export",
  authMiddleware.checkIsAdmin,
  authMiddleware.checkIsPublic,
  excelController.exportData
);

//ADMIN ROUTES
router.get(
  "/signup",
  authMiddleware.checkIsAdmin,
  authMiddleware.checkIsPublic,
  authController.renderSignupPage
);
router.post("/signup", authMiddleware.checkIsAdmin, authController.formSignup);

router.get(
  "/users",
  authMiddleware.checkIsAdmin,
  authMiddleware.checkIsPublic,
  authController.users
);

router.get(
  "/user/:id",
  authMiddleware.checkIsAdmin,
  authMiddleware.checkIsPublic,
  userController.getUser
);

//Patch new password
router.post(
  "/user/:id",
  authMiddleware.checkIsAdmin,
  authMiddleware.checkIsPublic,
  userController.patchUser
);

router.post(
  "/delete/user/:id",
  authMiddleware.checkIsAdmin,
  authMiddleware.checkIsPublic,
  userController.deleteUser
);

module.exports = router;
