const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const checkRole = require('../middleware/CheckRoleMiddleware')


router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', AuthMiddleware, UserController.check)
router.delete('/:id', checkRole("ADMIN"), UserController.deleteUser)

module.exports = router

