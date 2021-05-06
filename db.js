const mongoose = require('mongoose');
const env = require('./.env');
const { MongoClient } = require("mongodb");

mongoose.connect(env.URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('open', () => { console.log('Magically Connected to MHC') });
db.on('error', console.error.bind(console, 'MHC connection error, Threat Level: MIDNIGHT'));


module.exports = db;