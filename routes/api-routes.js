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