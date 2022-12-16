require("dotenv").config();

const express = require('express');
const app = express(); // on crèe une instance d'un server Express

const router = require("./app/router");

app.use("/api",router);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
});