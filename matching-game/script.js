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

// Variables
const gameBoard = document.getElementById("game-board");
// Add a timer element to your HTML
const timerElement = document.getElementById("timer");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let unflipCardsTimeout = null;
let timer;
let timeLeft = 180; // 3 minutes in seconds
let gameOver = false; // Flag to indicate if the game is over

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      showRemainingCards();
      gameOver = true; // Set the game over flag
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `Time remaining: ${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function showRemainingCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (!card.classList.contains("flipped")) {
      card.classList.add("flipped");
      card.textContent = card.dataset.emoji;
    }
  });
  clearTimeout(unflipCardsTimeout);
}

// Shuffle the cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

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

  startTimer();
}

// Flip card
function flipCard() {
  if (lockBoard || this === firstCard || gameOver) return;

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
  unflipCardsTimeout = setTimeout(() => {
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
