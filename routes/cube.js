const {
    Router
} = require('express')
const router = Router()


router.get('/edit', (req, res) => {
    res.render('editCubePage')
})
router.get('/delete', (req, res) => {
    res.render('deleteCubePage')
})


module.exports = router