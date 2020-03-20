const router = require('express').Router();

const gamesController = require('../controllers/GamesControllers')

router.get('/', gamesController.listAll)
router.get('/:id', gamesController.searchId)
router.post('/', gamesController.newStorage)
router.delete('/:id', gamesController.deleteStorage)
router.put('/:id', gamesController.dataUpdate)

router.post('/:id/consoles', gamesController.platformGame)

module.exports = router;