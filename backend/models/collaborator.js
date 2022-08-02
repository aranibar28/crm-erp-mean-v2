const { Schema, model } = require("mongoose");

const CollaboratorSchema = Schema({
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  first_name: { type: String, required: false },
  last_name:  { type: String, required: false },
  full_name:  { type: String, required: false },
  dni:        { type: String, required: false },
  phone:      { type: String, required: false },
  status:     { type: Boolean, required: false, default: true },
  image:      { type: String, required: false, default: "profile.webp" },
  role:       { type: String, required: true, default: "Administrador" },
  created_at: { type: Date, required: true, default: Date.now },
});

CollaboratorSchema.method("toJSON", function () {
  const { __v,  ...object } = this.toObject();
  return object;
});

module.exports = model("Collaborator", CollaboratorSchema);
