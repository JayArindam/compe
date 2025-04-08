const User = require("./user");
const Component = require("./component");

// Example: If you want to associate components with an admin user
User.hasMany(Component, {
  foreignKey: "adminId",
  as: "product", // Optional alias
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