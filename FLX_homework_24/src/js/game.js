import { CPU } from './CPU';
import { $ } from './getById';

export let userScore = 0;
export let CPUScore = 0;
export const userScoreElement = $('userScore');
export const CPUScoreElement = $('CPUScore');

export const resultLog = $('resultLog');
export const rockBtn = $('rockBtn');
export const paperBtn = $('paperBtn');
export const scissorsBtn = $('scissorsBtn');
export const resetBtn = $('resetBtn');

export function game(userChoice) {
  if (userScore === 3 || CPUScore === 3) {
    resultLog.innerHTML = `Game over. Result: You: ${userScore} Computer: ${CPUScore}`;
    return;
  }
  const CPUchoise = CPU();
  switch (userChoice + ' ' + CPUchoise) {
    case 'rock scissors':
    case 'scissors paper':
    case 'paper rock':
      win(userChoice, CPUchoise);
      break;
    case 'rock paper':
    case 'scissors rock':
    case 'paper scissors':
      lose(userChoice, CPUchoise);
      break;
    case 'rock rock':
    case 'scissors scissors':
    case 'paper paper':
      draw();
      break;
  }
}

function draw() {
  resultLog.innerHTML = 'Draw';
}

function win(userChoice, CPUchoise) {
  userScore++;
  userScoreElement.innerHTML = userScore;
  resultLog.innerHTML = `${userChoice} VS ${CPUchoise}. You've WIN `;
}

function lose(userChoice, CPUchoise) {
  CPUScore++;
  CPUScoreElement.innerHTML = CPUScore;
  resultLog.innerHTML = `${userChoice} VS ${CPUchoise}. You've LOST `;
}

function reset() {
  userScore = 0;
  CPUScore = 0;
  CPUScoreElement.innerHTML = CPUScore;
  userScoreElement.innerHTML = userScore;
  resultLog.innerHTML = '';
}

export function gameListener() {
  rockBtn.addEventListener('click', () => {
    game('rock');
  });
  paperBtn.addEventListener('click', () => {
    game('paper');
  });
  scissorsBtn.addEventListener('click', () => {
    game('scissors');
  });
  resetBtn.addEventListener('click', () => {
    reset();
  });
}
