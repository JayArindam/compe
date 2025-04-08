const { DataTypes } = require("sequelize");
const sequelize = require("../conn/conn");

const Component = sequelize.define("Component", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

module.exports = Component;
