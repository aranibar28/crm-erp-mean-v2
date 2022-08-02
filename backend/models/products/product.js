const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  title:       { type: String, required: true },
  category:    { type: String, required: true },
  type:        { type: String, required: true },
  description: { type: String, required: true },
  slug:        { type: String, required: false },
  variety:     { type: String, required: false },
  stock:       { type: Number, required: false },
  price:       { type: Number, required: false },
  image:       { type: String, required: false },
  status:      { type: Boolean, required: true, default: false },
  created_by:  { type: Schema.Types.ObjectId, required: true, ref: "Collaborator" },
  created_at:  { type: Date, required: true, default: Date.now },
});

ProductSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Product", ProductSchema);
