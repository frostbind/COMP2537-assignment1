HTMLCollection.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.forEach = Array.prototype.forEach;
to_add = ``;
length = 0;

$(document.getElementsByClassName("likeButton")).click(function () {
    alert($(this).text());
});



async function incrementHits(button) {
    console.log(button.id);
    await $.ajax({
        type: "GET",
        url: `http://localhost:5000/api/update/${button.id}`,
        success: function () {
            
        }
    })
    console.log("success");
    location.reload();
}

function print(data) {
    to_add = ``;
    
    to_add += `<div id="timelineContainer">`

    for (let i = 0; i < data.length; i++) {
        to_add += `<div class="eventContainer">`
        to_add += `<div>${new Date(data[i].date)}</div>`
        to_add += `<p>${data[i].hits}</p>`
        to_add += `<button id="${data[i]._id}" onclick="incrementHits(this);">Like</button>`
        to_add += `</div>`
    }

    jQuery("main").html(to_add)
}

async function checkUser(data) {
    if (data) {
        type = `http://localhost:5000/api/read`
        await $.ajax({
            type: "GET",
            url: type,
            success: print
        })
    } else {
        jQuery("main").html(`<div>Log In First!</div>`)
    }
}

async function setup() {
    console.log("timeline setup");
    await $.ajax({
        type: `GET`,
        url: `http://localhost:5000/api/getUser`,
        success: checkUser
    })
}

jQuery(document).ready(setup)

