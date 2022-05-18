const cards = document.querySelectorAll('.card');

let hasBeenFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

var pairsFound = 0;

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

    if (pairsFound === 8){
        console.log('finished game!!!')
    }
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
    pairsFound ++;
    
    resetCards();
}

// Cards dont match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('turn');
        secondCard.classList.remove('turn');

        resetCards();
    }, 1000);

}

function resetCards() {
    [hasBeenFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', turnOver))