require("dotenv").config();
const express = require("express");
const session = require("express-session");
const router = require("./src/router");

const app = express(); // on crèe une instance d'un server Express

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  if (
    req.session.userPseudo &&
    (req.session.userPseudo === "BRÉHAT" ||
      req.session.userPseudo === "BRÉHAT2")
  ) {
    const currentHour = new Date().getHours() + new Date().getMinutes() / 60;
    if (currentHour < 8.5 || currentHour > 14.5) {
      // Destroy session
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        }
      });

      // Redirect user to login page with message
      res.redirect(
        "/login?msg=Access is only available from 08:30 to 14:30 for users BREHAT and BREHAT2"
      );
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use(express.urlencoded());
app.use(express.json());

// Setup le view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Sert statiquement le dossier public
app.use(express.static("public"));

app.use(router);

app.get("*", (req, res) => {
  res.redirect("/");
});

const PORT = process.env.PORT ?? 3002;

app.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`);
});
