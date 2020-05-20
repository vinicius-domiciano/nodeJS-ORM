const router = require('express').Router();
const multer = require('multer')

const uploadCongif = require('../config/uploads')
const gamesController = require('../controllers/GamesControllers')

const upload = multer(uploadCongif)

router.get('/', gamesController.listAll)
router.get('/:id', gamesController.searchId)
router.post('/', gamesController.newStorage)
router.delete('/:id', gamesController.deleteStorage)
router.put('/:id', gamesController.dataUpdate)

router.post('/:id/consoles', gamesController.platformGame)

router.post('/:id/imagem', upload.single('games'), gamesController.photoUpload)

module.exports = router;