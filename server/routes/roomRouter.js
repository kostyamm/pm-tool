const Router = require('express')
const router = new Router()

const authMiddleware = require('../middleware/authMiddleware')
const { getRoomById, addGuest } = require('../controllers/roomController')

router.get('/:id', authMiddleware, getRoomById)
router.post('/:id', authMiddleware, addGuest)

module.exports = router