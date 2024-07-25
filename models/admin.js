const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", Admin);
