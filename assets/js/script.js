const cards = document.querySelectorAll('.card');

let hasBeenFlipped = false;
let firstCard, secondCard;

// Card flip function

function turnOver() {
    this.classList.add('turn');

    if (!hasBeenFlipped) {
    // grab first card
    hasBeenFlipped = true;
    firstCard= this;
    } else {
    // grab second card
    hasBeenFlipped = false;
    secondCard= this;
    
    checkForMatch()
    }
}

    // do cards match?
function checkForMatch() {
    if (firstCard.dataset.animal === secondCard.dataset.animal) {
        keepCardsFlipped()
    } else {
        unflipCards()
    }
}

// Cards match
function keepCardsFlipped() {
    firstCard.removeEventListener('click', turnOver);
    secondCard.removeEventListener('click', turnOver);
}

// Cards dont match
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('turn');
        secondCard.classList.remove('turn');
        },  1000);
}

cards.forEach(card => card.addEventListener('click', turnOver))