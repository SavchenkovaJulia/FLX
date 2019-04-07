function lose(userChoice, CPUchoise) {
  CPUScore++;
  CPUScoreElement.innerHTML = CPUScore;
  resultLog.innerHTML = `${userChoice} VS ${CPUchoise}. You've LOST `;
}
