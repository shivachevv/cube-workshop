const mongoose = require('mongoose')

// class Cube {
//     constructor(name, description, imageUrl, difficulty) {
//         this.id = v4()
//         this.name = name || 'New Cube'
//         this.description = description || 'No description'
//         this.imageUrl = imageUrl || ''
//         this.difficulty = difficulty || 0
//     }
// }

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    imageUrl: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    accessories: [{
        type: 'ObjectId',
        ref: 'Accessory'
    }]
})

module.exports = mongoose.model('Cube', CubeSchema)