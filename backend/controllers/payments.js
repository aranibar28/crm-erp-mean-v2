const { response } = require("express");
const Payment = require("../models/payments");
const Inscription_Comment = require("../models/inscription_comments");

const create_inscription_payment = async (req, res = response) => {
  let data = req.body;
  data.advisor = req.id;
  data.status = "Aprobado";

  try {
    if (data.destination != "Matricula") {
      data.inscription_detail = data.destination;
    }
    let pays = await Payment.find().sort({ created_at: -1 });
    if (pays.length == 0) {
      data.correlative = 1;
      let reg = await Payment.create(data);
      register_activity(`Se generó un pago de S/. ${data.amount}`, req.id, data.inscription);
      res.json({ data: reg });
    } else {
      let last_correlative = pays[0].correlative;
      data.correlative = last_correlative + 1;
      let reg = await Payment.create(data);
      register_activity(`Se generó un pago de S/. ${data.amount}`, req.id, data.inscription);
      res.json({ data: reg });
    }
  } catch (error) {
    res.json({ data: undefined, msg: error.message });
  }
};

const read_inscription_payments = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Payment.find({ inscription: id }).populate({
      path: "inscription_detail",
      populate: {
        path: "course",
      },
    });
    res.json({ data: reg });
  } catch (error) {
    res.json({ data: undefined, msg: error.message });
  }
};

const register_activity = async (activity, collaborator, inscription) => {
  await Inscription_Comment.create({
    activity: activity,
    collaborator: collaborator,
    inscription: inscription,
  });
};

module.exports = {
  create_inscription_payment,
  read_inscription_payments,
};
