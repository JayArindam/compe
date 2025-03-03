const Sequelize = require('sequelize')
require("dotenv").config();

const Database = process.env.DBNAME;
const User = process.env.SQLUNAME;
const Pass = process.env.SQLPASS;

const sequelize = new Sequelize(Database, User, Pass, {
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

module.exports = sequelize;