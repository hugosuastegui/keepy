const { Schema, model } = require("mongoose");

const conceptSchema = new Schema(
  {
    description: String,
    day: Number,
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
    year: Number,
    amount: Number,
    subaccount: {
      type: Schema.Types.ObjectId,
      ref: "Subaccount",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    Invoice: String,
  },
  { timestamps: true }
);

module.exports = model("Concept", conceptSchema);
