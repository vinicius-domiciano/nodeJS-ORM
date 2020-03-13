const router = require('express').Router();

const gamesController = require('../controllers/GamesControllers')

router.get('/', gamesController.listAll)

router.post('/', gamesController.new)

module.exports = router;