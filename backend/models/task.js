const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        assignedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "In Progress",
                "Under Review",
                "Completed",
                "Closed"
            ],
            default: "Pending"
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        deadline: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Indexes for frequently used queries
taskSchema.index({ projectId: 1 });
taskSchema.index({ assignedTo: 1, status: 1 });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;