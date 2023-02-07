const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const userController = {
  async deleteUser(req, res) {
    try {
      const result = await userModel.delete(req.params.id);
    } catch (err) {
      res.send("Une erreur est survenue, veuillez réessayer ultérieurement");
    }

    res.redirect("/users");
  },
  async patchUser(req, res) {
    if (req.body.password !== req.body.password_conf) {
      res.render("user", {
        errorMessage: "Mot de passe différent de la confirmation",
      });
      return;
    }

    //hash the password
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwordHashed;
    delete req.body.password_conf;

    try {
      const result = await userModel.patch(req.body, req.params.id);
    } catch (err) {
      res.send("Une erreur est survenue, veuillez réessayer ultérieurement");
    }

    res.redirect("/users");
  },
  async getUser(req, res) {
    res.render("user");
  },
};

module.exports = userController;
