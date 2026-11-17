const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["active", "completed", "on-hold"],
            default: "active"
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return !this.startDate || value >= this.startDate;
                },
                message: "End date cannot be before start date"
            }
        }
    },
    {
        timestamps: true
    }
);

// Index for finding projects belonging to a manager
projectSchema.index({ managerId: 1 });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;