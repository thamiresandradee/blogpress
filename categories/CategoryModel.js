const Sequelize = require("sequelize");
const connection = require("../database/database");

//AQUI DEFINE O NOME, OS CAMPOS E TIPOS DA TABELA
const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Se já existe a tabela não criará uma nova tabela, caso contrario, criará a tabela
Category.sync({force: false}).then(() => {});

module.exports = Category;