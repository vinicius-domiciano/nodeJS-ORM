const router = require('express').Router();

const devController = require('../controllers/DeveloperControllers')

router.post('/', devController.newStorage)

module.exports = router;