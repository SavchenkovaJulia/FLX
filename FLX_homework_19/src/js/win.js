function win(userChoice, CPUchoise) {
  userScore++;
  userScoreElement.innerHTML = userScore;
  resultLog.innerHTML = `${userChoice} VS ${CPUchoise}. You've WIN `;
}
