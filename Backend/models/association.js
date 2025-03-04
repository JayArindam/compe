const User = require("./user");
const Component = require("./components");

// Example: If you want to associate components with an admin user
User.hasMany(Component, {
    foreignKey: "adminId",
    as: "components", // Optional alias
});

Component.belongsTo(User, {
    foreignKey: "adminId",
    as: "admin",
});

// Export function to apply associations
const applyAssociations = () => {
    console.log("Associations applied!");
};

module.exports = applyAssociations;