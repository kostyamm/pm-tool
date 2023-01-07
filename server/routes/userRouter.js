const Router = require('express')
const router = new Router()

const authMiddleware = require('../middleware/authMiddleware')
const { registration, login, auth, rooms, createRoom, removeRoom } = require('../controllers/userController')

router.post('/registration', registration)
router.post('/login', login)
router.get('/auth', authMiddleware, auth)

router.get('/rooms', authMiddleware, rooms)
router.post('/rooms', authMiddleware, createRoom)
router.delete('/rooms/:id', authMiddleware, removeRoom)

module.exports = router