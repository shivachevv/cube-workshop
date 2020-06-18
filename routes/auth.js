const {
    Router
} = require('express')
const router = Router()
const {
    saveUser,
    verifyUser,
    guestAccess,
    getUserStatus
} = require('../controllers/user')

router.get('/login', guestAccess, getUserStatus, (req, res) => {
    res.render('loginPage', {
        isLogged: req.isLogged
    })
})
router.post('/login', async (req, res) => {

    const status = await verifyUser(req, res)

    if (status) res.redirect('/')

})


router.get('/register', guestAccess, getUserStatus, (req, res) => {
    res.render('registerPage', {
        isLogged: req.isLogged
    })
})
router.post('/register', async (req, res) => {

    const status = await saveUser(req, res)

    if (status) res.redirect('/')

})

router.get('/logout', (req, res) => {
    const token = req.cookies['authid']
    if (token) {
        res.clearCookie("authid");
        res.redirect('/')
    } 
})


module.exports = router