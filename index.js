require("dotenv").config();
const { userRouter, tripRouter, authRouter} = require("./app/router");
const express = require('express');
const jwt = require('jsonwebtoken')
const app = express(); // on crèe une instance d'un server Express
const errorHandler = require("./app/service/error/errorHandler");
const cors = require('cors');
const { JsonWebTokenError } = require("jsonwebtoken");


app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }));

  app.use(function (req, res, next) {
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.urlencoded())
app.use(express.json());



app.use("/api/users",userRouter);
app.use("/api/trips",tripRouter);
app.use("/api/login",authRouter);

app.use(errorHandler._404);

app.use(errorHandler.manage);

const PORT = process.env.PORT ?? 5000;

/*app.post('/api/refresh', (req,res) => {
  const refreshToken = req.body.token
  if(!refeshToken) return res.status(401).json('you are not authenticated')
})*/

app.post("/api/logout", authentificationToken, (req,res) => {
  const refreshToken = req.body.token;
  
})

function authentificationToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split('')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  }) 
}



app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
});