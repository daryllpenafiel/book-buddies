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


  //users table
  app.get("/users", function (req, res) {
    res.render(path.join(__dirname, "../views/viewUsers"));
  });


  //sell page
  app.get("/buy", function (req, res) {
    res.render(path.join(__dirname, "../views/buyBooks"));
  });

  //myAds page
  app.get("/myAds", function (req, res) {
    res.render(path.join(__dirname, "../views/myads"));
  });


  app.get("/createUser", function (req, res) {
    res.render(path.join(__dirname, "../views/createUser"));
  });

  //single book view Page
  app.get("/viewBook", function (req, res) {
    res.render(path.join(__dirname, "../views/viewBook"));
  });

  app.get("/byCategory/*", function (req, res) {
    res.render(path.join(__dirname, "../views/byCategory"));
  });

  //error
  app.get("/*", function (req, res) {
    res.render(path.join(__dirname, "../views/404"));
  });


};