const userModel = require('../models/User.model')
const jwt = require('jsonwebtoken')

module.exports.authUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: "unauthorized access 1 " })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
     
        const user = await userModel.findById( decoded.id)
        
        if (!user) {
            return res.status(401).json({ message: "unauthorized access 2" })
        }
        req.user = user
        req.userId = decoded.id
        return next()
    }
    catch (error) {
        return res.status(401).json({ message: "unauthorized access 3" })
    }
}