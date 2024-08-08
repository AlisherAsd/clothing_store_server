const Router = require('express')
const router = new Router()
const BasketController = require('../controllers/basketController')


router.get('/:id', BasketController.get)
router.post('/', BasketController.addItem)
router.delete('/', BasketController.deleteItem)

module.exports = router

