const mongoose = require('mongoose')
// const mongodb = require('mongodb');
const StudentModel = require('./test-model')
const connectionStr = 'mongodb+srv://user:qweqwe123123@test-ayp6m.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(connectionStr, (err) => {
    if (err) {
        throw err
    }

    let student = {
        firstName: "Nick",
        lastName: "Taylor",
        facultyNumber: 2
    }

    new StudentModel(student).save(error => {
        if (error) {
            throw error
        }

        console.log('Student is storred!');


        StudentModel.find((err, data) => {
            console.log(data);
        })
    })
})



// const MongoClient = mongodb.MongoClient;
// const client = new MongoClient(connectionStr);

// client.connect(function (err) {
//     if (err) {
//         console.log("There is an errow with the DB");
//         throw err
//     }
//     const db = client.db('sample_airbnb');
//     const people = db.collection('listingsAndReviews');

//     people.find({
//         "_id": "10006546"
//     }).toArray((err, data) => {
//         console.log(data);
//     });
// });