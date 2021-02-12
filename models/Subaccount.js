const { Schema, model } = require("mongoose");

const subaccountSchema = new Schema(
  {
    name: String,
    account: {
      type: String,
      enum: ["Revenue", "COGS", "SG&A", "Taxes", "CapEX"],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Subaccount", subaccountSchema);
