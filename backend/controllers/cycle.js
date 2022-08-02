const { response } = require("express");
const Course = require("../models/course");
const Cycle_Course = require("../models/cycles/cycle_course");
const Cycle_Instructor = require("../models/cycles/cycle_instructor");
const Cycle_Room = require("../models/cycles/cycle_room");
var moment = require("moment");

const create_cycle = async (req, res = response) => {
  let data = req.body;
  try {
    let start_format = new Date(data.start_date + "T00:00:00");
    let final_format = new Date(data.final_date + "T23:59:59");
    let start_month = start_format.getMonth() + 1;
    let final_month = final_format.getMonth() + 1;

    // Obtener meses entre dos rangos de fechas
    let arr_months = [];
    if (start_month != final_month) {
      if (start_month >= final_month) {
        for (let i = start_month; i <= 12; i++) {
          arr_months.push(i);
        }
        for (let i = 1; i <= final_month; i++) {
          arr_months.push(i);
        }
      } else {
        for (let i = start_month; i <= final_month; i++) {
          arr_months.push(i);
        }
      }
    } else {
      arr_months.push(start_month);
    }

    // Calcular fecha de inscripción
    data.inscription = moment(start_format).subtract(14, "days").format("YYYY-MM-DD");

    data.months = arr_months;
    data.year = start_format.getFullYear();
    data.collaborator = req.id;

    let reg = await Cycle_Course.create(data);

    // Crear salones automáticamente
    let rooms = data.frequency;
    for (var item of rooms) {
      await Cycle_Room.create({
        room: item.room,
        frequency: item.frequency,
        start_time: item.start_time,
        final_time: item.final_time,
        aforo: item.aforo,
        course: data.course,
        cycle_course: reg._id,
        collaborator: data.collaborator,
      });
    }
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const read_cycle_by_id = async (req, res = response) => {
  let id_course = req.params["id"];
  let id_cycle = req.params["id_cycle"];

  try {
    let course = await Course.findById(id_course);
    try {
      let cycle = await Cycle_Course.findById({ _id: id_cycle });
      let rooms = await Cycle_Room.find({ cycle_course: id_cycle });
      res.json({ data: course, cycle, rooms });
    } catch (error) {
      res.json({ msg: error.message });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const read_current_cycles = async (req, res = response) => {
  let id = req.params["id"];

  let date = new Date();
  let year = date.getFullYear();
  let today_format = Date.parse(new Date()) / 1000;

  let cycles = await Cycle_Course.find({ course: id, year }).populate("course");
  var arr_cycles = [];

  for (var item of cycles) {
    let start_format = Date.parse(new Date(item.inscription + "T00:00:00")) / 1000;
    let final_format = Date.parse(new Date(item.final_date + "T00:00:00")) / 1000;
    if ((today_format >= start_format && today_format <= final_format) || today_format < final_format) {
      let rooms = await Cycle_Room.find({ cycle_course: item._id });
      arr_cycles.push({
        cycle: item,
        rooms: rooms,
      });
    }
  }
  res.json({ data: arr_cycles });
};

const read_expired_cycles = async (req, res = response) => {
  let id = req.params["id"];

  let date = new Date();
  let year = date.getFullYear();
  let today_format = Date.parse(new Date()) / 1000;

  let cycles = await Cycle_Course.find({ course: id, year }).populate("course");
  var arr_cycles = [];

  for (var item of cycles) {
    let final_format = Date.parse(new Date(item.final_date + "T00:00:00")) / 1000;

    if (today_format >= final_format) {
      let rooms = await Cycle_Room.find({ cycle_course: item._id });
      arr_cycles.push({
        cycle: item,
        rooms: rooms,
      });
    }
  }
  res.json({ data: arr_cycles });
};

const change_status_cycle = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;
  var new_status = data.status ? false : true;
  reg = await Cycle_Course.findByIdAndUpdate(id, { status: new_status });
  res.json({ data: reg });
};

const update_cycle = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;
  try {
    // Calcular fecha de inscripción
    let start_format = new Date(data.start_date + "T00:00:00");
    let final_format = new Date(data.final_date + "T23:59:59");
    let start_month = start_format.getMonth() + 1;
    let final_month = final_format.getMonth() + 1;

    // Obtener meses entre dos rangos de fechas
    let arr_months = [];
    if (start_month != final_month) {
      if (start_month >= final_month) {
        for (let i = start_month; i <= 12; i++) {
          arr_months.push(i);
        }
        for (let i = 1; i <= final_month; i++) {
          arr_months.push(i);
        }
      } else {
        for (let i = start_month; i <= final_month; i++) {
          arr_months.push(i);
        }
      }
    } else {
      arr_months.push(start_month);
    }

    // Calcular fecha de inscripción
    data.inscription = moment(start_format).subtract(14, "days").format("YYYY-MM-DD");

    data.months = arr_months;
    data.year = start_format.getFullYear();

    let reg = await Cycle_Course.findByIdAndUpdate(id, data, { new: true });
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const add_rooms_cycle = async (req, res = response) => {
  let data = req.body;
  try {
    data.collaborator = req.id;
    let reg = await Cycle_Room.create(data);
    res.json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const del_rooms_cycle = async (req, res = response) => {
  let id = req.params["id"];
  try {
    await Cycle_Room.findByIdAndDelete(id);
    res.status(200).json({ data: true });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

// ASIGNAR INSTRUCTORES A UN SALÓN

const list_instructors_room = async (req, res = response) => {
  let id = req.params["id"];
  try {
    reg = await Cycle_Instructor.find({ cycle_course: id }).populate("collaborator").populate("cycle_room");
    res.status(200).json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const add_instructor_room = async (req, res = response) => {
  let data = req.body;
  try {
    reg = await Cycle_Instructor.create(data);
    res.status(200).json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const del_instructor_room = async (req, res = response) => {
  let id = req.params["id"];
  try {
    reg = await Cycle_Instructor.findByIdAndDelete(id);
    res.status(200).json({ data: reg });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = {
  create_cycle,
  read_cycle_by_id,
  read_current_cycles,
  read_expired_cycles,
  change_status_cycle,
  update_cycle,
  add_rooms_cycle,
  del_rooms_cycle,
  list_instructors_room,
  add_instructor_room,
  del_instructor_room,
};
