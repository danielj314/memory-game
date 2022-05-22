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

// Modals open and close

function openRules() {
    rulesModal.style.display = "block";
}

function closeRules() {
    rulesModal.style.display = "none";
}

function playAgain() {
    winModal.style.display = "none";
    resetGame()
}

// Win message
function winMessage() {
    winModal.style.display = "block";
}

// Card flip function

function turnOver() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('turn');

    if (!hasBeenFlipped) {
        // grab first card
        hasBeenFlipped = true;
        firstCard = this;

        return;
    }

    // grab second card
    secondCard = this;

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
    pairsFound++;

    resetCards();
}

// Cards dont match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('turn');
        secondCard.classList.remove('turn');

        resetCards();
    }, 500);
}

// Reset unmatched cards 
function resetCards() {
    [hasBeenFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


// Shuffle cards
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

// Reset game
function resetGame() {
    cards.forEach(card => card.classList.remove('turn'));
    addClickListener()
    shuffle();
    resetCards();
    hasBeenFlipped = false;
    pairsFound = 0;
}

function addClickListener() {
    cards.forEach(card => card.addEventListener('click', turnOver))
}

(function newGame() {
    shuffle()
    addClickListener()
})();