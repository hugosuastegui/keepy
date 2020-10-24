const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: String,
    business: String,
    field: String,
    password: String,
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
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("User", userSchema);
