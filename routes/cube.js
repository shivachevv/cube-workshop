const {
    Router
} = require('express')
const router = Router()
const {
    getCubes,
    getCube,
    searchCubes,
    updateCubeAccessories,
    updateCube,
    deleteCube
} = require('../controllers/cubes')
const {
    authAccess,
    getUserStatus,
    authAccessJSON
} = require('../controllers/user')

router.get('/edit/:id', authAccess, getUserStatus, async (req, res) => {
    let cube = await getCube(req.params.id)

    res.render('editCubePage', {
        cube,
        id: req.params.id
    })
})
router.post('/edit/:id', async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body
    const updated = {
        name,
        description,
        imageUrl,
        difficulty
    }
    await updateCube(req.params.id, updated)
    res.redirect('/')
})

router.get('/delete/:id', authAccess, getUserStatus, async (req, res) => {
    let cube = await getCube(req.params.id)
    res.render('deleteCubePage', {
        cube,
        id: req.params.id
    })
})
router.post('/delete/:id', async (req, res) => {
    await deleteCube(req.params.id)
    res.redirect('/')
})


module.exports = router