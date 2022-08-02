const { response } = require("express");
const bcrypt = require("bcryptjs");
const Collaborator = require("../models/collaborator");
var path = require("path");
var fs = require("fs");

// localhost:3000/api/collaborators/image/default.png //
const image = async (req, res = response) => {
  let img = req.params["img"];
  fs.stat("./uploads/collaborators/" + img, (err) => {
    if (!err) {
      let path_img = "./uploads/collaborators/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/profile.webp";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const create_collaborator = async (req, res = response) => {
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

const read_collaborators = async (req, res = response) => {
  let reg = await Collaborator.find();
  res.json({ data: reg });
};

const read_collaborator_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Collaborator.findById(id);
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const update_collaborator = async (req, res = response) => {
  let id = req.params["id"];
  let user = await Collaborator.findById(id);
  const { email, password, ...data } = req.body;

  try {
    if (user.email !== email) {
      var exist_email = await Collaborator.findOne({ email });
      if (exist_email) {
        return res.json({ msg: "Este correo ya se encuentra registrado." });
      } else {
        data.email = email;
      }
    }

    if (user.password != password) {
      var new_password = bcrypt.hashSync(password, bcrypt.genSaltSync()); // Encriptación de la nueva contraseña
      data.password = new_password;
    } else {
      data.password = password;
    }

    data.full_name = data.first_name + " " + data.last_name;
    let reg = await Collaborator.findByIdAndUpdate(id, data, { new: true });
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const delete_collaborator = async (req, res = response) => {
  let id = req.params["id"];
  try {
    if (req.id == id) {
      res.json({ msg: "No puedes eliminarte tu mismo." });
    } else {
      let reg = await Collaborator.findByIdAndDelete(id);
      res.json({ data: reg });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const change_status = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;
  try {
    if (req.id == id) {
      res.json({ msg: "No puedes desactivarte tu mismo." });
    } else {
      var new_status = data.status ? false : true;
      reg = await Collaborator.findByIdAndUpdate(id, { status: new_status });
      res.json({ data: reg });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = {
  create_collaborator,
  read_collaborators,
  read_collaborator_by_id,
  update_collaborator,
  delete_collaborator,
  change_status,
  image,
};
