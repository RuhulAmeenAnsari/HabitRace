const userModel = require('../models/User.model')

module.exports.createUser = async ({ name, email, password }) => {

    if (!name || !email || !password) {
        throw new Error("all fields are required")
    }
    const user = await userModel.create({
        name,
        email,
        password
    })

    return user

}