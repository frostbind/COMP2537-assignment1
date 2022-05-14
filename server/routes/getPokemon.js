const express = require('express');
const router = express.Router();
const pokemon = require('./pokemon.json')

router.get("/api/getPokemon", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")     
    res.set("Access-Control-Allow-Methods", "*")
    res.set("Content-Type", "application/json");
    res.status(200).json(pokemon);
});

module.exports = router;