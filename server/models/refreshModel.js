const mongoose = require("mongoose");

const refreshSchema = new mongoose.Schema(
  {
    refreshToken: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Refresh", refreshSchema);
