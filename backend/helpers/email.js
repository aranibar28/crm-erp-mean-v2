const Customer = require("../models/customer");
const jwt_customer = require("../helpers/jwt");

var fs = require("fs");
var handlebars = require("handlebars");
var ejs = require("ejs");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

const send_email_verify = async (email) => {
  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })
  );

  //OBTENER CLIENTE
  var customer = await Customer.findOne({ email });
  var token = jwt_customer.createTokenPublic(customer);

  readHTMLFile(process.cwd() + "/mails/account_verify.html", (err, html) => {
    let rest_html = ejs.render(html, { token: token });

    var template = handlebars.compile(rest_html);
    var htmlToSend = template({ op: true });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verificación de cuenta",
      html: htmlToSend,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        console.log("Email sent: " + info.response);
      }
    });
  });
};

module.exports = {
  send_email_verify,
};
