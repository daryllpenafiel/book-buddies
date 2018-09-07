var db = require("../models");

module.exports = function (app) {
    app.get("/api/colors", function (req, res) {
        console.log(res);

        if (req.params.id) {
            db.colors.findById(req.params.id).then(function (dbColors) {
                res.json(dbColors);
            });
        } else {
            db.colors.findAll({}).then(function (dbColors) {
                res.json(dbColors);
                console.log(dbColors);
            });
        }
    });

    //for getting HTML colors only
    app.get("/api/colors/html", function (req, res) {
        db.colors.findAll({
                where: {
                    colorSource: "HTML color"
                }
            })
            .then(function (dbColors) {
                res.json(dbColors);
            });
    });

    //for getting by color Family only
        app.get("/api/filter-by-color/:colorFamily", function (req, res) {
            db.colors.findAll({
                    where: {
                        colorFamily: req.params.colorFamily
                    }
                })
                .then(function (dbColors) {
                    res.json(dbColors);
                });
        });

};