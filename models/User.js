const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true,
    },
    photo: String,
    password: String,
    repeatedPassword: String,
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
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
