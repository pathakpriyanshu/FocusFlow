const bcrypt = require("bcrypt");
const User = require("../models/user");

const createUser = async (req, res) => {
    try {
        const adminSecret = req.headers["admin-secret"];

        if (adminSecret !== process.env.ADMIN_CREATE_SECRET) {
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }


        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createUser };