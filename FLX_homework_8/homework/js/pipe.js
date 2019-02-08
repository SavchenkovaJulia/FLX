function pipe() {
  let num = arguments[0];
  let result;
  for (let i = 1; i < arguments.length; i++) {
    result = arguments[i](num);
    num = result;
  }

  return result;
}

function addOne(x) {
  return x + 1;
}

pipe(1, addOne);