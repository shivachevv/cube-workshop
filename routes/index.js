const Cube = require('../models/Cube')
const Accessory = require('../models/Accessory')

const {
    getCubes,
    getCube,
    searchCubes,
    updateCube
} = require('../controllers/cubes')
const {
    getAccs
} = require('../controllers/accessories')
const {
    Router
} = require('express')
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
    let cube = await getCube(req.params.id)

    res.render('details', {
        title: 'Cube Details',
        id: req.params.id,
        cube,
        isAccessory: !!cube.accessories.length
    })
})

router.post('/search', async (req, res) => {
    res.render('index', {
        title: 'Search',
        cubes: await searchCubes(req.body.name, req.body.from, req.body.to)
    })
})

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory'
    })
})
router.post('/create/accessory', (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body

    const accessory = new Accessory({
        name,
        description,
        imageUrl
    })
    accessory.save((err) => {
        if (err) {
            console.log(err);
            throw err
        } else {
            res.redirect('/')
        }
    })

})
router.get('/attach/accessory/:id', async (req, res) => {
    let cube = await getCube(req.params.id)
    let accessories = await getAccs()

    let cubesAccsToString = cube.accessories.map(x => {
        return x._id.valueOf().toString()
    })

    const notAttachedAccs = accessories.filter(acc => {
        return !cubesAccsToString.includes(acc._id.valueOf().toString())
    })

    const canAttachAccessories = accessories.length && cube.accessories.length !== accessories.length

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        id: req.params.id,
        ...cube,
        notAttachedAccs,
        canAttachAccessories
    })
})
router.post('/attach/accessory/:id', async (req, res) => {
    const {
        accessory
    } = req.body
    await updateCube(req.params.id, accessory)
    res.redirect(`/details/${req.params.id}`)
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found'
    })
})


module.exports = router