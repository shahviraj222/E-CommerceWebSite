const Sequelize = require('sequelize');

//databse connection setup to connect with database 
const sequelize = new Sequelize('shop', 'root', 'virajshah', {
  dialect: 'mysql',  
  host: 'localhost'
});

module.exports = sequelize;
