const cards = document.querySelectorAll('.card')

function turnOver() {
    this.classList.toggle('turn');
}

cards.forEach(card => card.addEventListener('click', turnOver))