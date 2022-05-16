function processPokeResp(data) {

}

async function setup() {
    await $.ajax({
        type: "GET",
        url: `/api/getPokemon`,
        success: processPokeResp
    })
}

jQuery(document).ready(setup)