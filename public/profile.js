async function addToCart(button) {
    await $.ajax({
        type: "GET",
        url: `http://localhost:5000/api/addToCart/${button.id}`,
        success: function () {
            
        }
    })
    console.log("success");
    location.reload();
}

async function setup() {

}

jQuery(document).ready(setup)