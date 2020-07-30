// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html")); // if the user doesn't have an account it will route them to the sign up page
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members"); // redirects to members page 
    }
    res.sendFile(path.join(__dirname, "../public/login.html")); // if the user isn't logged in then it will route them to the login page
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route 
  // they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) { // the middleware function is run before the members route
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
