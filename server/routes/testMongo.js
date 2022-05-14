const express = require('express');
const router = express.Router();
const pokemon = require('./pokemon.json');
const mongoose = require("mongoose");
const mongodb = "mongodb+srv://frostbind:Alex1427@cluster0.5wm77.mongodb.net/assignment2?retryWrites=true&w=majority";
let eventDb
mongoose.connect(mongodb, function (err, db) {
    if (err) {throw err;}
    eventDb = db;
})

router.get ("/api/update", (req, res) => {
  mongoose.connect(mongodb, function (err, db) {
    db.collection('Events').update(
      {hits: {$eq: req.thing}},
      {$set: {hits: hits+1}},
      {multi: true})
  })
})
router.get("/api/testMongo", (req, res) => {
    mongoose.connect(mongodb, function (err, db) {
        db.collection('Events').insertOne({
            "event": {
                "date": Date.now(),
                "hits": 0,
            }
          })
          .then(function(result) {
            // process result
          })
    })
    res.redirect("./../timeline.html")
});

router.get("/api/testEvent", (req, res) => {
  mongoose.connect(mongodb, function (err, db) {
    db.collection('Events').find().toArray(function (err, result) {
      if (result.length < 1) {
        console.log("No results")
      } else {
        res.status(200).send(result)
      }
    });
    })
    
})

module.exports = router;