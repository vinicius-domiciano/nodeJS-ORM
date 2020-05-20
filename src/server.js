const express = require('express')
const multer = require('multer')
const app = express()

const jogos = require('./routers/jogosRouter')
const dev = require('./routers/devRouters')
const consoles = require('./routers/consolesRouters')

require('./database/index')

app.use('/imagem', express.static('images/'))

app.use(express.json())

app.use('/devs', dev)
app.use('/jogos', jogos)
app.use('/consoles', consoles)

module.exports = app