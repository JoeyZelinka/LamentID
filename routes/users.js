var express = require("express");
var router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const checkAuth = require('../checkAuth');

// Register New User
router.post("/register", function (req, res, next) {
  // take email and password
  if (!req.body.password || !req.body.email) {
    res.status(400).json({
      error: "Please include email and password.",
    });
    return;
  }
  // create a user
  // check if email is already taken
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).json({
        error: "Email already taken.",
      });
      return;
    }
    // hash password
    bcrypt.hash(req.body.password, 10).then((hash) => {
      //store in database
      db.User.create({
        email: req.body.email,
        password: hash,
      }).then(() => {
        res.status(201).json({
          //respond with success/error
          success: "New User Created.",
        });
      });
    });
  });
});

// Login User
router.post("/login", async (req, res) => {
  //check if email/password
  if (!req.body.password || !req.body.email) {
    res.status(400).json({
      error: "Please include email and password.",
    });
    return;
  }
  //look up user by email
  const user = await db.User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    res.status(400).json({
      error: "Could not find user with that email.",
    });
    return;
  }
  //check password
  const success = await bcrypt.compare(req.body.password, user.password);
  if (!success) {
    res.status(401).json({
      error: "Incorrect password.",
    });
    return;
  }
  //log in
  req.session.user = user;
  const { password, ...userData } = user.dataValues;
  //respond with success/error
  res.json({
    success: "Logged in.",
    user: userData,
  });
});

//Logout
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.json({
    success: "User logged out.",
  });
});

// current
router.get('/current', checkAuth, async (req, res) => {
  const user = await db.User.findByPk(req.session.user.id)

  // extract password from user, assign all other to a new userData variable
  const { password, ...userData } = user.dataValues;

  // respond with success/error
  res.json(userData) // sending back userData which does not include password)
})

module.exports = router;
