const Cube = require('../models/Cube')
const {
    getCubes,
    getCube,
    // saveCube,
    searchCubes
} = require('../controllers/cubes')
const {Router}= require('express')
const router = Router()

router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Cube Workshop',
        cubes: await getCubes()
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

    const cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty
    })
    cube.save((err) => {
        if (err) {
            console.log(err);
            throw err
        } else {
            res.redirect('/')
        }
    })
})

router.get('/details/:id', async (req, res) => {
    let a = await getCube(req.params.id)
    
    res.render('details', {
        title: 'Cube Details',
        cube: await getCube(req.params.id)
    })
})

router.post('/search', async (req, res) => {
    console.log(req.body);
    
    res.render('index', {
        title: 'Search',
        cubes: await searchCubes(req.body.name, req.body.from, req.body.to)
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found'
    })
})


module.exports = router