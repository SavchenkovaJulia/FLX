let attempts = 3;
let maxRange = 5;
let randomNumber = getRandomNumber();
let prize = 0;
let stageMaxPrize = 10;
let possiblePrize = stageMaxPrize;

const start = confirm('Do you want to play a game?');

if (start) {
  startGame();
} else {
  alert('You did not become a millionaire, but can.');
}

function getRandomNumber() {
  return Math.floor(Math.random() * maxRange);
}

function startGame() {
  for (let currentAttempt = attempts; currentAttempt > 0; currentAttempt--) {
    let numberInput = parseFloat(
      prompt(
        `Enter a number from 0 to ${maxRange}
        Attempts left: ${currentAttempt}
        Total Prize: ${prize}
        Possible prize on current attempt: ${possiblePrize} $`,'')
    );

    if (randomNumber === numberInput) {
      prize = possiblePrize;
      if (confirm( `Congratulation! Your prize is: ${prize}$. Do you want to continue?`)) {
        stageMaxPrize = stageMaxPrize * 3;
        possiblePrize = stageMaxPrize;
        maxRange = maxRange * 2;
        randomNumber = getRandomNumber();

        return startGame();
      } else {
        alert(`Thank you for a game. Your prize is: ${prize}$`);
        break;
      }
    } else {
      possiblePrize = Math.floor(possiblePrize / 2);
    }
  }
  alert(`Thank you for a game. Your prize is: ${prize}$`);
}