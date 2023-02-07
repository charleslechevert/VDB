const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const authController = {
  signin(req, res) {
    if (!req.session.userID) {
      res.render("signin");
      return;
    } else {
      res.redirect("/");
    }
  },
  async formSignin(req, res) {
    let { pseudo, password } = req.body;

    //put everything in lower case
    pseudo = pseudo.toUpperCase();

    let users;
    try {
      users = await userModel.findAll();
    } catch (err) {
      res.send("Une erreur est survenue, veuillez réessayer ultérieurement");
    }

    correctPseudo = users.find((user) => user.pseudo == pseudo);
    if (!correctPseudo) {
      res.render("signin", {
        errorMessage: "Mauvais identifiant",
      });
      return;
    }

    const hasPasswordMatched = await bcrypt.compare(
      password,
      correctPseudo.password
    );

    if (!hasPasswordMatched) {
      res.render("signin", {
        errorMessage: "Mauvais identifiant",
      });
      return;
    }
    req.session.userPseudo = correctPseudo.pseudo;
    req.session.userFname = correctPseudo.fname;
    req.session.userLname = correctPseudo.lname;
    req.session.userID = correctPseudo.id;
    req.session.admin = correctPseudo.admin;

    res.redirect("/");
  },
  async users(req, res) {
    users = await userModel.findAll();
    res.render("users", { users });
  },
  renderSignupPage(req, res) {
    res.render("signup");
  },
  async formSignup(req, res) {
    let users;

    //put everything in lowercase for pseudo and uppercase for f/lname
    req.body.pseudo = req.body.pseudo.toUpperCase();
    req.body.fname = req.body.fname.toUpperCase();
    req.body.lname = req.body.lname.toUpperCase();

    try {
      users = await userModel.findAll();
    } catch (err) {
      res.send("Une erreur est survenue, veuillez réessayer ultérieurement");
    }

    const pseudoFound = users.find((user) => user.pseudo == req.body.pseudo);
    if (pseudoFound) {
      res.render("signup", {
        errorMessage: "Un compte existe déjà, veuillez vous connecter",
      });
      return;
    }

    if (req.body.password !== req.body.password_conf) {
      res.render("signup", {
        errorMessage: "Mot de passe différent de la confirmation",
      });
      return;
    }

    //hash the password
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwordHashed;

    delete req.body.password_conf;

    try {
      const user = req.body;
      const userDB = await userModel.insert(user);

      req.session.userPseudo = req.body.pseudo;
      req.session.userFname = req.body.fname;
      req.session.userLname = req.body.lname;
      req.session.userID = req.body.id;
      req.session.admin = req.body.admin;

      res.redirect("/users");
    } catch (e) {
      res.render("signup", {
        errorMessage: "Veuillez vérifier les champs du formulaire",
      });
    }
  },
  signout(req, res) {
    req.session.destroy();
    res.redirect("/signin");
  },
};

module.exports = authController;
