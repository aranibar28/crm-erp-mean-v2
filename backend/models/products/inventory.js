const { Schema, model } = require("mongoose");

const InventorySchema = Schema({
  unit_price: { type: Number, required: true },
  quantity:   { type: Number, required: true },
  supplier:   { type: String, required: false },
  variety:    { type: Schema.Types.ObjectId, required: true, ref: "Variety" },
  product:    { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  created_by: { type: Schema.Types.ObjectId, required: true, ref: "Collaborator" },
  created_at: { type: Date, required: true, default: Date.now },
});

InventorySchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Inventory", InventorySchema);