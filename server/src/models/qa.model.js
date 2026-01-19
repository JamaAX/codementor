const mongoose = require("mongoose");

const qaSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: String, required: true, trim: true },
    code: { type: String, default: "" },
    answer: { type: String, required: true },
    provider: { type: String, default: "groq" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("QA", qaSchema);
