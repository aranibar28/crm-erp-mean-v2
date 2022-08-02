const { Schema, model } = require("mongoose");

const SurveySchema = Schema({
  answ_one:    { type: String, required: true },
  answ_two:    { type: String, required: true },
  answ_three:  { type: String, required: true },
  answ_four:   { type: String, required: true },
  answ_five:   { type: String, required: true },
  answ_six:    { type: String, required: true },
  inscription: { type: Schema.Types.ObjectId, required: false, ref: "Inscription" },
  advisor:     { type: Schema.Types.ObjectId, required: false, ref: "Collaborator" },
  customer:    { type: Schema.Types.ObjectId, required: false, ref: "Customer" },
  created_at:  { type: Date, required: true, default: Date.now },
});

SurveySchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Survey", SurveySchema);
