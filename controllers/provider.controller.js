const Provider = require('../models/provider.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const handleError = require('../handlers/handleError');
const flashes = require('connect-flash');
const db = require('../db');


// CREATE/UPDATE
exports.addProvider = async (req, res) => {
  console.log(req.body.name);
  console.log(req.body.profession);
  console.log(req.body.specialties);
  console.log(req.body.email);
  console.log(req.body.phone);
  console.log(req.body.address);
  console.log(req.body.password);

  if (req.body.id) {
    let provider = await Provider.findByIdAndUpdate(req.body.id, req.body).lean();
    console.log(req.body);
    req.flash('info', 'Provider Updated');
    }
    else {
    let provider = new Provider(req.body);
    await provider.save();
    req.flash('info', 'provider added!');
  }
  res.redirect('/');
};
exports.getAll = async(req, res, next) => {
  let allProviders = await Providers.find({}).lean();
  res.send([allProviders]);
  next();
};

exports.listProvidersPage = async (req, res) => {
  let mainHeader = 'Provider List';

  let providers = await Provider.find({}).lean();

  // let email = req.User ? req.User.email : 'Not logged in';

  res.render('list', { header: mainHeader, providers});
};

//ADD UPDATE PAGE
exports.addUpdateProviderPage = async (req, res) => {
  if (req.params.id) {
    let provider = await Provider.findById(req.params.id).lean();
    res.render('addUpdate', { provider, flashes });
  } else {
    res.render('addUpdate');
  }
};

exports.getOne = async(req, res) => {
  const foundProvider = await Provider.findById(req.params.id).lean();
  if(!foundProvider) {
    res.status(404).send();
  }
  else {
  res.send(foundProvider);
}
};

exports.profilePage = async(req, res) => {
  let mainHeader = `Provider Profile:`

  const profile = await Provider.findById(req.params.id).lean();
  res.render('profile', { header: mainHeader, profile});
};

//REQUEST INFO
// exports.request = async(req, res) => {
//   let provider = await Provider.findById(req.params.id).lean();
//     let mail = req.body;
//     transport.sendMail(mail);
//     req.flash('info', { provider, message, flashes});
// };
exports.request = async(req, res) => {
  let mainHeader = 'Request Information';
  let provider = await Provider.findById(req.params.id).lean();
  //let name = provider.name;
    //send info with modemailer
  res.render('request', {header: mainHeader, provider, flashes });
  };




//COMMENTS
exports.addComment = async (req, res) => {
  let provider = await Provider.findById(req.params.id).lean();

  provider.comments.push({ body: 'test comment', date: Date.now(), author: req.user._id });
  let comment = Provider.comments[0];
  console.log(comment);

  provider.save(function (err) {
    if (err) return handleError(err)
    console.log('Success!');
  });
  req.flash('info', 'comment added!');
  res.redirect(`/profile/${req.params.id}`);
};

exports.deleteComment = async(req, res) => {
  let comment = await Provider.comments.id(_id).remove();
  comment.remove();
  Provider.save(function (err) {
      if (err) return handleError(err);
      req.flash('info', 'comment removed');
  })
};

//FIND BY PROFESSION
exports.findProfessionPage = (req, res) => {
  res.render('search');
};

exports.findByProfession = async (req, res) => {

  try {
    const professionals = await Provider.find({
      profession: { $in: req.body.professions },
    });
    return res.send(professionals);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }

};

exports.deleteProvider = async (req, res) => {
  let provider = await Provider.findByIdAndDelete(req.params.id);
  req.flash('info', 'provider deleted');
  res.redirect('/');
};
// instance
// console.log(Provider.findById('6092ca017f0e49dc6b0c'));
