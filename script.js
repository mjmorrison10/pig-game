'use strict';
const rollDice = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const playerOne = document.querySelector('#current--0');
const playerTwo = document.querySelector('#current--1');
const playerOneScore = document.querySelector('#score--0');
const playerTwoScore = document.querySelector('#score--1');
const winnerWrapper = document.querySelector('.winner-wrapper');
const newGame = document.querySelector('.btn--new');
const sectionPlayer = document.querySelectorAll('.player');

let currentPlayer = 0;
const playersCurrentScore = [0, 0];
const playersHoldScore = [0, 0];
let playing = true;

playerOneScore.textContent = playersCurrentScore[0];
playerTwoScore.textContent = playersCurrentScore[1];

function holdScore() {
  if (playing) {
    console.log('click');
    playersHoldScore[currentPlayer] += playersCurrentScore[currentPlayer];
    playerOneScore.textContent = playersHoldScore[0];
    playerTwoScore.textContent = playersHoldScore[1];
    playersCurrentScore[currentPlayer] = 0;
    playerOne.textContent = 0;
    playerTwo.textContent = 0;
    switchPlayer();
    checkWinner();
  }
}

function togglePlayerSection() {
  for (let i = 0; i < sectionPlayer.length; i++) {
    sectionPlayer[i].classList.toggle('player--active');
  }
}

function switchPlayer() {
  currentPlayer === 0
    ? ((currentPlayer = 1), togglePlayerSection())
    : ((currentPlayer = 0), togglePlayerSection());
}

function increasePoints(randomNumber) {
  checkWinner();
  currentPlayer === 0
    ? ((playersCurrentScore[0] += randomNumber),
      (playerOne.textContent = playersCurrentScore[0]))
    : ((playersCurrentScore[1] += randomNumber),
      (playerTwo.textContent = playersCurrentScore[1]));
}

winnerWrapper.addEventListener('click', () => {
  winnerWrapper.style.display = 'none';
});

function winnerWrapp() {
  console.log('winner Wrapper');
  if (currentPlayer === 0) {
    winnerWrapper.children[0].textContent = 'Player 2 is the winner!';
  } else {
    winnerWrapper.children[0].textContent = 'Player 1 is the winner!';
  }
}

function checkWinner() {
  if (playersHoldScore[0] >= 100) {
    playing = false;
    winnerWrapper.style.display = 'flex';
    winnerWrapp();
    dice.classList.add('hidden');
  } else if (playersHoldScore[1] >= 100) {
    playing = false;
    winnerWrapper.style.display = 'flex';
    winnerWrapp();
    dice.classList.add('hidden');

    // return;
  }
}

function DiceRoll() {
  if (playing) {
    dice.classList.remove('hidden');
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    dice.src = `dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
      increasePoints(randomNumber);
    } else if (randomNumber === 1) {
      playersCurrentScore[currentPlayer] = 0;
      playerOne.textContent = 0;
      playerTwo.textContent = 0;
      switchPlayer();
    }

    return randomNumber;
  }
}


function resetGame() {
  for (let i = 0; i < sectionPlayer.length; i++) {
    sectionPlayer[i] == sectionPlayer[0]
      ? sectionPlayer[i].classList.add('player--active')
      : sectionPlayer[i].classList.remove('player--active');
  }
  playing = true;
  playersCurrentScore[0] = 0;
  playersCurrentScore[1] = 0;
  playersHoldScore[0] = 0;
  playersHoldScore[1] = 0;
  playerOne.textContent = 0;
  playerTwo.textContent = 0;
  playerOneScore.textContent = 0;
  playerTwoScore.textContent = 0;
  winnerWrapper.style.display = 'none';
}

rollDice.addEventListener('click', DiceRoll);
holdBtn.addEventListener('click', holdScore);
newGame.addEventListener('click', resetGame);





