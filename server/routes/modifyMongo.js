const express = require('express');
const router = express.Router();
const pokemon = require('./pokemon.json');
const mongoose = require("mongoose");
const session = require("express-session");
const { param } = require('./getPokemon');
const mongodb = "mongodb+srv://frostbind:Alex1427@cluster0.5wm77.mongodb.net/assignment2?retryWrites=true&w=majority";
let eventDb


const bodyparser = require("body-parser");
router.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

router.use(
  session({
    secret: "assignment3",
    saveUnintialized: true,
    resave: true,
  })
);


mongoose.connect(mongodb, function (err, db) {
    if (err) {throw err;}
    eventDb = db;
})
const eventSchema = new mongoose.Schema({
  time: Date,
  hits: Number
})
const eventModel = mongoose.model("events", eventSchema)

router.get("/api/update/:id", (req, res) => {

    eventModel.updateOne(
      {_id: {$eq: req.params.id}},
      {$inc: {hits: 1}},
      function (err, data) {
        console.log(err);
        res.redirect("./timeline.ejs")
      })
  })
router.get("/api/insert", (req, res) => {
    mongoose.connect(mongodb, function (err, db) {
        db.collection('events').insertOne({
                "date": Date.now(),
                "hits": 0,
          })
          .then(function(result) {
            // process result
          })
    })
    res.render("./timeline.ejs")
});

router.get("/api/read", (req, res) => {
  mongoose.connect(mongodb, function (err, db) {
    db.collection('events').find().toArray(function (err, result) {
      if (result.length < 1) {
        console.log("No results")
      } else {
        res.status(200).send(result)
      }
    });
    })
})

router.post("/api/authenticate", function (req, res) {
  let user;
  mongoose.connect(mongodb, function (err, db) {
    db.collection('users').find(
      {'username': {$eq: req.body.usernameField}}
      ).toArray(function (err, result) {
      if (err) {throw err}
      if (result.length > 0) {
        user = result[0]
      }

      if (req.body.logOut) {
        req.session.authenticated = false
        req.session.user = undefined
        req.session.isAdmin = false
        res.redirect("./../index.html")
      } else if (!user) {
        console.log(`no username matches`);
        res.redirect(`./../login.html`);
      } else if (user.password == req.body.passwordField) {
          req.session.authenticated = true;
          req.session.user = req.body.usernameField;
          req.session.isAdmin = user.isAdmin;
          console.log(`logged in`)
          res.redirect(`./../../index.html`)
      } else {
        console.log("Wrong Password");
        res.render(`./../timeline.html`)
      }
    });
    })
})

router.get("/api/getUser", function (req, res) {
  res.status(200).send(req.session.authenticated);
})

module.exports = router;