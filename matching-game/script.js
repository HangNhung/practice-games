// script.js
const cardsArray = [
  "🍎",
  "🍎",
  "🍌",
  "🍌",
  "🍇",
  "🍇",
  "🍓",
  "🍓",
  "🍒",
  "🍒",
  "🍍",
  "🍍",
  "🥝",
  "🥝",
  "🍉",
  "🍉",
];

// Shuffle the cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Variables
const gameBoard = document.getElementById("game-board");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Initialize game
function initGame() {
  const shuffledCards = shuffle(cardsArray);

  shuffledCards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip card
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

// Check for a match
function checkMatch() {
  lockBoard = true;

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    matched();
  } else {
    unflipCards();
  }
}

// Handle matched cards
function matched() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  resetBoard();
  matchedPairs++;

  if (matchedPairs === cardsArray.length / 2) {
    setTimeout(() => alert("You Win!"), 500);
  }
}

// Unflip unmatched cards
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.textContent = "";
    secondCard.textContent = "";
    resetBoard();
  }, 1000);
}

// Reset variables for the next turn
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Start the game
initGame();
