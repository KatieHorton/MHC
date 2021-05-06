const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = require('../db');
const User = require("./user.model");


//DEFINE SCHEMA
const providerSchema =  mongoose.Schema({
    name:  String,
    profession: String,
    specialties: [String],   
    email: String,   
    phone: String,
    address: String,
    password: String,
    comments : 
       
           [
               {
               comment: String,
               author: String,
           }

        ],
        created: { type: Date, default: Date.now },
},
      { timestamps: true }

);

const Provider = mongoose.model('provider', providerSchema);
module.exports = Provider;

