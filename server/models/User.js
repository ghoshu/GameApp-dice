const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  played: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  startdate: {
    type: Date,
  },
  duration: {
    type: Date,
  },
});

module.exports = mongoose.model("user", UserSchema);
