const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
require('./models/provider.model.js');

mongoose.connect('mongodb+srv://devLadyKatie:YBhYi3cqZyXm6Ae@cluster0.87m7nu3.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('open', () => { console.log('Magically Connected to MHC') });
db.on('error', console.error.bind(console, 'MHC connection error, Threat Level: MIDNIGHT'));


// db.collection('Provider').insertOne({

//     "name": "Dr. Pepper",
//     "profession": "Medicine Man",
//     "specialties": ["soda", "bubbles"],
//     "email": "pepper@doctorOffice.com",
//     "phone": "999 - 7777",
//     "address": "123 Cherry St.",
//     "password": "123cherry",
//     "coments": [{ "comment": "This man is a genius!", "author": "itsfakemon" }]
// });

// const cursor = db.collection('Provider').find({ name: 'Dr. Pepper' });
module.exports = db;


// run index.js