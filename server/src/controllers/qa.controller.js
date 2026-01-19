const QA = require("../models/qa.model");
const { askModel } = require("../services/ai.service");

async function listQA(req, res) {
  const items = await QA.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .lean();
  return res.json({ items });
}

async function createQA(req, res) {
  const { question, code = "" } = req.body;
  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }

  const { answer, provider } = await askModel({ question, code });
  const entry = await QA.create({
    user: req.user.id,
    question,
    code,
    answer,
    provider,
  });

  return res.status(201).json({ item: entry });
}

module.exports = { listQA, createQA };
