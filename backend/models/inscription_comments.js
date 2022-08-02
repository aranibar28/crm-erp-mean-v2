const { Schema, model } = require("mongoose");

const Inscription_CommentSchema = Schema({
  activity:      { type: String, required: true },
  collaborator:  { type: Schema.Types.ObjectId, required: false, ref: "Collaborator" },
  inscription:   { type: Schema.Types.ObjectId, required: false, ref: "Inscription" },
  created_at:    { type: Date, required: true, default: Date.now },
});

Inscription_CommentSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Inscription_Comment", Inscription_CommentSchema);
