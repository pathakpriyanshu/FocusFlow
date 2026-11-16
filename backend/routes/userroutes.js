const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/userControllers.js");

router.post("/create", createUser);

module.exports = router;