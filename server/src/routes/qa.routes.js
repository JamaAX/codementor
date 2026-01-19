const express = require("express");
const { listQA, createQA } = require("../controllers/qa.controller");

const router = express.Router();

router.get("/", listQA);
router.post("/", createQA);

module.exports = router;
