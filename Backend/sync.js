const sequelize = require("./conn/conn");
const applyAssociations = require("./models/association");

// Import models to ensure they are registered
require("./models/user");
require("./models/product");

// Apply associations
applyAssociations();

// Sync database
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Ensures tables match model definitions
        console.log("Database synchronized successfully!");
    } catch (error) {
        console.error("Error synchronizing database:", error);
    } finally {
        process.exit(); // Exit script after syncing
    }
})();