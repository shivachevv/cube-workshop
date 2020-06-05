// TODO: Require Controllers...

const {getCubes, getCube} = require('../controllers/cubes')
const {
    Router
} = require('express')


const router = Router()
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Cube Workshop',
        cubes: getCubes()
    })
})
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    })
})
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Cube'
    })
})
router.get('/details/:id', (req, res) => {    
    res.render('details', {
        title: 'Cube Details',
        cube:getCube(req.params.id)
    })
})
router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found'
    })
})



module.exports = router