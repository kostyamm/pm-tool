require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { Server } = require('socket.io')
const { SOCKET_OPTIONS, onConnection } = require('./socket/socket-config')

const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

// Mongo setup
mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gip1z5s.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.log(err))


// App setup
const server = app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`Server started on port ${process.env.PORT}`)
})

// Socket setup
const io = new Server(server, SOCKET_OPTIONS)

io.on('connection', (socket) => {
    onConnection(io, socket)
    console.log('IO Connected')
})