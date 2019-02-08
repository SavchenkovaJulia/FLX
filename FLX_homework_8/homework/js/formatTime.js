function formatTime(x) {
  let num = Math.abs(x);
  let days = Math.floor(num / 1440);
  let hours = Math.floor((num - days * 1400) / 60);
  let minutes = num - (hours * 60 + days * 1400);

  return `${days} day(s) ${hours} hours  ${minutes} minutes`;
}