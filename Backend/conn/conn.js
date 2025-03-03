const Sequelize = require('sequelize')

const sequelize = new Sequelize('test', 'root', 'root', {
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