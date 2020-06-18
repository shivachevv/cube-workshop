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

const updateCubeAccessories = async (cubeId, accId) => {
    return await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [accId]
        }
    }).catch(err => {
        console.log('accesory error', err);
    })
}

const updateCube = async (cubeId, updated) => {
    return await Cube.findByIdAndUpdate(cubeId,
            updated, {
                useFindAndModify: false
            }
        )
        .catch(err => {
            console.log('cube update error', err);
        })
}

const deleteCube = async (id) => {
    return await Cube.findByIdAndDelete({
            _id: id
        })
        .catch(err => {
            console.log('cube update error', err);
        })
}

module.exports = {
    getCubes,
    getCube,
    searchCubes,
    updateCubeAccessories,
    updateCube,
    deleteCube
}