const { response } = require("express");
const Collaborator = require("../models/collaborator");
const Customer = require("../models/customer");
const bcrypt = require("bcryptjs");
const verify = require("../helpers/email");
const jwt = require("../helpers/jwt");

const login_collaborator = async (req, res = response) => {
  let { email, password } = req.body;
  try {
    let user = await Collaborator.findOne({ email });
    if (!user) {
      return res.json({ msg: "Este correo no existe en la base de datos." });
    } else {
      var valid_password = bcrypt.compareSync(password, user.password);
      if (!valid_password) {
        return res.json({ msg: "La contraseña es incorrecta." });
      } else {
        if (!user.status) {
          return res.json({ msg: "El usuario no tiene acceso al sistema." });
        } else {
          const token = jwt.createToken(user);
          return res.json({ data: user, token });
        }
      }
    }
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

const register_collaborator = async (req, res = response) => {
  let data = req.body;
  try {
    var exist_email = await Collaborator.findOne({ email: data.email });
    if (exist_email) {
      return res.json({ msg: "Este correo ya se encuentra registrado." });
    } else {
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
      data.full_name = data.first_name + " " + data.last_name;
      let reg = await Collaborator.create(data);
      return res.json({ data: reg });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const login_customer = async (req, res = response) => {
  let { email, password } = req.body;
  try {
    let user = await Customer.findOne({ email });
    if (!user) {
      return res.json({ msg: "Este correo no existe en la base de datos." });
    } else {
      var valid_password = bcrypt.compareSync(password, user.password);
      if (!valid_password) {
        return res.json({ msg: "La contraseña es incorrecta." });
      } else {
        if (!user.status) {
          return res.json({ msg: "El usuario no tiene acceso al sistema." });
        } else {
          const token = jwt.createToken(user);
          return res.json({ data: user, token });
        }
      }
    }
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

const register_customer = async (req, res = response) => {
  let data = req.body;
  try {
    var exist_email = await Customer.findOne({ email: data.email });
    if (exist_email) {
      return res.json({ msg: "Este correo ya se encuentra registrado." });
    } else {
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
      data.full_name = data.first_name + " " + data.last_name;
      let reg = await Customer.create(data);
      verify.send_email_verify(data.email); // <--- Email Verify
      return res.json({ data: reg });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = {
  login_collaborator,
  register_collaborator,
  login_customer,
  register_customer,
};
