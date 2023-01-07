require('dotenv').config();
const express = require('express');
const session = require('express-session');
const router = require('./src/router')

const app = express(); // on crèe une instance d'un server Express

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
 }));
 

app.use(express.urlencoded())
app.use(express.json());

// Setup le view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Sert statiquement le dossier public
app.use(express.static("public"));

app.use(router);

app.get('*',(req,res) => {
    res.redirect('/')
})

const PORT = process.env.PORT ?? 3002;

app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
});