// THIS JS FILE WAS USED FOR A JS PROJECT CODE ALONG TO FAMILIARIZE MYSELF WITH DOM MANIPULATION

'use strict';

/*
// Basic selecting and Manipulating DOM
console.log(document.querySelector('.message').textContent); // text content is used for retrieving text inside an html element

// examples of basic DOM manipulation
document.querySelector('.message').textContent = 'Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 19;

document.querySelector('.guess').value; // this .value represents an input from the input field

console.log(document.querySelector('.guess').value);
*/

// ----------------------------------------------------

// Handling click events

let secretNumber = Math.trunc(Math.random() * 20 + 1); // creates a random number from 1 to 20. Math.trunch removes decimals and * x + 1 if you want it to generate randome numbers from 1 to x
let score = 20;
let highScore = 0;
let oldScore = 0;
console.log(secretNumber);

// Functions
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const displayHighScore = function (highScore) {
  document.querySelector('.highscore').textContent = highScore;
};

const displayNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

const initGameValues = function () {
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  score = 20;
};

// Game logic
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    alert('Please input a number.');
  } else {
    // This happens when you win
    if (guess === secretNumber) {
      // document.querySelector('.message').textContent =
      //   'You got it right! Nice job.';
      displayMessage('You got it right! Nice job.'); // Refactored code

      displayNumber(secretNumber);
      // document.querySelector('.number').textContent = secretNumber;

      // css manipulation
      document.querySelector('body').style.backgroundColor = '#60b347';

      document.querySelector('.number').style.width = '30rem';

      let newScore = score;

      if (newScore > oldScore) {
        highScore = newScore;
        oldScore = newScore;
      } else {
        highScore = oldScore;
      }

      // document.querySelector('.highscore').textContent = highScore;
      displayHighScore(highScore);
    } else if (guess != secretNumber) {
      if (score > 1) {
        // ensures that if the score went to zero, the game ends.
        // document.querySelector('.message').textContent =
        //   guess > secretNumber ? 'Too High!' : 'Too Low!';

        displayMessage(guess > secretNumber ? 'Too High!' : 'Too Low!');
        score--;
        // document.querySelector('.score').textContent = score;
        displayScore(score); // Refactored code
      } else {
        // document.querySelector('.score').textContent = 0;
        displayScore(0);
        displayMessage('You lost the game.');
      }
    }
    // } else if (guess > secretNumber) {
    //   // code runs if input is higher than the secretnumber
    //   if (score > 1) {
    //     // ensures that if the score went to zero, the game ends.
    //     document.querySelector('.message').textContent = 'Too High!';

    //     score--;

    //     document.querySelector('.score').textContent = score;
    //   } else {
    //     document.querySelector('.score').textContent = 0;
    //     document.querySelector('.message').textContent = 'You lost the game.';
    //   }
    // } else if (guess < secretNumber) {
    //   // code runs if the input is lower than the secretnumber
    //   if (score > 1) {
    //     // ensures that if the score went to zero, the game ends.
    //     document.querySelector('.message').textContent = 'Too Low!';

    //     score--;

    //     document.querySelector('.score').textContent = score;
    //   } else {
    //     document.querySelector('.score').textContent = 0;
    //     document.querySelector('.message').textContent = 'You lost the game.';
    //   }
    // }
  }
});

// you dont really need a function that calls these actions.
document.querySelector('.again').addEventListener('click', function () {
  // secretNumber = Math.trunc(Math.random() * 20 + 1);
  // score = 20;
  initGameValues();
  console.log(secretNumber);
  // html text content manipulation
  displayMessage('Start guessing...');
  // document.querySelector('.number').textContent = '?';
  displayNumber('?');
  // document.querySelector('.score').textContent = '20';
  displayScore('20');
  document.querySelector('.guess').value = '';

  // css styles manipulation
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
// .addEventListener() format
// .addEventListener(<input like clicks or keypress>, a function that states what happens. Like the example above, the even listener logs the value we've inputted on the guess input field)

// ----------------------------------------------------

// Manipulating CSS with JS

// format:
// document.querySelector('element').style.css-property
// document.querySelector('body').style.backgroundColor = '#60b347';

// document.querySelector('.number').style.width = '30rem';
