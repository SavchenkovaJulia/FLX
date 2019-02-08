function reverseNumber(num){
  let str = String(num);
  return Math.sign(num) * parseInt(str.split('').reverse().join(''));
}

reverseNumber(123);