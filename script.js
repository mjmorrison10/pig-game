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

let currentPlayer = 0;
const playersCurrentScore = [0, 0];
const playersHoldScore = [0, 0];

playerOneScore.textContent = playersCurrentScore[0];
playerTwoScore.textContent = playersCurrentScore[1];

function holdScore() {
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

function switchPlayer() {
  if (currentPlayer === 0) {
    console.log('The current player is now 1');
    currentPlayer = 1;
  } else {
    console.log('The current player is now 0');
    currentPlayer = 0;
  }
}

function increasePoints(randomNumber) {
  checkWinner();
  if (currentPlayer === 0) {
    playersCurrentScore[0] += randomNumber;
    playerOne.textContent = playersCurrentScore[0];
  } else {
    playersCurrentScore[1] += randomNumber;
    playerTwo.textContent = playersCurrentScore[1];
  }
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
    winnerWrapper.style.display = 'flex';
    winnerWrapp();
    // winnerWrapper.children[0].innerHTML =
    //   currentPlayer === 0
    // ? 'Player 2 is the winner!'
    // : 'Player 1 is the winner!';
    // return;
  } else if (playersHoldScore[1] >= 100) {
    winnerWrapper.style.display = 'flex';
    winnerWrapp();
    // return;
  }
}

function DiceRoll() {
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

function resetGame() {
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
