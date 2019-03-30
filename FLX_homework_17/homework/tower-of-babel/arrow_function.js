var inputs = process.argv.slice(2);
var result = inputs.map(letter => letter[0]).reduce((result, letter) => result + letter);
console.log(result);
