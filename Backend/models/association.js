const User = require("./user");
const Component = require("./component");
const Order = require("./orders");
const OrderItem = require("./orderitem");

const applyAssociations = () => {
  // User → Component association
  User.hasMany(Component, {
    foreignKey: "adminId",
    as: "product", // Optional alias
  });

  Component.belongsTo(User, {
    foreignKey: "adminId",
    as: "admin",
  });

  // Order ↔ Component through OrderItem (many-to-many)
  Order.belongsToMany(Component, {
    through: OrderItem,
    foreignKey: "orderId",
    otherKey: "componentId",
  });

  Component.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: "componentId",
    otherKey: "orderId",
  });

  console.log("Associations applied!");
};

module.exports = applyAssociations;