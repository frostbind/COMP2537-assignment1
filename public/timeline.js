to_add = ``;
length = 0;

async function increaseHits(id) {

    console.log("click")

    type = `http://localhost:5000/api/update`
    await $.ajax({
        type: "GET",
        url: type,
        data: {
            thing: id,
        },
        success: function () {
            
        }
    })
}

// async function post() {
//     type = `http://localhost:5000/api/testMongo`
//     console.log(type)
//     await $.ajax({
//         type: "POST",
//         url: type,
//     })
// }

function print(data) {
    console.log(data)
    to_add = ``;
    
    to_add += `<div id="timelineContainer">`

    for (let i = 0; i < data.length; i++) {
        to_add += `<div style="border: solid 1px black;">`
        to_add += `<div>${new Date(data[i].date)}</div>`
        to_add += `<div>${data[i].hits}</div>`
        to_add += ` <form action="/api/update/${data[i]._id}" method="get" id="likeButton">
                        <input type="submit" value="Like">
                    </form>`
        to_add += `<span style="display: none;">${data[i]._id}</span>`
        to_add += `</div>`
        length++;
    }

    jQuery("main").html(to_add)
}

async function setup() {
    type = `http://localhost:5000/api/testEvent`
    console.log(type)
    await $.ajax({
        type: "GET",
        url: type,
        success: print
    })
}

jQuery(document).ready(setup)