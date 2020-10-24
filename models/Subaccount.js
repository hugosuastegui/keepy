const { Schema, model } = require("mongoose");

const subaccountSchema = new Schema(
  {
    name: String,
    account: {
      type: String,
      enum: ["REVENUE", "COGS", "SGA", "TAXES", "CAPEX"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Account", subaccountSchema);
