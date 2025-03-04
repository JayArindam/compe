const express = require("express");
const router = express.Router();
const Component = require("../models/components");
const checkAdmin = require("../middlewares/adminAuth");

// Route to add a component (Admin Only)
router.post("/add-component", checkAdmin, async (req, res) => {
    const { name, type, brand, price, stock } = req.body;

    if (!name || !type || !price || !stock) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const component = await Component.create({ name, type, brand, price, stock });

        res.status(201).json({ message: "Component added successfully", component });
    } catch (error) {
        console.error("Error adding component:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/check", checkAdmin, (req, res) => {
    res.json({ message: "Admin is logged in and authenticated!", admin: req.user });
});

module.exports = router;