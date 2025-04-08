const sequelize = require("./conn/conn");
const applyAssociations = require("./models/association");

// Import models to ensure they're registered with Sequelize
require("./models/user");
require("./models/component");
require("./models/orders");
require("./models/orderitem");

// Apply associations after all models are loaded
applyAssociations();

// Sync database
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Use { force: true } if you want to reset tables
        console.log("Database synchronized successfully!");
    } catch (error) {
        console.error("Error synchronizing database:", error);
    } finally {
        process.exit(); // Exit script after syncing
    }
})();
