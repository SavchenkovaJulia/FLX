let a = parseInt(prompt('Enter a', ' '));
let b = parseInt(prompt('Enter b', ' '));
let c = parseInt(prompt('Enter c', ' '));

function getSolution() {
  let d = Math.pow(b, 2) - 4 * a * c;
  let x = (-b / 2) * a;
  let x1 = (-b + Math.sqrt(d)) / (2 * a);
  let x2 = (-b - Math.sqrt(d)) / (2 * a);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    return 'Invalid input data';
  }
  if (d < 0) {
    return 'no solution';
  }
  if (d === 0) {
    return `x = ${x}`;
  } else {
    return `x1 = ${x1} and x2 = ${x2}`;
  }
}
alert(getSolution());