const router = require('express').Router();

const ConsolesController = require('../controllers/ConsolesControllers')

router.post('/', ConsolesController.newStorage)
router.get('/', ConsolesController.listAll)
router.get('/:id', ConsolesController.searchId)
router.put('/:id', ConsolesController.dataUpdate)
router.delete('/:id', ConsolesController.deleteStorage)

module.exports = router;