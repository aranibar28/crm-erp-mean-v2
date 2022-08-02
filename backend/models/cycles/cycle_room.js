const { Schema, model } = require("mongoose");

const Cycle_RoomSchema = Schema({
  room:          { type: String, required: true },
  frequency:     { type: Object, required: true },
  start_time:    { type: String, required: true },
  final_time:    { type: String, required: true },
  aforo:         { type: Number, required: true },
  students:      { type: Number, required: true, default: 0 },
  course:        { type: Schema.Types.ObjectId, required: false, ref: "Course" },
  cycle_course:  { type: Schema.Types.ObjectId, required: false, ref: "Cycle_Course" },
  collaborator:  { type: Schema.Types.ObjectId, required: false, ref: "Collaborator" },
  created_at:    { type: Date, required: true, default: Date.now },
});

Cycle_RoomSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Cycle_Room", Cycle_RoomSchema);
