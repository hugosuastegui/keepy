const { Schema, model } = require("mongoose");

const budgetSchema = new Schema(
  {
    subaccount: {
      type: Schema.Types.ObjectId,
      ref: "Subaccount",
    },
    amount: { type: Number, default: 0 },
    year: String,
    month: {
      type: String,
      enum: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

module.exports = model("Budget", budgetSchema);
