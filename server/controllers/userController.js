const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Room = require('../models/Room')

const generateJwt = (id, email, name) => {
    return jwt.sign(
        { id, email, name },
        process.env.SECRET_KEY,
        { expiresIn: '24h' },
    )
}

const registration = async (req, res, next) => {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
        return next(ApiError.badRequest('All fields are required'))
    }

    const candidate = await User.findOne({ email })

    if (candidate) {
        return next(ApiError.badRequest('This user already exists'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ name, email, password: hashPassword })
    const token = generateJwt(user.id, user.email, user.name)

    return res.json({ token })
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(ApiError.badRequest('Email and password are required'))
    }

    const user = await User.findOne({ email })

    if (!user) {
        return next(ApiError.badRequest('User is not found'))
    }

    const comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword) {
        return next(ApiError.badRequest('Email or password is not correct'))
    }

    const token = generateJwt(user.id, user.email, user.name)

    return res.json({ token })
}

const auth = (req, res, next) => {
    const { id, email, name } = req.user
    const token = generateJwt(id, email, name)

    res.json({ token })
}

const rooms = async (req, res, next) => {
    const { id } = req.user

    const ownerRooms = await Room
        .where('owner')
        .equals(id)
        .select(["name", "_id"])

    const rooms = await Room.find()

    const guestRooms = rooms
        .filter(room => room.guests.some(guestId => guestId.toString() === id))
        .map(({ _id, name })=> ({ _id, name  }))

    res.json({ rooms: ownerRooms, guestRooms })
}

const createRoom = async (req, res, next) => {
    const { name } = req.body
    const { id: owner } = req.user

    const amountRooms = await Room.where({ owner }).count()

    if (amountRooms >= 10) {
        return next(ApiError.badRequest('You can create a maximum of 10 rooms'))
    }

    const room = await Room.create({ name, owner })

    res.json({ room })
}

const removeRoom = async (req, res, next) => {
    const room = await Room.findById(req.params.id)

    if (room.owner.toString() !== req.user.id) {
        return next(ApiError.badRequest('You cannot delete someone else\'s room'))
    }

    const removedRoom = await Room.findByIdAndDelete(req.params.id)

    res.json({ room: removedRoom })
}

module.exports = {
    registration,
    login,
    auth,
    rooms,
    createRoom,
    removeRoom
}