const Cube = require('../models/Cube')
const Accessory = require('../models/Accessory')
const jwt = require("jsonwebtoken");
const privateKey = 'MY-SOFTUNI-PROJECT-PRIVATE-KEY'
const {
    authAccess,
    getUserStatus,
    authAccessJSON
} = require('../controllers/user')
const {
    getCubes,
    getCube,
    searchCubes,
    updateCubeAccessories,
} = require('../controllers/cubes')
const {
    getAccs
} = require('../controllers/accessories')
const {
    Router
} = require('express')
const router = Router()

router.get('/', getUserStatus, async (req, res) => {
    res.render('index', {
        title: 'Cube Workshop',
        cubes: await getCubes(),
        isLogged: req.isLogged
    })
})

router.get('/about', getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About Page',
        isLogged: req.isLogged

    })
})

router.get('/create', authAccess, getUserStatus, (req, res) => {
    res.render('create', {
        title: 'Create Cube',
        isLogged: req.isLogged
    })
})
router.post('/create', authAccessJSON, (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body

    const token = req.cookies['authid']
    const decodedObj = jwt.verify(token, privateKey)

    const cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty,
        creatorId: decodedObj.userID
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

router.get('/details/:id', getUserStatus, async (req, res) => {
    let cube = await getCube(req.params.id)

    res.render('details', {
        title: 'Cube Details',
        id: req.params.id,
        cube,
        isAccessory: !!cube.accessories.length,
        isLogged: req.isLogged
    })
})

router.post('/search', async (req, res) => {
    res.render('index', {
        title: 'Search',
        cubes: await searchCubes(req.body.name, req.body.from, req.body.to)
    })
})

router.get('/create/accessory', authAccess, getUserStatus, (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory',
        isLogged: req.isLogged
    })
})
router.post('/create/accessory', authAccessJSON, (req, res) => {
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
router.get('/attach/accessory/:id', authAccess, getUserStatus, async (req, res) => {
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
        canAttachAccessories,
        isLogged: req.isLogged
    })
})
router.post('/attach/accessory/:id', authAccessJSON, async (req, res) => {
    const {
        accessory
    } = req.body
    await updateCubeAccessories(req.params.id, accessory)
    res.redirect(`/details/${req.params.id}`)
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found'
    })
})


module.exports = router