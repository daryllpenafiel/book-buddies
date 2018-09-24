var db = require("../models");

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

    // //for getting a single user from DB
    // app.get("/api/users/:email", function (req, res) {
    //     db.users.findOne({
    //             where: {
    //                 email: req.params.email
    //             }
    //         })
    //         .then(function (dbUsers) {
    //             res.json(dbUsers);
    //         });
    // });

    // // app.get("/api/guests/", function(req, res) {
    // //     if (req.params.id) {
    // //       db.guest.findById(req.params.id).then(function(guest) {
    // //         res.json(guest);
    // //       });
    // //     } else {
    // //       db.guest.findAll({}).then(function(guest) {
    // //         res.json(guest);
    // //       });
    // //     }
    // //   });

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
                    category: req.params.category
                }
            })
            .then(function (dbBooks) {
                res.json(dbBooks);
            });
    });


    app.get("/api/guests/", function (req, res) {
        if (req.params.id) {
            db.guest.findById(req.params.id).then(function (guest) {
                res.json(guest);
            });
        } else {
            db.guest.findAll({}).then(function (guest) {
                res.json(guest);
            });
        }
    });

    //for querying books by title
    app.get("/api/search-by-title/:title", function (req, res) {
        db.books.findAll({
                where: {
                    title: req.params.title
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