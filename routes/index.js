// TODO: Require Controllers...

const {
    getCubes,
    getCube,
    saveCube,
    searchCubes
} = require('../controllers/cubes')
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
router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body

    saveCube(name, description, imageUrl, difficulty)

    res.redirect('/')
})
router.get('/details/:id', (req, res) => {
    res.render('details', {
        title: 'Cube Details',
        cube: getCube(req.params.id)
    })
})
router.post('/search', (req, res) => {
    
    res.render('index', {
        title: 'Search',
        cubes: searchCubes(req.body.search)
    })})
router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found'
    })
})



module.exports = router