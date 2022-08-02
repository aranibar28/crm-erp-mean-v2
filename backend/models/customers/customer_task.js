const { Schema, model } = require("mongoose");

const Customer_TaskSchema = Schema({
  title:        { type: String, required: true },
  date:         { type: String, required: true },
  time:         { type: String, required: true },
  type:         { type: String, required: true },
  priority:     { type: String, required: true },
  note:         { type: String, required: true },
  status:       { type: Boolean, required: true, default: false },
  customer:     { type: Schema.Types.ObjectId, required: false, ref: "Customer" },
  advisor:      { type: Schema.Types.ObjectId, required: false, ref: "Collaborator" },
  advisor_make: { type: Schema.Types.ObjectId, required: false, ref: "Collaborator" },
  advisor_date: { type: Date, required: false },
  created_at:   { type: Date, required: true, default: Date.now },
});

Customer_TaskSchema.method("toJSON", function () {
  const { __v,  ...object } = this.toObject();
  return object;
});

module.exports = model("Customer_Task", Customer_TaskSchema);