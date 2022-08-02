const { response } = require("express");
const Customer = require("../models/customer");
const Customer_Call = require("../models/customers/customer_call");
const Customer_Mail = require("../models/customers/customer_mail");
const Customer_Task = require("../models/customers/customer_task");
const Customer_Activity = require("../models/customers/customer_activity");

var fs = require("fs");
var handlebars = require("handlebars");
var ejs = require("ejs");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

// Calls Customers
const create_call = async (req, res = response) => {
  let data = req.body;
  try {
    data.advisor = req.id;
    let reg = await Customer_Call.create(data);
    create_activity("Llamada", "Se registro una llamada " + data.result, data.customer, data.advisor);
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const read_calls = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Customer_Call.find({ customer: id }).populate("advisor").sort({ created_at: -1 });
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const delete_call = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Customer_Call.findByIdAndDelete(id);
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

// Mails Customers
const create_mail = async (req, res = response) => {
  let data = req.body;
  try {
    data.advisor = req.id;
    let customer = await Customer.findById({ _id: data.customer });
    let reg = await Customer_Mail.create(data);
    create_activity("Correo", "Se envió un correo con el asunto: " + data.subject, data.customer, data.advisor);
    send_email_prospect(customer.full_name, data.subject, customer.email, data.message);
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const read_mails = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Customer_Mail.find({ customer: id }).populate("advisor").sort({ created_at: -1 });
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const delete_mail = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Customer_Mail.findByIdAndDelete(id);
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const send_email_prospect = async (customer, subject, email, message) => {
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
      auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
    })
  );

  //OBTENER CLIENTE
  var customer = await Customer.findOne({ email });

  readHTMLFile(process.cwd() + "/mails/mail_message.html", (err, html) => {
    let rest_html = ejs.render(html, { cliente: customer.full_name, asunto: subject, email: email, contenido: message });

    var template = handlebars.compile(rest_html);
    var htmlToSend = template({ op: true });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: htmlToSend,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        console.log("Email sent: " + info.response);
      }
    });
  });
};

// Taks Customers
const create_task = async (req, res = response) => {
  let data = req.body;
  try {
    let reg = await Customer_Task.create(data);
    create_activity("Tarea", "Se registro una tarea como " + data.title, data.customer, req.id);
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const read_tasks = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Customer_Task.find({ customer: id }).populate("advisor").populate("advisor_make").sort({ created_at: -1 });
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const delete_task = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Customer_Task.findByIdAndDelete(id);
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const make_task = async (req, res = response) => {
  let id = req.params["id"];
  try {
    var date_now = new Date();
    let reg = await Customer_Task.findByIdAndUpdate({ _id: id }, { status: true, advisor_date: date_now, advisor_make: req.id });
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

// Activities Customers
const create_activity = async (type, activity, customer, advisor) => {
  let data = { type, activity, customer, advisor };
  await Customer_Activity.create(data);
};

const list_activities = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Customer_Activity.find({ customer: id }).populate("advisor").sort({ created_at: -1 });
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = {
  create_call,
  create_mail,
  create_task,
  read_calls,
  read_mails,
  read_tasks,
  delete_call,
  delete_mail,
  delete_task,
  make_task,
  list_activities,
};
