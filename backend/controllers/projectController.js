
const Project = require("../models/project");


//For handling post request for creating projects
const createProject = async (req, res) => {
    try {
        const {
            name,
            description,
            managerId,
            startDate,
            endDate
        } = req.body;

        // Basic validation
        if (!name || !managerId || !startDate || !endDate) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        // Create project
        const project = await Project.create({
            name,
            description,
            managerId,
            startDate,
            endDate
        });

        return res.status(201).json({
            message: "Project created successfully",
            project
        });

    } catch (error) {
        console.error("Create project error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};



//Get request for retreiving projects data

const getManagerProjects = async (req, res) => {
    try {
        const { managerId } = req.query;

        if (!managerId) {
            return res.status(400).json({
                message: "Manager ID is required"
            });
        }

        const projects = await Project.find({ managerId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Projects fetched successfully",
            count: projects.length,
            projects
        });

    } catch (error) {
        console.error("Fetch projects error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


module.exports = {
    createProject,
    getManagerProjects
};
