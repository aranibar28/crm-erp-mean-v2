const { Schema, model } = require("mongoose");

const Cycle_CourseSchema = Schema({
  nivel:        { type: String, required: true },
  sede:         { type: String, required: true },
  price:        { type: Number, required: true },
  start_date:   { type: String, required: true },
  final_date:   { type: String, required: true },
  inscription:  { type: String, required: true },
  months:       { type: Object, required: true },
  year:         { type: Number, required: true },
  description:  { type: String, required: false },
  status:       { type: Boolean, required: true, default: false },
  course:       { type: Schema.Types.ObjectId, required: false, ref: "Course" },
  collaborator: { type: Schema.Types.ObjectId, required: false, ref: "Collaborator" },
  created_at:   { type: Date, required: true, default: Date.now },
});

Cycle_CourseSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Cycle_Course", Cycle_CourseSchema);
