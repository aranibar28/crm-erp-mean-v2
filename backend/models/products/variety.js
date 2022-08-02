const { Schema, model } = require("mongoose");

const VarietySchema = Schema({
  title:      { type: String, required: true },
  sku:        { type: String, required: true },
  stock:      { type: Number, required: false },
  product:    { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  created_by: { type: Schema.Types.ObjectId, required: true, ref: "Collaborator" },
  created_at: { type: Date, required: true, default: Date.now },
});

VarietySchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Variety", VarietySchema);
