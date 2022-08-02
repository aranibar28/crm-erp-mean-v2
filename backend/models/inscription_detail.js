const { Schema, model } = require("mongoose");

const Inscription_DetailSchema = Schema({
  price:         { type: Number, required: true },
  start_date:    { type: String, required: true },
  final_date:    { type: String, required: true },
  day:           { type: String, required: true },
  month:         { type: String, required: true },
  year:          { type: String, required: true },
  n_clases:      { type: Number, required: true },
  discount_type: { type: String, required: false },
  discount_value:{ type: Number, required: false },
  type:          { type: String, required: true, default: "Nuevo" },
  status:        { type: String, required: true, default: "Procesando"},
  course:        { type: Schema.Types.ObjectId, required: true, ref: "Course" },
  cycle_course:  { type: Schema.Types.ObjectId, required: true, ref: "Cycle_Course" },
  cycle_room:    { type: Schema.Types.ObjectId, required: true, ref: "Cycle_Room" },
  inscription:   { type: Schema.Types.ObjectId, required: true, ref: "Inscription" },
  customer:      { type: Schema.Types.ObjectId, required: true, ref: "Customer" },
  advisor:       { type: Schema.Types.ObjectId, required: true, ref: "Collaborator" },
  created_at:    { type: Date, required: true, default: Date.now },
});

Inscription_DetailSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Inscription_Detail", Inscription_DetailSchema);
