const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({message: 'Not authorized'})
        }

        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()

    } catch (e) {
        res.status(401).json({message: 'Token is not valid'})
    }
}