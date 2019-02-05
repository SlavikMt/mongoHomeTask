const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const api = require('./routes');

const app = express();

let url = 'mongodb://localhost:27017/tc-mongo-homework';
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', api);


let port = 3000;

app.listen(port, () => {
    console.log(`server is running at port:${port}`)
})