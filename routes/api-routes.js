var db = require("../models");
const Sequelize = require('sequelize');
const op = Sequelize.Op;

module.exports = function (app) {

    //for posting new book to books DB
    app.post("/api/books", function (req, res) {
        console.log(req.body);
        db.books.create(req.body)
            .then(function (dbBooks) {
                res.json(dbBooks);
            });
    });

    //for getting all users from DB
    app.get("/api/users", function (req, res) {
        db.users.findAll({})
            .then(function (dbUsers) {
                res.json(dbUsers);
            });
    });

    //for posting new users to users DB
    app.post("/api/users", function (req, res) {
        console.log(req.body);
        db.users.create(req.body)
            .then(function (dbUsers) {
                res.json(dbUsers);
            });
    });

    //for getting a single book from DB
    app.get("/api/viewBook/:id", function (req, res) {
        db.books.findOne({
                where: {
                    id: req.params.id
                },
                include: [db.users]
            })
            .then(function (dbBooks) {
                res.json(dbBooks);
            });
    });

    //for getting my ads
    app.get("/api/myAds/:email", function (req, res) {
        db.books.findAll({
                where: {
                    email: req.params.email
                },
                include: [db.users]
            })
            .then(function (dbBooks) {
                res.json(dbBooks);
            });
    });

    //for deleting a single ad of mine
    app.delete("/api/myAds/:id", function (req, res) {
        db.books.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbBooking) {
                res.json(dbBooking);
            });
    });

    //for getting all books from DB
    app.get("/api/books", function (req, res) {
        db.books.findAll({})
            .then(function (dbBooks) {
                res.json(dbBooks);
            });
    });

    //for displaying books by category
    app.get("/api/filter-by-category/:category", function (req, res) {
        db.books.findAll({
                where: {
                    [op.or]: [{
                        category: {
                            [op.like]: `%${req.params.category}%`
                        }
                    }]
                }
            })
            .then(function (dbBooks) {
                res.json(dbBooks);
            });
    });


    //for querying books by title
    app.get("/api/search-by-title/:title", function (req, res) {
        db.books.findAll({
                where: {
                    [op.or]: [{
                        title: {
                            [op.like]: `%${req.params.title}%`
                        }
                    }]
                }
            })
            .then(function (dbBooks) {
                res.json(dbBooks);
            });
    });

    //for querying books by author
    app.get("/api/search-by-author/:author", function (req, res) {
        db.books.findAll({
                where: {
                    [op.or]: [{
                        author: {
                            [op.like]: `%${req.params.author}%`
                        }
                    }]
                }
            })
            .then(function (dbBooks) {
                res.json(dbBooks);
            });
    });

    //for querying books by isbn
    app.get("/api/search-by-isbn/:isbn", function (req, res) {
        db.books.findAll({
                where: {
                    isbn: req.params.isbn
                }
            })
            .then(function (dbBooks) {
                res.json(dbBooks);
            });
    });


    //for getting a single book from DB
    app.get("/api/viewBook/:id", function (req, res) {
        db.books.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbBooks) {
                res.json(dbBooks);
            });
    });

};