const { response } = require("express");
const Course = require("../models/course");
const Cycle_Course = require("../models/cycles/cycle_course");
const Cycle_Instructor = require("../models/cycles/cycle_instructor");
const Cycle_Room = require("../models/cycles/cycle_room");
var path = require("path");
var fs = require("fs");

// localhost:3000/api/categories/image/default.png //
const image = async (req, res = response) => {
  let img = req.params["img"];
  fs.stat("./uploads/courses/" + img, (err) => {
    if (!err) {
      let path_img = "./uploads/courses/" + img;
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

const create_course = async (req, res = response) => {
  let data = req.body;
  try {
    var exist_title = await Course.findOne({ title: data.title });
    if (exist_title) {
      return res.json({ msg: "Este título ya se encuentra registrado." });
    } else {
      var img_path = req.files["image"].path;
      var str_path = img_path.split("\\");
      var image_name = str_path[2];
      data.image = image_name;
      data.slug = generate_slug(data.title);
      let reg = await Course.create(data);
      return res.json({ data: reg });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const read_courses = async (req, res = response) => {
  let reg = await Course.find().sort({ title: -1 });
  res.json({ data: reg });
};

const read_course_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Course.findById(id);
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const update_course = async (req, res = response) => {
  let id = req.params["id"];
  let course = await Course.findById(id);
  let { title, ...data } = req.body;

  try {
    if (course.title !== title) {
      var exist_title = await Course.findOne({ title });
      if (exist_title) {
        return res.json({ msg: "Este título ya se encuentra registrado." });
      }
    }

    data.title = title;
    data.slug = generate_slug(title);

    if (req.files) {
      var img_path = req.files.image.path;
      var name = img_path.split("\\");
      var image = name[2];
      let reg = await Course.findByIdAndUpdate(id, { ...data, image });
      fs.stat("./uploads/courses/" + reg.image, (err) => {
        if (!err) {
          fs.unlink("./uploads/courses/" + reg.image, (err) => {
            if (err) throw err;
          });
        }
      });
      res.json({ data: reg });
    } else {
      let reg = await Course.findByIdAndUpdate(id, data);
      res.send({ data: reg });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const delete_course = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Course.findByIdAndDelete(id);
    fs.stat("./uploads/courses/" + reg.image, (err) => {
      if (!err) {
        fs.unlink("./uploads/courses/" + reg.image, (err) => {
          if (err) throw err;
        });
      }
    });
    res.status(200).json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const change_status = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;
  var new_status = data.status ? false : true;
  reg = await Course.findByIdAndUpdate(id, { status: new_status });
  res.json({ data: reg });
};

const list_courses = async (req, res = response) => {
  let reg = await Course.find({ status: true }).sort({ title: -1 }).select("_id title");
  res.json({ data: reg });
};

module.exports = {
  image,
  create_course,
  read_courses,
  read_course_by_id,
  update_course,
  delete_course,
  change_status,
  list_courses,
};
