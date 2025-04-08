const express = require("express");
const router = express.Router();
const Component = require("../models/component");
const checkAdmin = require("../middlewares/adminAuth");

// for testing purposes because jay is dum
router.get("/check", checkAdmin, (req, res) => {
    res.json({ message: "Admin is logged in and authenticated!", admin: req.user });
});

// Route to add a component (Admin Only)
router.post("/add-component", checkAdmin, async (req, res) => {
    const { name, type, brand, price, stock } = req.body;

    if (!name || !type || !price || !stock || !brand) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const product = await Component.create({ name, type, brand, price, stock });

        res.status(201).json({ message: "Component added successfully",product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to delete a component by name (Admin Only)
router.delete("/remove-component", checkAdmin, async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Missing component name" });
    }

    try {
        const deleted = await Component.destroy({ where: { name } });

        if (deleted === 0) {
            return res.status(404).json({ message: "Component not found" });
        }

        res.status(200).json({ message: `Component '${name}' removed successfully` });
    } catch (error) {
        console.error("Error deleting component:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;