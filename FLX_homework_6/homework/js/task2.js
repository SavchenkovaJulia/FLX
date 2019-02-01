let moneyAmount = parseFloat(prompt('Amount of money', ' '));
let discount = parseFloat(prompt('Your discount', ' '));

function errorMessage() {
  return 'Invalid input data';
}

function successMessage() {
  let saved = (moneyAmount / 100) * discount;
  let newPrice = moneyAmount - saved;
  return `Price without discount:  ${+moneyAmount.toFixed(2)}
          Discount: ${+discount.toFixed(2)} %
          Price with discount:  ${+newPrice.toFixed(2)}
          Saved: ${+saved.toFixed(2)}`;
}

function getMessage() {
  let result;
  if (
    moneyAmount < 0 ||
    moneyAmount > 9999999 ||
    discount < 0 ||
    discount > 99
  ) {
    result = errorMessage();
  } else {
    result = successMessage();
  }
  return result;
}

alert(getMessage());
