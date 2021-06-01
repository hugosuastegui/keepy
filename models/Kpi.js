const { Schema, model } = require("mongoose");

const kpiSchema = new Schema(
  {
    name: String,
    description: String,
    operation: String,
    metric1: {
      type: Schema.Types.ObjectId,
      ref: "Subaccount",
    },
    metric2: {
      type: Schema.Types.ObjectId,
      ref: "Subaccount",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

module.exports = model("Kpi", kpiSchema);
