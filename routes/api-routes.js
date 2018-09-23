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


    // app.get("/api/colors", function (req, res) {
    //     console.log(res);

    //     if (req.params.id) {
    //         db.colors.findById(req.params.id).then(function (dbColors) {
    //             res.json(dbColors);
    //         });
    //     } else {
    //         db.colors.findAll({}).then(function (dbColors) {
    //             res.json(dbColors);
    //             console.log(dbColors);
    //         });
    //     }
    // });

    // //for getting HTML colors only
    // app.get("/api/colors/html", function (req, res) {
    //     db.colors.findAll({
    //             where: {
    //                 colorSource: "HTML color"
    //             }
    //         })
    //         .then(function (dbColors) {
    //             res.json(dbColors);
    //         });
    // });

    // //for getting by color Family only
    // app.get("/api/filter-by-color/:colorFamily", function (req, res) {
    //     db.colors.findAll({
    //             where: {
    //                 colorFamily: req.params.colorFamily
    //             }
    //         })
    //         .then(function (dbColors) {
    //             res.json(dbColors);
    //         });
    // });



};