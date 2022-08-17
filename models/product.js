// we define the model for the sequelize library


const Sequelize =require('sequelize');

const sequelize=require('../util/database')

// we can define the new model using define methode
const Product =sequelize.define('product',{ //name of product it create table

    // this javascript object define the schema 
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
   },
   title:Sequelize.STRING,
   price:{
    // with double we can ad decimal point
    type:Sequelize.DOUBLE,
    allowNull:false
   },
   imageUrl:{
    type:Sequelize.STRING,
    allowNullL:false
   },
   description:{
      type:Sequelize.STRING,
      allowNull:false
   }
})

module.exports = Product;