const express = require('express');
const router = express.Router();
const pokemon = require('./pokemon.json');
const mongoose = require("mongoose");
const session = require("express-session");
const { param } = require('./getPokemon');
const bcrypt = require(`bcrypt`);
const saltRounds = 10;
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
  hits: Number,
  user: String
})
const eventModel = mongoose.model("events", eventSchema)

const cartSchema = new mongoose.Schema({
  user: String,
  contents: Array,
  isActive: Boolean
})
const cartModel = mongoose.model("cartItems", cartSchema)

router.get("/api/checkout", (req, res) => {
  mongoose.connect(mongodb, function (err, db) {
    if (err) {throw err}
    db.collection(`cartItems`).find({
      user: {$eq: req.session.user},
    }).toArray((err, data) => {
      if (err) {throw err}
      db.collection(`previousOrders`).insertOne({
        user: req.session.user,
        contents: data[0].contents,
        date: Date.now()
      }, function (err, data) {
        if (err) {throw err}
        db.collection(`cartItems`).updateOne(
          {user: {$eq: req.session.user}},
          {$set: {contents: []}},
          function (err, data) {
            if (err) {throw err}
            res.status(200).send(data)
          }
        )
      })
    })
  })
})

router.get("/api/addToCart/:id", (req, res) => {
  console.log(`${req.params.id} and ${req.session.user}`);
  mongoose.connect(mongodb, function (err, db) {
    if (err) {throw err}
    db.collection(`cartItems`).updateOne(
      {user: {$eq: req.session.user}},
      {$push: {contents: req.params.id}},
      function (err, data) {
        if (err) {throw err}
        console.log(data);
        res.status(200).send(data);
      }
    )
  })
})

router.get("/api/update/:id", (req, res) => {
    eventModel.updateOne(
      {_id: {$eq: req.params.id}},
      {$inc: {hits: 1}},
      function (err, data) {
        if (err) {throw err}
        res.status(200).send(data);
      })
  })
router.get("/api/insert", (req, res) => {
    mongoose.connect(mongodb, function (err, db) {
        db.collection('events').insertOne({
                "date": Date.now(),
                "hits": 0,
                "user": req.session.user,
          })
          .then(function(result) {
            // process result
          })
    })
    res.render("./timeline.ejs")
});

router.get("/api/read", (req, res) => {
  mongoose.connect(mongodb, function (err, db) {
    db.collection('events').find().toArray(function (err, events) {
      if (err) {throw err}
      if (events.length < 1) {
        console.log("No results")
      } else {
        res.status(200).send(events.filter(function (event) {
          return event.user == req.session.user;
        }))
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
          res.render("./userProfile.ejs", {
            "username": req.session.user
        });
      } else {
        console.log("Wrong Password");
        res.redirect("./../login.html")
      }
    });
    })
})

router.get("/api/getUser", function (req, res) {
  res.status(200).send(req.session.authenticated);
})

router.get("/userProfile", function (req, res) {
  if (req.session.user != undefined) {
    res.render("./userProfile.ejs", {
      "username": req.session.user
  });
  } else {
    res.redirect("./login.html")
  }
})

router.get("/api/getCart", (req, res) => {
  mongoose.connect(mongodb, (err, db) => {
    if (err) {throw err}
    db.collection(`cartItems`).find({
      user: {$eq: req.session.user}
    }).toArray((err, data) => {
      if (err) {throw err}
      res.status(200).send(data[0])
    })
  })
})

router.get("/api/getPrevOrders", (req, res) => {
  mongoose.connect(mongodb, (err, db) => {
    if (err) {throw err} {
      db.collection(`previousOrders`).find({
        user: {$eq: req.session.user}
      }).toArray((err, data) => {
        if (err) {throw err}
        res.status(200).send(data);
      })
    }
  })
})

module.exports = router;