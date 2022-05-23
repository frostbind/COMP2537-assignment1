let to_add = ``;
let total = 0;

async function checkout() {
    await $.ajax({
        type: "GET",
        url: `http://localhost:5000/api/checkout`,
        success: function (data) {
            window.alert(`Successfully Checked Out: You will be charged: $${total}`)
            location.reload();
        }
    })
}

function displayPrevOrders(prevOrders) {
    to_add += `<div id="prevOrdersContainer"> <p>Previous Orders</p>`
    for (let i = 0; i < prevOrders.length; i++) {
        to_add += `<div class="eventContainer">`
        to_add += `<div>${new Date(prevOrders[i].date)}</div>`
        if (prevOrders[i].contents.length <= 0) {
            to_add += `<div>No Pokemon Ordered</div>`
        } else {
            for (let j = 0; j < prevOrders[i].contents.length; j++) {
                to_add += `<div>Pokemon Id: ${prevOrders[i].contents[j]}</div>`
            }
        }
        to_add += `</div>`
    }
}

function displayCart(cart) {
    total = 0;
    to_add += `<div id="cartContainer"> Shopping Cart`
    for (let i = 0; i < cart.contents.length; i++) {
        to_add += `<div>Pokemon Id: ${cart.contents[i]}</div>`
        total += parseInt(cart.contents[i])
    }
    to_add += `<div>Your Subtotal: $${total}.00</div>`
    to_add += `<div>Your Total: $${(total * 1.15).toFixed(2)}</div>`
    to_add += `</div>`

    to_add += `<button onclick="checkout();">Checkout</button>`
}

async function setup() {
    await $.ajax({
        type: "GET",
        url: `http://localhost:5000/api/getCart`,
        success: displayCart
    })
    to_add += `<br>`
    await $.ajax({
        type: "GET",
        url: `http://localhost:5000/api/getPrevOrders`,
        success: displayPrevOrders
    })
    jQuery("main").html(to_add);
}

jQuery(document).ready(setup)