const Router = require('express')
const router = new Router()
const BrandController = require('../controllers/brandController')
const checkRole = require('../middleware/CheckRoleMiddleware')


router.post('/', checkRole('ADMIN'), BrandController.create)
router.get('/', BrandController.get)

module.exports = router

