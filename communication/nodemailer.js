const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e2623d35835010",
    pass: "182a19a11ce287",
  },
});
const mail = {
  from: 'me@me.com',
  to: 'you@you.com',
  subject: 'hello',
  message: 'I would like more information about your services.',
  html: "<h1> Hello! I would like more information on your services. </h1>",
}

transport.sendMail(mail);

module.exports = transport;