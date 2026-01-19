const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { signToken } = require("../utils/jwt");

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = signToken(user._id);

  return res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = signToken(user._id);
  return res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
}

async function me(req, res) {
  return res.json({ user: req.user });
}

module.exports = { register, login, me };
