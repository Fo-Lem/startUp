const sequelize = require('../db')
const {DataTypes}=require('sequelize')

const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    email:{type:DataTypes.STRING,unique:true,allowNull:false},
    name:{type:DataTypes.STRING,defaultValue:'Имя'},
    surname:{type:DataTypes.STRING,defaultValue:'Фамилия'},
    password:{type:DataTypes.STRING,allowNull:false}
})

module.exports = {
    User
}