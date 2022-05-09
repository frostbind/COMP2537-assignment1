const express = require('express')
const app = express()
const https = require("https");
app.set('view engine', 'ejs');

app.listen(5000, function (err) {
    if (err)
        console.log(err);
})   

// app.get('/', function (req, res) {
//     res.send('<h1> GET request to homepage </h1>')    
// })

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
    res.redirect("/")
})

app.get("/search", function (req, res) {
    res.redirect("search.html")
})

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "/index.html");
//   })

app.use(express.static('./public'));


