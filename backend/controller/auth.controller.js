import { User } from "../models/user.model.js";
import { Expense } from "../models/expense.model.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2d' });
}

const createUser = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) return res.status(401).json({ message: "Please provide a username" });

        let message = "Login successfull";
        const user = await User.findOne({ username });
        if (!user) {
            user = new User({ username });
            user.save();
            message = "New user created"
        }

        const tokenPayload = { username: user.username, id: user._id };
        const token = generateToken(tokenPayload);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 2 * 24 * 60 * 60 * 1000
        }).status(201).json({
            message,
            success: true
        });
    } catch (err) {
        res.status(500).json({ message: "Server error! Unable to create user", success: false });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(401).json({ message: "No id provided" });

        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await Expense.deleteMany({ owner: id });

        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error! Unable to delete user" });
    }
}

export { createUser, deleteUser };