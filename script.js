const animalImages = [
    'dog.png', 'cat.png', 'lion.png', 'elephant.png',
    'giraffe.png', 'monkey.png', 'tiger.png', 'zebra.png'
];

let gameBoard = document.getElementById('game-board');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function createCards() {
    // Duplicera bilderna för att skapa par
    let cardImages = [...animalImages, ...animalImages];
    cardImages.sort(() => 0.5 - Math.random()); // Blanda bilderna

    // Skapa korten
    cardImages.forEach(image => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        let img = document.createElement('img');
        img.src = `images/${image}`;
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    let [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
        matchedPairs++;
        if (matchedPairs === animalImages.length) {
            setTimeout(() => alert('Grattis! Du har matchat alla djur!'), 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];
}

createCards();
