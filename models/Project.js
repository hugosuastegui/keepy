const { model, Schema } = require("mongoose");

const projectSchema = new Schema(
  {
    name: String,
    description: String,
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
  },
  { timestamps: true }
);

module.exports = model("Project", projectSchema);
