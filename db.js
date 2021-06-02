const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const { URI } = require('./config/dev');

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('open', () => { console.log('Magically Connected to MHC') });
db.on('error', console.error.bind(console, 'MHC connection error, Threat Level: MIDNIGHT'));


module.exports = db;