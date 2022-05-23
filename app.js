const express = require('express')
const app = express()
const session = require("express-session");
const https = require("https");
const port = process.env.PORT || 5000
const mongoose = require("mongoose");
const bcrypt = require(`bcrypt`);
const saltRounds = 10;
app.set('view engine', 'ejs');

const router = express.Router();
const pokemon = require("./server/routes/pokemon.json")
const getPokemon = require("./server/routes/getPokemon.js")
const modifyMongo = require("./server/routes/modifyMongo.js")

mongoose.connect("mongodb+srv://frostbind:Alex1427@cluster0.5wm77.mongodb.net/assignment2?retryWrites=true&w=majority", function (err, db) {
    if (err) {throw err}

    db.collection('userAccounts').find().toArray((err, result) => {
        if (err) {throw err}
    })
});

app.use(
    session({
      secret: "assignment3",
      saveUnintialized: true,
      resave: true,
    })
  );

app.get('/profile/:id', function (req, res) {
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}/`

    // res.render("profile.ejs", {
    //     "pokeId": pokemon.charmander.id,
    //     "pokeName": pokemon.charmander.name,

    //     "hp": pokemon.charmander.hp,
    //     "atk": pokemon.charmander.atk,
    //     "def": pokemon.charmander.def,
    //     "sAtk": pokemon.charmander.sAtk,
    //     "sDef": pokemon.charmander.sDef,
    //     "spd": pokemon.charmander.spd
    // }); 

    // $.ajax({
    //     type: "GET",
    //     url: `/api/getPokemon`,
    //     success: function (data) {
            
    //     }
    // })

    https.get(url, function (https_res) {
        data = ``
        https_res.on("data", function (chunk) {
            data += chunk
        })
        https_res.on("end", function() {
            data = JSON.parse(data);
            res.render("profile.ejs", {
                "pokeId": req.params.id,
                "pokeName": data.name,

                "hp": data.stats[0].base_stat,
                "atk": data.stats[1].base_stat,
                "def": data.stats[2].base_stat,
                "sAtk": data.stats[3].base_stat,
                "sDef": data.stats[4].base_stat,
                "spd": data.stats[5].base_stat
            }); 
        })
    })
})
app.get("/home", function (req, res) {
    res.redirect("./index.html")
})

app.get("/search", function (req, res) {
    res.redirect("./search.html")
})

app.get("/timeline", function (req, res) {
    if (req.session.user != undefined) {
        res.render("./timeline.ejs")
    } else {
        res.redirect("./login.html")
    }
    
})

app.get("/login", function (req, res) {
    if (req.session.user != undefined) {
        res.redirect("./index.html")
    } else {
        res.redirect("./login.html")
    }
    
})

app.use(express.static('./public/'));

app.use(getPokemon)
app.use(modifyMongo)

app.listen(port, function (err) {
    if (err)
        console.log(err);
})  