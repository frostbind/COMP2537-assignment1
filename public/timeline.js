to_add = ``;
length = 0;

async function increaseHits(id) {
    type = `http://localhost:5000/api/update`
    await $.ajax({
        type: "GET",
        url: type,
        data: {
            thing: id,
        }
    })

    
}

function print(data) {
    to_add = ``;
    
    to_add += `<div id="timelineContainer">`

    for (let i = 0; i < data.length; i++) {
        to_add += `<div class="eventContainer">`
        to_add += `<div>${new Date(data[i].date)}</div>`
        to_add += ` <form action="/api/update/${data[i]._id}" method="get" id="likeButton">
                        <label for="likeButton">${data[i].hits} Hits</label>
                        <input id="likeButton" type="submit" value="Like">
                    </form>`
        to_add += `</div>`
        length++;
    }

    jQuery("main").html(to_add)
}

async function checkUser(data) {
    console.log(data);
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
    await $.ajax({
        type: `GET`,
        url: `http://localhost:5000/api/getUser`,
        success: checkUser
    })
}

jQuery(document).ready(setup)