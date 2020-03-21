const router = require('express').Router();

const devController = require('../controllers/DeveloperControllers')

router.post('/', devController.newStorage)
router.get('/', devController.listAll)
router.get('/:id', devController.searchId)
router.put('/:id', devController.dataUpdate)
router.delete('/:id', devController.deleteStorage)

module.exports = router;