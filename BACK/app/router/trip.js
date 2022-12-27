const express = require('express');
const { tripController } = require("../controller");
const validationModule = require('../validation/validationModule');
const {  schemaTrip } = require("../validation/schema");
const router = express.Router();

// Toutes mes urls commencent par /trips

/**
 * Une catégorie 
 * @typedef {object} Catégorie
 * @property {string} route - Url de la catégorie
 * @property {string} label - Nom de la catégorie
 */

/**
 * GET /api/categories
 * @summary Retourne l'ensemble des catégories
 * @tags Catégories
 * @return {array<Catégorie>} 200 - Liste de catégories
 * @return {Error} 500 - Unexpected error
 */
router.get("/",tripController.getAllTrips);
router.get("/with-sailor",tripController.getTripWithUser);
/**
 * POST /api/categories
 * @summary Ajoute une catégorie
 * @tags Catégories
 * @param {Catégorie} request.body.required - Catégorie
 * @return {object} 200 - retourne la catégorie créée
 * @return {object} 500 - Unexpected error
 */
router.post("/", /*validationModule.validate(schemaTrip,"body",*/ tripController.addTrip);
router.get("/:id",tripController.getTrip);
router.patch("/:id",tripController.modifyTrip);
router.delete("/:id",tripController.deleteTrip);

router.post("/excel", tripController.getExcelExport)

module.exports = router;