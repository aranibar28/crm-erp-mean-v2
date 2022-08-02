const { Schema, model } = require("mongoose");

const Customer_MailSchema = Schema({
  subject:    { type: String, required: true },
  message:    { type: String, required: true },
  customer:   { type: Schema.Types.ObjectId, required: false, ref: "Customer" },
  advisor:    { type: Schema.Types.ObjectId, required: false, ref: "Collaborator" },
  created_at: { type: Date, required: true, default: Date.now },
});

Customer_MailSchema.method("toJSON", function () {
  const { __v,  ...object } = this.toObject();
  return object;
});

module.exports = model("Customer_Mail", Customer_MailSchema);