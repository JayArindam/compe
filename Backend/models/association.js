const User = require("./user");
const Product = require("./product");

// Example: If you want to associate components with an admin user
User.hasMany(Product, {
  foreignKey: "adminId",
  as: "product", // Optional alias
});

Product.belongsTo(User, {
  foreignKey: "adminId",
  as: "admin",
});

// Export function to apply associations
const applyAssociations = () => {
  console.log("Associations applied!");
};

module.exports = applyAssociations;
