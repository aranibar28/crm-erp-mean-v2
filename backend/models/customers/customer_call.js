const { Schema, model } = require("mongoose");

const Customer_CallSchema = Schema({
  date:       { type: String, required: true },
  time:       { type: String, required: true },
  result:     { type: String, required: true },
  note:       { type: String, required: false },
  customer:   { type: Schema.Types.ObjectId, required: false, ref: "Customer" },
  advisor:    { type: Schema.Types.ObjectId, required: false, ref: "Collaborator" },
  created_at: { type: Date, required: true, default: Date.now },
});

Customer_CallSchema.method("toJSON", function () {
  const { __v,  ...object } = this.toObject();
  return object;
});

module.exports = model("Customer_Call", Customer_CallSchema);