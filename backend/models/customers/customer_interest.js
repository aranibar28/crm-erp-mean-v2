const { Schema, model } = require("mongoose");

const Customer_InterestSchema = Schema({
  date:       { type: String, required: true },
  note:       { type: String, required: true },
  type:       { type: String, required: true },
  level:      { type: String, required: true },
  cycle:      { type: String, required: true },
  course:     { type: Schema.Types.ObjectId, required: false, ref: "Course" },
  customer:   { type: Schema.Types.ObjectId, required: false, ref: "Customer" },
  advisor:    { type: Schema.Types.ObjectId, required: false, ref: "Collaborator" },
  created_at: { type: Date, required: true, default: Date.now },
});

Customer_InterestSchema.method("toJSON", function () {
  const { __v,  ...object } = this.toObject();
  return object;
});

module.exports = model("Customer_Interest", Customer_InterestSchema);
