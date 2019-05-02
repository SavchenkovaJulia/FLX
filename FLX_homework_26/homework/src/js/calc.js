$(document).ready(function() {
  let memory = [];
  let inputNum = [];
  const operator = ['+', '-', '*', '/'];

  const $calculatorButtons = $('.calculator__buttons');
  const $calculatorMemoryField = $('.calculator__memory');
  const $calculatorOutputField = $('.calculator__output');

  $calculatorButtons.on('click', function(e) {
    const activeButton = e.target;

    switch (activeButton.value) {
      case 'mc':
        memory = [];
        inputNum = [];
        $calculatorMemoryField.text('');
        $calculatorOutputField.text('');
        break;
      case 'c':
        inputNum = [];
        $calculatorOutputField.text('');
        break;
      case '.':
        if (inputNum.length === 0) {
          inputNum.push('0');
          inputNum.push('.');
        }

        if (inputNum.join('').indexOf('.') === -1) {
          let temp = inputNum.join('');
          inputNum = [];
          inputNum.push(temp);
          inputNum.push(activeButton.value);
        }

        $calculatorOutputField.text(inputNum.join(''));
        break;
      case '=':
        memory.push(inputNum.join(''));
        let result = eval(memory.join(''));

        if (result % 1 !== 0) {
          result = result.toFixed(12);
          result = parseFloat(result);
        }

        inputNum = [];
        inputNum.push(result);
        $calculatorOutputField.text(result);
        $calculatorMemoryField.text('');
        memory = [];
        break;
    }

    if (
      $(activeButton)
        .attr('class')
        .indexOf('button_number') !== -1 &&
      inputNum.length < 12
    ) {
      inputNum.push(activeButton.value);
      $calculatorOutputField.text(inputNum.join(''));
    }

    if (
      $(activeButton)
        .attr('class')
        .indexOf('button_operation') !== -1 &&
      inputNum.length !== 0
    ) {
      memory.push(inputNum.join(''));
      memory.push(activeButton.value);
      inputNum = [];
      $calculatorMemoryField.text(memory.join(' '));
      $calculatorOutputField.text('');
    } else if (
      $(activeButton)
        .attr('class')
        .indexOf('button_operation') !== -1 &&
      operator.indexOf(memory[memory.length - 1]) !== -1 &&
      activeButton.value != 'c'
    ) {
      inputArr.pop();
      inputArr.push(activeButton.value);
      $calculatorMemoryField.text(memory.join(' '));
    }
  });
});
