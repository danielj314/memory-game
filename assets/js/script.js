const cards = document.querySelectorAll('.card');

let hasBeenFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

// Card flip function

function turnOver() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('turn');

    if (!hasBeenFlipped) {
    // grab first card
    hasBeenFlipped = true;
    firstCard= this;
    
    return;
    }

    // grab second card
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

    resetBoard();
}

// Cards dont match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('turn');
        secondCard.classList.remove('turn');

        resetBoard();
    }, 1000);

}

function resetBoard() {
    [hasBeenFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', turnOver))