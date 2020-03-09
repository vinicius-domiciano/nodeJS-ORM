const express = require('express');
const app = express();
const jogos = require('./routers/jogosRouter');

app.use(express.json())

app.use("/jogos", jogos)

module.exports = app;