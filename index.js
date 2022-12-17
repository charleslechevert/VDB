require("dotenv").config();
const { userRouter, tripRouter} = require("./app/router");
const express = require('express');
const app = express(); // on crèe une instance d'un server Express
const errorHandler = require("./app/service/error/errorHandler");


app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/trips",tripRouter);

app.use(errorHandler._404);

app.use(errorHandler.manage);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
});