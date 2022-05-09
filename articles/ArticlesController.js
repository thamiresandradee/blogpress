const express = require("express");
const router = express.Router();
const Category = require("../categories/CategoryModel");
const Article = require("./ArticleModel");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {

    Article.findAll({
        include: [{model: Category}] // AQUI FAZ O JOIN COM A TABELA CATEGORY
    }).then(articles => {
        res.render("admin/articles/index", {articles: articles});
    });
    
});

router.get("/admin/articles/new", (req, res) => {

    Category.findAll().then(categories => {
        res.render("admin/articles/new",{categories: categories})
    })
});

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.categoryId;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryId
    }).then(() => {
        res.redirect("/admin/articles")
    })

});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){
            
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });

        }else{ //SE NÃO FOR UM NÚMERO
            res.redirect("/admin/articles");
        }
    }else{ // SE FOR NULL
        res.redirect("/admin/articles");
    }
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    
    if(isNaN(id)){
        res.redirect("/admin/articles");
    }

    Article.findByPk(id,{
        include: [{model: Category}]
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("admin/articles/edit",{article: article, categories: categories})
            });
        }else{
            res.redirect("/admin/articles");
        }
    }).catch(erro => {
        res.redirect("/admin/articles");
    })
});

router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.categoryId;
    
    Article.update({
        title: title,
        body: body,
        slug: slugify(title),
        categoryId: categoryId },
        {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(err => {
        res.redirect("/admin/articles");
    });
});

router.get("/articles/page/:num", (req, res) => {
    var page = req.params.num;
    var offset = 0;
    var limitePage = 2;

    if(isNaN(page) || page == 1){
        offset = 0;
    }else{
        offset = parseInt(page) * limitePage;
    }

    Article.findAndCountAll({
        limit: limitePage,
        offset: offset
    }).then(articles => {
        res.json(articles);
    })
})


module.exports = router;