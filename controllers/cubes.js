const Cube = require('../models/Cube')

const getCubes = async () => {
    return await Cube.find().lean()
}

const getCube = async (id) => {
    return await Cube.findById(id).lean()
}

const searchCubes = async (name, diffFrom, diffTo) => {
    return await Cube.find({
        name: {
            "$regex": name || '',
            "$options": "i"
        },
        difficulty: {
            $gt: diffFrom || 0,
            $lt: diffTo || 11
        }
    }).lean()
}

module.exports = {
    getCubes,
    getCube,
    // saveCube,
    searchCubes
}