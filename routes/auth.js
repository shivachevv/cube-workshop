const {
    Router
} = require('express')
const router = Router()
const {saveUser} = require('../controllers/user')

router.get('/login', (req, res) => {
    res.render('loginPage')
})

router.get('/register', (req, res) => {
    res.render('registerPage')
})
router.post('/register', async (req, res) => {
    

    const status = await saveUser(req, res)

    if (status) res.redirect('/')

})


module.exports = router