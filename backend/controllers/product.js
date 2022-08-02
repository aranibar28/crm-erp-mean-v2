const { response } = require("express");
const Product = require("../models/products/product");
var path = require("path");
var fs = require("fs");

// localhost:3000/api/products/image/default.png //
const image = async (req, res = response) => {
  let img = req.params["img"];
  fs.stat("./uploads/products/" + img, (err) => {
    if (!err) {
      let path_img = "./uploads/products/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.png";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const generate_slug = (item) => {
  return item
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const create_product = async (req, res = response) => {
  let data = req.body;
  try {
    var img_path = req.files["image"].path;
    var str_path = img_path.split("\\");
    var img_name = str_path[2];
    var exist_title = await Product.findOne({ title: data.title });

    if (exist_title) {
      fs.unlink("./uploads/products/" + img_name, (err) => {
        if (err) throw err;
      });
      return res.json({ msg: "Este título ya se encuentra registrado." });
    } else {
      data.created_by = req.id;
      data.image = img_name;
      data.stock = 0;
      data.price = 0;
      data.slug = generate_slug(data.title);
      let reg = await Product.create(data);
      return res.json({ data: reg });
    }
  } catch (error) {
    res.json({ data: undefined, msg: error.message });
  }
};

module.exports = {
  create_product,
  image,
};
