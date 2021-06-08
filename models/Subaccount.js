const { Schema, model } = require("mongoose");

const subaccountSchema = new Schema(
  {
    name: String,
    account: {
      type: String,
      enum: [
        "Revenue",
        "COGS",
        "SG&A",
        "Taxes",
        "CapEX",
        "Dividends",
        "Retained Earnings",
      ],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    budgets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Budget",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Subaccount", subaccountSchema);
