function game(userChoice) {
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
