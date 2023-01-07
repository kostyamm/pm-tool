const { Schema, model, Types } = require('mongoose')

const roomSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'user', required: true },
    guests: [{ type: Types.ObjectId, ref: 'user' }],
}, { timestamps: true })

const Room = model('room', roomSchema)

module.exports = Room