const { Schema, model } = require("mongoose");

const CourseSchema = Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  slug:        { type: String, required: true },
  image:       { type: String, required: true },
  status:      { type: Boolean, required: true, default: false },
  created_at:  { type: Date, required: true, default: Date.now },
});

CourseSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Course", CourseSchema);
