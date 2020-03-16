const router = require('express').Router();

const ConsolesController = require('../controllers/ConsolesControllers')

router.post('/', ConsolesController.newStorage)

module.exports = router;