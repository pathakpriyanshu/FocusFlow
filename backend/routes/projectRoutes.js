
const express = require("express");
const router = express.Router();

const {
    createProject,
    getManagerProjects
} = require("../controllers/projectController");

router.post("/create", createProject);
router.get("/", getManagerProjects);

module.exports = router;
