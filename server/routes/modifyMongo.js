const express = require('express');
const router = express.Router();
const pokemon = require('./pokemon.json');
const mongoose = require("mongoose");
const { param } = require('./getPokemon');
const mongodb = "mongodb+srv://frostbind:Alex1427@cluster0.5wm77.mongodb.net/assignment2?retryWrites=true&w=majority";
let eventDb
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
        res.redirect("./../../timeline.html")
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
    res.redirect("./../timeline.html")
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

module.exports = router;