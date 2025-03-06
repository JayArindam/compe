const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const checkAdmin = require("../middlewares/adminAuth");

// for testing purposes because jay is dum
router.get("/check", checkAdmin, (req, res) => {
    res.json({ message: "Admin is logged in and authenticated!", admin: req.user });
});

// Route to add a component (Admin Only)
router.post("/add-product", checkAdmin, async (req, res) => {
    const { name, type, brand, price, stock } = req.body;

    if (!name || !type || !price || !stock || !brand) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const product = await Product.create({ name, type, brand, price, stock });

        res.status(201).json({ message: "Product added successfully",product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;