var hasFlippedCard = false;
var gameState = 0;
var gamePokemon
var firstCard;
var secondCard;
var to_add = ``;

$("#gameParams").submit(async function(e) {
    e.preventDefault();
    setTimeout(function () {
        window.alert("you ran out of time")
        location.reload();
    }, 30000)
    to_add = ``;
    const pokemonCards = [];
    gamePokemon = ($("#gameSize").val()) / 2;
    for (let i = 0; i < gamePokemon; i++) {
        x =  Math.floor(Math.random() * 100) + 1
        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${x}`,
            success: function (data) {
                pokemonCards.push(data)
                pokemonCards.push(data)
            }
        })
    }

    to_add += `<div id="gameGrid">`
    for (let i = 0; i < (gamePokemon * 2); i++) {
        x =  Math.floor(Math.random() * pokemonCards.length)
        
        to_add += 
        `<div class="card">
             <img id="${pokemonCards[x].id}" class="front_face flip" src="${pokemonCards[x].sprites.front_default}" alt="Well... Oops?">
             <img class="back_face" src="pokemonCardBack.jpeg" alt="Pokemon Card Back">
         </div>`
         pokemonCards.splice(x, 1);
    }
    to_add += `</div>`
    jQuery("body").html(to_add)
    $(".card").click(flip)
})

function flip() {
    $(this).toggleClass("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = $(this).find(`.front_face`)[0];
        $(firstCard).parent().off(`click`)
    } else {
        //this is the secondd card flipped (checking the equivalence of the cards)
        hasFlippedCard = false;
        secondCard = $(this).find(`.front_face`)[0];
        console.log(`${firstCard.id} and ${secondCard.id}`);
        console.log();
        if (firstCard.id == secondCard.id) {
            gameState++;
            console.log(gameState);
            $(firstCard).parent().off(`click`)
            $(secondCard).parent().off(`click`)

            if (gameState == gamePokemon) {
                setTimeout(function () {
                    alert("You win")
                    location.reload();
                }, 1000)
            }
        } else {
            console.log("not match");
            //unflip flipped cards
            setTimeout(function () {
                $(firstCard).parent().on(`click`, flip)
                $(firstCard).parent().toggleClass(`flip`)
                $(secondCard).parent().toggleClass(`flip`)
            }, 1000)
        }
    }
}

async function setup() {
    
}

jQuery(document).ready(setup)