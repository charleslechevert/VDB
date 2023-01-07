const express = require('express');
const { userController } = require("../controller");
const validationModule = require('../validation/validationModule');
const {  schemaUser } = require("../validation/schema");
const router = express.Router();

// Toutes mes urls commencent par /users

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
router.get("/",userController.getAllUsers);
/**
 * POST /api/categories
 * @summary Ajoute une catégorie
 * @tags Catégories
 * @param {Catégorie} request.body.required - Catégorie
 * @return {object} 200 - retourne la catégorie créée
 * @return {object} 500 - Unexpected error
 */
router.post("/",userController.addUser);
router.get("/:id",userController.getUser);
router.patch("/:id",userController.modifyUser);
router.delete("/:id",userController.deleteUser);

module.exports = router;