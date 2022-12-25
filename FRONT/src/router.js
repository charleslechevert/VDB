const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller');

router.get("/login",controller.login);
router.get("/",controller.home);

router.get("/trip",controller.trip);
router.post("/trip",controller.addTrip);

router.get("/modifytrip/:id",controller.modifyTrip)

router.get("/history",controller.history);


module.exports = router;