const Cube = require('../models/Cube')
const mongoose = require('mongoose');

const getCubes = async () => {
    return await Cube.find().lean()
}

const getCube = async (id) => {
    return await Cube.findById(id).populate('accessories').lean()
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

const updateCube = async (cubeId, accId) => {
    return await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [accId]
        }
    }).catch(err => {
        console.log('accesory error', err);
    })
}

module.exports = {
    getCubes,
    getCube,
    searchCubes,
    updateCube
}