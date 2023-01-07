const User = require('../models/User')
const Room = require('../models/Room')

const getRoomById = async (req, res, next) => {
    const room = await Room.findById(req.params.id)
    room.guests = await User
        .find({ '_id': { $in: [...room.guests] } })
        .select(["email", "name", "_id"])
    room.owner = await User
        .findById(room.owner)
        .select(["email", "name", "_id"])

    res.json({ room })
}

const addGuest = async (req, res, next) => {
    const room = await Room.findById(req.params.id)
    const hasUser = room.guests?.some(id => id.toString() === req.user.id)

    if (hasUser) {
        return res.json({ room })
    }

    await Room.findByIdAndUpdate(req.params.id, { guests: [...room.guests, req.user.id] })

    await getRoomById(req, res, next)
}

module.exports = {
    getRoomById,
    addGuest,
}