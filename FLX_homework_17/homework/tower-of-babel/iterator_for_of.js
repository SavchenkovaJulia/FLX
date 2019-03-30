const max = process.argv[2];
let FizzBuzz = {
  [Symbol.iterator]() {
    let i = 1;
    return {
      next() {
        let value = i;
        if (i > max) return { done: true };

        if (value % 15 === 0) {
          value = 'FizzBuzz';
        } else if (value % 3 === 0) {
          value = 'Fizz';
        } else if (value % 5 === 0) {
          value = 'Buzz';
        }
        i++;
        return { done: false, value: value };
      }
    };
  }
};

for (var n of FizzBuzz) {
  console.log(n);
}
