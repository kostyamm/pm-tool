const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const roomRouter = require('./roomRouter')

router.use('/user', userRouter)
router.use('/room', roomRouter)

module.exports = router