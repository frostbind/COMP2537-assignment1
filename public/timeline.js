const { default: mongoose } = require("mongoose")

function post() {
    mongoose.post("")
}


function print(data) {
    console.log(data)
}

async function setup() {
    type = `http://localhost:5000/api/test`
    console.log(type)
    await $.ajax({
        type: "GET",
        url: type,
        success: print
    })
}

jQuery(document).ready(setup)