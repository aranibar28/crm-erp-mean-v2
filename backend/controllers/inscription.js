const { response } = require("express");
const moment = require("moment");
const Inscription = require("../models/inscription");
const Inscription_Detail = require("../models/inscription_detail");
const Inscription_Comment = require("../models/inscription_comments");
const Payment = require("../models/payments");
const Cycle_Room = require("../models/cycles/cycle_room");

var fs = require("fs");
var handlebars = require("handlebars");
var ejs = require("ejs");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

const create_inscription = async (req, res = response) => {
  let data = req.body;
  try {
    data.advisor = req.id;
    data.day = moment().format("DD");
    data.month = moment().format("MM");
    data.year = moment().format("YYYY");
    let reg = await Inscription.create(data);

    for (let item of data.details) {
      item.advisor = req.id;
      item.customer = data.customer;
      item.inscription = reg._id;
      item.day = moment().format("DD");
      item.month = moment().format("MM");
      item.year = moment().format("YYYY");
      await Inscription_Detail.create(item);
      update_aforo(item.cycle_room);
    }
    register_activity("Se registró la matrícula del cliente", req.id, reg._id);
    //send_email_invoice(reg._id);
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const read_inscriptions_today = async (req, res = response) => {
  try {
    let day = moment().format("DD");
    let month = moment().format("MM");
    let year = moment().format("YYYY");

    let reg = await Inscription.find({ day, month, year }).populate("customer").populate("advisor").sort({ created_at: -1 });
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const read_inscriptions_dates = async (req, res = response) => {
  try {
    let advisor = req.params["advisor"];
    let from = req.params["from"];
    let to = req.params["to"];
    let reg = [];

    if (advisor == "all") {
      reg = await Inscription.find({
        created_at: {
          $gte: new Date(from + "T00:00:00"),
          $lte: new Date(to + "T23:59:59"),
        },
      })
        .populate("customer")
        .populate("advisor")
        .sort({ created_at: -1 });
    } else {
      reg = await Inscription.find({
        created_at: {
          $gte: new Date(from + "T00:00:00"),
          $lte: new Date(to + "T23:59:59"),
        },
        advisor,
      })
        .populate("customer")
        .populate("advisor")
        .sort({ created_at: -1 });
    }

    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const read_inscription_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let inscription = await Inscription.findById(id).populate("customer").populate("advisor");
    let details = await Inscription_Detail.find({ inscription: id }).populate("course").populate("cycle_course").populate("cycle_room");
    res.json({ data: inscription, details: details });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const send_invoice = async (req, res = response) => {
  let id = req.params["id"];
  send_email_invoice(id);
  register_activity("El reenvió la orden al cliente", req.id, id);
  res.status(200).send({ data: true });
};

const firm_inscription = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;
  try {
    await Inscription.findByIdAndUpdate(id, {
      firm: data.firm,
      date_firm: Date.now(),
    });
    register_activity("El cliente firmó el contrato de la matrícula", req.id, id);
    res.json({ data: true });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const cancel_inscription = async (req, res = response) => {
  let id = req.params["id"];
  try {
    if (req.role === "Administrador") {
      let reg = await Inscription.findByIdAndUpdate(id, { status: "Cancelado" });
      let details = await Inscription_Detail.find({ inscription: id });
      for (let item of details) {
        cancel_aforo(item.cycle_room);
      }
      await Inscription_Detail.updateMany({ inscription: id }, { status: "Cancelado" });
      await Payment.updateMany({ inscription: id }, { status: "Cancelado" });
      register_activity("El cliente canceló la matrícula", req.id, id);
      res.json({ data: reg });
    } else {
      res.json({ msg: "No tienes permisos para esta acción." });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const list_comments = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Inscription_Comment.find({ inscription: id }).sort({ created_at: -1 });
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

////////////////////////////////////////////////////////

const update_aforo = async (id) => {
  let room = await Cycle_Room.findById(id);
  let new_aforo = room.students + 1;
  await Cycle_Room.findByIdAndUpdate(id, { students: new_aforo });
};

const cancel_aforo = async (id) => {
  let room = await Cycle_Room.findById(id);
  let new_aforo = room.students - 1;
  await Cycle_Room.findByIdAndUpdate(id, { students: new_aforo });
};

const send_email_invoice = async (id) => {
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

  //OBTENER MATRICULA
  let inscription = await Inscription.findById(id).populate("customer").populate("advisor");
  let details = await Inscription_Detail.find({ inscription: id }).populate("course").populate("cycle_course").populate("cycle_room");
  let created_at = moment(inscription.created_at).format("DD/MM/YYYY");

  readHTMLFile(process.cwd() + "/mails/electronic_invoice.html", (err, html) => {
    let rest_html = ejs.render(html, { inscription, details, created_at });

    var template = handlebars.compile(rest_html);
    var htmlToSend = template({ op: true });

    var mailOptions = {
      from: process.env.EMAIL,
      to: inscription.customer.email,
      subject: "Orden de Matrícula",
      html: htmlToSend,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        console.log("Email sent: " + info.response);
      }
    });
  });
};

const register_activity = async (activity, collaborator, inscription) => {
  await Inscription_Comment.create({
    activity: activity,
    collaborator: collaborator,
    inscription: inscription,
  });
};

module.exports = {
  create_inscription,
  read_inscriptions_today,
  read_inscriptions_dates,
  read_inscription_by_id,
  send_invoice,
  firm_inscription,
  cancel_inscription,
  list_comments,
};
