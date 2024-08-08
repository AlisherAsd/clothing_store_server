const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRouter')
const itemRouter = require('./itemRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')

// url htpp://api/routeruse
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/item', itemRouter)
router.use('/basket', basketRouter)

module.exports = router

