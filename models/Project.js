const { model, Schema } = require("mongoose");

const projectSchema = new Schema(
  {
    name: String,
    description: String,
    category: {
      type: String,
      enum: ["business", "project"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    subaccounts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subaccount",
      },
    ],
    concepts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Concept",
      },
    ],
    kpis: [
      {
        type: Schema.Types.ObjectId,
        ref: "Kpi",
      },
    ],
    budgets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Budget",
      },
    ],
    image: String,
  },
  { timestamps: true }
);

module.exports = model("Project", projectSchema);
