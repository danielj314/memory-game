const cards = document.querySelectorAll('.card');

let hasBeenFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

// Card flip function

function turnOver() {
    if (lockBoard) return;

    this.classList.add('turn');

    if (!hasBeenFlipped) {
    // grab first card
    hasBeenFlipped = true;
    firstCard= this;
    
    return;
    }

    // grab second card
    hasBeenFlipped = false;
    secondCard= this;
    
    checkForMatch();
}

    // do cards match?
function checkForMatch() {
    let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;
        
    isMatch ? keepCardsFlipped() : unflipCards();
    }


// Cards match
function keepCardsFlipped() {
    firstCard.removeEventListener('click', turnOver);
    secondCard.removeEventListener('click', turnOver);
}

// Cards dont match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('turn');
        secondCard.classList.remove('turn');
    
        lockBoard = false;
    }, 1000);

}

cards.forEach(card => card.addEventListener('click', turnOver))