const express = require('express')
const app = express()
const https = require("https");
const port = process.env.PORT || 5000
const mongoose = require("mongoose");
app.set('view engine', 'ejs');

const router = express.Router();
const test = require("./server/routes/test.js")
const testMongo = require("./server/routes/testMongo.js")

mongoose.connect("mongodb+srv://frostbind:Alex1427@cluster0.5wm77.mongodb.net/assignment2?retryWrites=true&w=majority", function (err, db) {
    if (err) {throw err}

    db.collection('userAccounts').find().toArray((err, result) => {
        if (err) {throw err}

        console.log(result)
    })
});

app.get('/profile/:id', function (req, res) {
    console.log(req.params);
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}/`

    https.get(url, function (https_res) {
        data = ``
        https_res.on("data", function (chunk) {
            data += chunk
        })
    
        https_res.on("end", function() {
            data = JSON.parse(data);
            console.log(data)
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
    res.redirect("./timeline.html")
})

app.use(express.static('./public/'));

app.use(test)
app.use(testMongo)

app.listen(port, function (err) {
    if (err)
        console.log(err);
})  