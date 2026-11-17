const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true
        },

        type: {
            type: String,
            enum: ["TASK_ASSIGNED", "STATUS_UPDATED", "MESSAGE"],
            required: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        isRead: {
            type: Boolean,
            default: false
        },

        statusChange: {
            from: {
                type: String,
                enum: [
                    "Pending",
                    "In Progress",
                    "Under Review",
                    "Completed",
                    "Closed"
                ]
            },

            to: {
                type: String,
                enum: [
                    "Pending",
                    "In Progress",
                    "Under Review",
                    "Completed",
                    "Closed"
                ]
            }
        }
    },
    {
        timestamps: true
    }
);

// Notification retrieval
notificationSchema.index({ recipient: 1, createdAt: -1 });

// Task conversation retrieval
notificationSchema.index({ taskId: 1, type: 1, createdAt: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;