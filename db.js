const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const process = require('./process/.env');
require('./models/provider.model.js');

mongoose.connect(process.URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('open', () => { console.log('Magically Connected to MHC') });
db.on('error', console.error.bind(console, 'MHC connection error, Threat Level: MIDNIGHT'));


module.exports = db;
