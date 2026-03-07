import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) return res.status(401).json({ message: "Please provide a username" });

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(401).json({ message: "Please provide a unique username" });

        const newUser = new User({ username });
        newUser.save();

        res.status(201).json({ message: "New user created" });
    } catch (err) {
        res.status(500).json({ message: "Server error! Unable to create user" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(401).json({ message: "No id provided" });

        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error! Unable to delete user" });
    }
}

export { createUser, deleteUser };