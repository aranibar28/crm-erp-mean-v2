const { Schema, model } = require("mongoose");

const Cycle_InstructorSchema = Schema({
  cycle_course: { type: Schema.Types.ObjectId, required: false, ref: "Cycle_Course" },
  cycle_room:   { type: Schema.Types.ObjectId, required: false, ref: "Cycle_Room" },
  collaborator: { type: Schema.Types.ObjectId, required: false, ref: "Collaborator" },
  created_at:   { type: Date, required: true, default: Date.now },
});

Cycle_InstructorSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Cycle_Instructor", Cycle_InstructorSchema);
