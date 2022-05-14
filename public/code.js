to_add = ''

function processPokeResp(data){
    backgroundColor = "";

    // switch(data.types[0].type.name) {
    //     case "normal":  
    //         backgroundColor = "#A8A77A"
    //         break;
    //     case "fire":    
    //         backgroundColor = "#EE8130"
    //         break;
    //     case "water":   
    //         backgroundColor = "#6390F0"
    //         break;
    //     case "electric":
    //         backgroundColor = "#F7D02C"
    //         break;
    //     case "grass":   
    //         backgroundColor = "#7AC74C"
    //         break;
    //     case "ice":     
    //         backgroundColor = "#96D9D6"
    //         break;
    //     case "fighting":
    //         backgroundColor = "#C22E28"
    //         break;
    //     case "poison":  
    //         backgroundColor = "#A33EA1"
    //         break;
    //     case "ground":  
    //         backgroundColor = "#E2BF65"
    //         break;
    //     case "flying":  
    //         backgroundColor = "#A98FF3"
    //         break;
    //     case "psychic": 
    //         backgroundColor = "#F95587"
    //         break;
    //     case "bug":     
    //         backgroundColor = "#A6B91A"
    //         break;
    //     case "rock":    
    //         backgroundColor = "#B6A136"
    //         break;
    //     case "ghost":   
    //         backgroundColor = "#735797"
    //         break;
    //     case "dragon":  
    //         backgroundColor = "#6F35FC"
    //         break;
    //     case "dark":    
    //         backgroundColor = "#705746"
    //         break;
    //     case "steel":   
    //         backgroundColor = "#B7B7CE"
    //         break;
    //     case "fairy":   
    //         backgroundColor = "#D685AD"
    //         break;
    //     default: backgroundColor = "none"
    // }

    backgroundColor = "#EE8130"
    
    // console.log(data.types[0].type.name === "normal")
    // 3- process the reponse and extract the img
    to_add += `
    <div class="pokemonContainer" style="background-color:${backgroundColor}">
        <h2>${data.charmander.name}</h2>
        <div class="image_container"">
            <a href="/profile/${data.charmander.id}">  
                <img src="${data.charmander.img}">
            </a>
        </div>
    </div>
    `
}

async function loadNineImages() {
    for (i = 1; i <= 9; i++) { // Nine times
        if (i % 3 == 1) { // only when i= 1, 4, 7
            to_add += `<div class="images_group">`
        }
        
        // 1- generate randome numebers 
        x =  Math.floor(Math.random() * 100) + 1

        // 2- init a AJAX request to pokeapi.co
        await $.ajax({
            type: "GET",
            url: `/api/test`,
            success: processPokeResp
        })

       

        if (i % 3 == 0) { // only when i= 3, 6, 9
            to_add += `</div>`
        }
    }
    jQuery("main").html(to_add)
}

function setup() {
    loadNineImages();
    // events handlers
}

jQuery(document).ready(setup)