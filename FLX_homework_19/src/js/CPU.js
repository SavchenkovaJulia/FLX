function CPU() {
  const variants = ['rock', 'paper', 'scissors'];
  return variants[Math.floor(Math.random() * variants.length)];
}
