const max = process.argv[2];
let FizzBuzz = function* () {
  let i = 1;
  while (i <= max) {
    let value = i;
    i++;
    if (value % 15 === 0) {
      value = 'FizzBuzz';
    } else if (value % 3 === 0) {
      value = 'Fizz';
    } else if (value % 5 === 0) {
      value = 'Buzz';
    }
    yield value;
  }
}();

for (var n of FizzBuzz) {
  console.log(n);
}
