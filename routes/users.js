var express = require('express');
var router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt')

// Register New User
router.post('/register', function(req, res, next) {
  // take email and password
  if (!req.body.password || !req.body.email) {
    res.status(400).json({
      error: 'Please include email and password.'
    })
    return
  }
  // create a user
    // check if email is already taken
  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (user) {
        res.status(400).json({
          error: 'Email already taken.'
        })
        return
      }
      // hash password
      bcrypt.hash(req.body.password, 10)
        .then((hash) => {
        //store in database
          db.User.create({
            email: req.body.email,
            password: hash
          })
            .then(() => {
              res.status(201).json({
                //respond with success/error
                success: 'New User Created.'
              })
            })
        })
    })
});

module.exports = router;
