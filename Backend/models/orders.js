const { DataTypes } = require("sequelize");
const sequelize = require("../conn/conn");

const User = sequelize.define(
  "orders",
  {
    
  },
  { timestamps: true }
);

module.exports = User;