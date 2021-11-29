'use strict';

const number = document.querySelector('.number');
const score = document.querySelector('.score');
const guess = document.querySelector('.guess');
const check = document.querySelector('.check');
const hiscore = document.querySelector('.highscore');
const reset = document.querySelector('.again');

let winningNumber = Math.floor(Math.random() * 20 + 1);

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const backgroundColor = function (color) {
  document.body.style.backgroundColor = color;
};

const errorMessage = function (color) {
  document.body.style.backgroundColor = color;
  score.textContent = parseInt(score.textContent) - 1;
  timeOut('#222');
};

console.log('winning number', winningNumber);

check.addEventListener('click', checkWinner);

function checkWinner(e) {
  e.preventDefault();
  let currentScore = parseInt(score.textContent);

  // Losing the game
  if (currentScore >= 0) {
    displayMessage('You lost the game.');
    backgroundColor('red');
    currentScore = 0;

    // Winning the game
  } else if (guess.value == winningNumber) {
    displayMessage('Correct number!');
    backgroundColor('green');

    number.textContent = winningNumber;

    // Highscore
    if (hiscore.textContent < score.textContent) {
      hiscore.textContent = score.textContent;
    }
  }

  // If guess is wrong
  else if (guess.value != winningNumber) {
    displayMessage(guess.value > winningNumber ? 'Too high!' : 'Too low!');
    errorMessage('red');
  }

  // Everything else
  else {
    displayMessage('Please enter a number!');
    errorMessage('red');
  }
}

function timeOut(color) {
  setTimeout(function () {
    backgroundColor(color);
  }, 100);
}

function resetGame() {
  guess.value = '';
  score.textContent = 20;
  backgroundColor('#222');
  displayMessage('Start guessing...');
  winningNumber = Math.floor(Math.random() * 21);
  console.log('winning number', winningNumber);
}

reset.addEventListener('click', resetGame);
