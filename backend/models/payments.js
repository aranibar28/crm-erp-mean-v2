const { Schema, model } = require("mongoose");

const PaymentsSchema = Schema({
  amount:             { type: Number, required: true },
  origin:             { type: String, required: true },
  method:             { type: String, required: true },
  bank:               { type: String, required: false },
  transaction:        { type: String, required: true },
  status:             { type: String, required: true },
  correlative:        { type: Number, required: true },
  date:               { type: String, required: true },
  type:               { type: String, required: true },
  inscription:        { type: Schema.Types.ObjectId, required: false, ref: "Inscription" },
  inscription_detail: { type: Schema.Types.ObjectId, required: false, ref: "Inscription_Detail" },
  sale:               { type: Schema.Types.ObjectId, required: false, ref: "Sale" },
  sale_detail:        { type: Schema.Types.ObjectId, required: false, ref: "Sale_Detail" },
  advisor:            { type: Schema.Types.ObjectId, required: false, ref: "Collaborator" },
  customer:           { type: Schema.Types.ObjectId, required: false, ref: "Customer" },
  created_at:         { type: Date, required: true, default: Date.now },
});

PaymentsSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Payments", PaymentsSchema);
