const fs = require('fs')
const path = require('path')
const dbFile = path.join(__dirname, '..', 'config/database.json')
const Cube = require('../models/Cube')


const getCubes = () => {
    const cubes = fs.readFileSync(dbFile)
    return JSON.parse(cubes)
}

const getCube = (id) => {
    const cubes = JSON.parse(fs.readFileSync(dbFile))
    let result = ''
    for (let i = 0; i < cubes.length; i++) {        
        if (cubes[i].id === id) {
            result = cubes[i]
        }
    }    
    return result
}

const saveCube = (name, description, imageUrl, difficulty) => {
    const newCube = new Cube(name, description, imageUrl, difficulty)
    
    return newCube.save()
}


module.exports = {
    getCubes,
    getCube
}