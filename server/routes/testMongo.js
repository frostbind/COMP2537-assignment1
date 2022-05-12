const express = require('express');
const router = express.Router();
const pokemon = require('./pokemon.json');
const mongoose = require("mongoose");
const mongodb = "mongodb+srv://frostbind:Alex1427@cluster0.5wm77.mongodb.net/assignment2?retryWrites=true&w=majority";

router.get("/api/testMongo", (req, res) => {
    mongoose.connect(mongodb, function (err, db) {
        // console.log(db.collection("Pokemon").find({}));

        db.collection('Pokemon').insertOne({
            "charmander": {
                "name": "Charmander2",
                "id":   "",
                "atk":  "",
                "def":  "",
                "sAtk": "",
                "sDef": "",
                "spd":  ""
            }
          })
          .then(function(result) {
            // process result
          })
    })

    // res.set("Access-Control-Allow-Origin", "*");    
    // res.set("Access-Control-Allow-Methods", "*");
    // res.set("Content-Type", "application/json");
    //res.status(200).json(pokemon);
    res.status(200).send("hello world")
});

module.exports = router;