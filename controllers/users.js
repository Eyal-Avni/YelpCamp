const User = require("../models/user");
const mongoose = require("mongoose");

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (password.length >= 6 && password.length <= 12) {
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.logIn(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Yelp Camp!");
        res.redirect("/campgrounds");
      });
    } else {
      req.flash(
        "error",
        "Password must be atleast 6 and no more than 12 characters long "
      );
      res.redirect("register");
    }
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome Back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};
module.exports.logout = (req, res) => {
  req.logOut();
  req.flash("success", "Goodbye!");
  res.redirect("/campgrounds");
};
