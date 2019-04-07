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
