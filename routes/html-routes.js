var path = require("path");

module.exports = function (app) {
  //home page
  app.get("/", function (req, res) {
    res.render(path.join(__dirname, "../views/home"));
  });

  app.get("/home", function (req, res) {
    res.render(path.join(__dirname, "../views/home"));
  });

  //sell page
  app.get("/sell", function (req, res) {
    res.render(path.join(__dirname, "../views/sellBooks"));
  });

  
  //sell page
  app.get("/buy", function (req, res) {
    res.render(path.join(__dirname, "../views/buyBooks"));
  });

  // //colors page
  // app.get("/byColor/*", function (req, res) {
  //   res.render(path.join(__dirname, "../views/byColor"));
  // });

  //error
  app.get("/*", function (req, res) {
    res.render(path.join(__dirname, "../views/404"));
  });


};