require("dotenv").config();
const express = require('express');
const app = express(); // on crèe une instance d'un server Express
const router = require('./src/router')

app.use(express.urlencoded())
app.use(express.json());

// Setup le view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Sert statiquement le dossier public
app.use(express.static("public"));

app.use(router);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
});