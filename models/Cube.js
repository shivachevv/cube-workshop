const {
    v4
} = require('uuid')
const fs = require('fs')
const dbPath = './config/database.json'

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4()
        this.name = name || 'New Cube'
        this.description = description || 'No description'
        this.imageUrl = imageUrl || ''
        this.difficulty = difficulty || 0
    }

    save() {
        const newData = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }

        fs.readFile(dbPath, (err, data) => {
            if (err) {
                throw err
            }

            const DB = JSON.parse(data)
            DB.push(newData);

            fs.writeFile(dbPath, JSON.stringify(DB), (err) => {
                if (err) throw err
                console.log(`New Cube is successfully added!\nTotal ${DB.length} cubes in Database!`);
            })
        })


    }
}

module.exports = Cube