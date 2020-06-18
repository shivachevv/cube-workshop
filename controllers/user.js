const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const privateKey = 'MY-SOFTUNI-PROJECT-PRIVATE-KEY'
const generateToken = data => {
    return jwt.sign({
        userID: data.userID,
        username: data.username
    }, privateKey)
}


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
    const token = generateToken({
        userID: userObject._id,
        username: userObject.username
    })
    return true
}

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    const user = await User.findOne({
        username
    })
    const status = await bcrypt.compare(password, user.password)

    if (status) {
        const token = generateToken({
            userID: user._id,
            username: user.username
        })
        res.cookie('authid', token)
    }
    return true
}

const authAccess = (req, res, next) => {
    const token = req.cookies['authid']
    if (!token) {
        res.redirect('/')
    }
    try {
        const decodedObject = jwt.verify(token, privateKey)
        next()
    } catch (e) {
        res.redirect('/')
    }
}
const guestAccess = (req, res, next) => {
    const token = req.cookies['authid']
    if (token) {
        res.redirect('/')
    } else {
        next()
    }
}

const getUserStatus = (req, res, next) => {
    const token = req.cookies['authid']
    if (!token) {
        req.isLogged = false
    }
    try {
        jwt.verify(token, privateKey)
        req.isLogged = true
    } catch (e) {
        req.isLogged = false
    }
    next()
}

const authAccessJSON = (req, res, next) => {
    const token = req.cookies['authid']
    if (!token) {
        return res.json({
            error: "Not Authenticated"
        })
    }
    try {
        jwt.verify(token, privateKey)
        next()
    } catch (e) {
        return res.json({
            error: "Not Authenticated"
        })
    }
    next()
}

module.exports = {
    saveUser,
    verifyUser,
    authAccess,
    guestAccess,
    getUserStatus,
    authAccessJSON
}