const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/CategoryModel");

//AQUI DEFINE O NOME, OS CAMPOS E TIPOS DA TABELA
const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article); // UMA categoria tem MUITOS artigos; 1-P-M
Article.belongsTo(Category); // UM rtigo pertence a UMA categoria; 1-P-1

//Se já existe a tabela não criará uma nova tabela, caso contrario, criará a tabela
Article.sync({force: false}).then(() => {});

module.exports = Article;