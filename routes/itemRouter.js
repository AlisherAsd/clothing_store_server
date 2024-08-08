const Router = require('express')
const router = new Router()
const ItemController = require('../controllers/itemController')
const checkRole = require('../middleware/CheckRoleMiddleware')


// checkRole('ADMIN')
router.post('/', ItemController.create)
router.get('/', ItemController.getAll)
router.get('/:id', ItemController.getOne)
router.delete('/:id', ItemController.deleteItem)

module.exports = router

