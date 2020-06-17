const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const privateKey = 'MY-SOFTUNI-PROJECT-PRIVATE-KEY'

const saveUser = async (req, res) => {
    const {
        username,
        password
    } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({
        username,
        password: hashedPassword
    })
    const userObject = await user.save()
    const token = jwt.sign({
        userID: userObject._id,
        username: userObject.username
    }, privateKey)

    res.cookie('authid', token)
    return true
}

module.exports = {
    saveUser
}