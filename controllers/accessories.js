const Accessory = require('../models/Accessory')

const getAccs = async () => {
    return await Accessory.find().lean()
}

// const getAccs = async (id) => {
//     return await Accessory.findById(id).lean()
// }

// const searchCubes = async (name, diffFrom, diffTo) => {
//     return await Cube.find({
//         name: {
//             "$regex": name || '',
//             "$options": "i"
//         },
//         difficulty: {
//             $gt: diffFrom || 0,
//             $lt: diffTo || 11
//         }
//     }).lean()
// }

module.exports = {
    getAccs,
    // getCube,
    // searchCubes
}