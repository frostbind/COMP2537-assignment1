var hasFlippedCard = false;
var gameState = 0;
var firstCard;
var secondCard;

function flip() {
    $(this).toggleClass("flip");



    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = $(this).find(`.front_face`)[0];
    } else {
        //this is the secondd card flipped (checking the equivalence of the cards)
        hasFlippedCard = false;
        secondCard = $(this).find(`.front_face`)[0];

        if ($(`#${firstCard.id}`).attr("src") == $(`#${secondCard.id}`).attr("src")) {
            gameState++;
            //disable flipped cards
            $(`${firstCard}`).parent().off(`click`)
        } else {
            console.log("not match");
            //unflip flipped cards
        }
    }
}

async function setup() {
    $(".card").click(flip)
}

jQuery(document).ready(setup)