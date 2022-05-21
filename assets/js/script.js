const cards = document.querySelectorAll('.card');
const winModal = document.getElementById("win-modal");
const rulesModal = document.getElementById("rules-modal");
const rulesBtn = document.getElementsByClassName("rules-btn");
const resetBtn = document.getElementsByClassName("reset-btn");




let hasBeenFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let pairsFound = 0;

// Events

// listen for rules modal

function openRules() {
    rulesModal.style.display = "block";
}

function closeRules() {
    rulesModal.style.display = "none";
}

function resetGame() {
    // cards.classList.remove('turn');
    // pairsFound === 0;
    console.log('reset')
}




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

    // Show Game Won Message
    if (pairsFound === 8) {
        winMessage()
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

// Reset unmatched cards 
function resetCards() {
    [hasBeenFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Win message
function winMessage() {
    winModal.style.display = "block";
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', turnOver))