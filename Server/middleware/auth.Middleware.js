const userModel = require('../models/User.model')
const jwt = require('jsonwebtoken')

module.exports.authUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: "unauthorized access " })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne(decoded._id)
        if (!user) {
            return res.status(401).json({ message: "unauthorized access 123" })
        }
        req.user = user
        return next()
    }
    catch (error) {
        return res.status(401).json({ message: "unauthorized access" })
    }
}