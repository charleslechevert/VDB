const userModel = require("../models/userModel");

const userController = {
  async deleteUser(req, res) {
    try {
      const result = await userModel.delete(req.params.id);
    } catch (err) {
      res.send("Une erreur est survenue, veuillez réessayer ultérieurement");
    }

    res.redirect("/users");
  },
};

module.exports = userController;
