const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied: No or malformed token" });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from DB (if needed)
        const user = await User.findByPk(decoded.authClaims.id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied: Admins only" });
        }

        req.user = user; // Store user info for later use
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};

module.exports = checkAdmin;
