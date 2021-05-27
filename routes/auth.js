const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!user) {
      res.status(401).json(failureDetails);
      return;
    }
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      res.status(200).json(user);
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const { email, username, password, repeatedPassword } = req.body;

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(401).json({ message: "The email already exists" });
      return;
    }

    if (email === "" || password === "") {
      res.status(401).json({ message: "Indicate username and password" });
      return;
    }

    if (repeatedPassword !== password) {
      res.status(401).json({ message: "Passwords don't match" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass,
    });

    newUser
      .save()
      .then(() => {
        res.status(200).json({ message: "success" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Something went wrong" });
      });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logout successful" });
});

router.get("/currentuser", isAuth, async (req, res) => {
  await User.findById(req.user.id)
    .populate("projects")
    .then((user) => res.status(200).json({ user }))
    .catch((err) =>
      res
        .status(500)
        .json({ message: `Error ocurred in get /currentuser ${err}` })
    );
});

function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ message: "Log in first" });
}

module.exports = router;
