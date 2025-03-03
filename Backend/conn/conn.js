require("dotenv").config();

const Sequelize = require('sequelize');
const User = require("../models/user");

const Database = process.env.DBNAME;
const Username = process.env.SQLUNAME;
const Password = process.env.SQLPASS;

const sequelize = new Sequelize(Database, Username, Password, {
    host: "localhost",
    dialect: 'mysql', 
    logging: false,
});

const conn = async () =>{
    try{
        await sequelize.authenticate()
        console.log("Connection successful");
    } catch(error){
        console.error("Error connecting to database: ", error);
    }
};

conn();

module.exports = sequelize;