const env = process.env.NODE_ENV || 'development';
const mongoose = require('mongoose')
const config = require('./config/config')[env];
const express = require('express');
const indexRouter = require('./routes')
const app = express()

require('./config/express')(app);
app.use('/', indexRouter)

mongoose.connect(config.databaseUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        throw err
    } else {
        console.log('Database connected!');
    }
})



app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));