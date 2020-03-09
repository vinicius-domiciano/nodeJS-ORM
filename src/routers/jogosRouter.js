const router = require('express').Router();
const jogos = require('../controllers/jogos')
const Game = require('../models/GameDao')
Game.init()

router.get('/', jogos.listar)
router.get('/:id', jogos.jogo)
router.post('/', jogos.inserir)
router.put('/:id', jogos.atualizar)
router.delete('/:id', jogos.deletar)

module.exports = router;