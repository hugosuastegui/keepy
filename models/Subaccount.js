const { Schema, model } = require("mongoose");

const subaccountSchema = new Schema(
  {
    name: String,
    account: {
      type: String,
      enum: ["Revenue", "COGS", "SGA", "Taxes", "CapEX"],
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

module.exports = model("Subaccount", subaccountSchema);
