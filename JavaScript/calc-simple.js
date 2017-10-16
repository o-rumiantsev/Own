'use strict';

const readline =  require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

calculationLoop();

function calculationLoop() {
  rl.question('Enter expression: ', (answer) => {
    if (answer === 'exit') {
      rl.close()
    } else {
      const expr = answer.split(' ');
      rl.pause()
      doOperation(expr[0], expr[1], expr[2]);
      calculationLoop();
    }
  })
}

function doOperation(a, operator, b) {
  const operand1 = parseFloat(a);
  const operand2 = parseFloat(b);
  switch (operator) {
    case '+':
      Ops.add(operand1, operand2);
      break;
    case '-':
      Ops.subtr(operand1, operand2);
      break;
    case '*':
      Ops.mult(operand1, operand2);
      break;
    case '/':
      Ops.div(operand1, operand2);
      break;
    case '%':
      Ops.divRest(operand1, operand2);
      break;
    case '^':
      Ops.power(operand1, operand2);
      break;
    default:
      console.log(`Error: ${operator} is not a symbol of operation`);
  }
}

const Ops = {
  add: (a, b) => console.log(a + b),
  subtr: (a, b) => console.log(a - b) ,
  mult: (a, b) => console.log(a * b),
  div: (a, b) => console.log(a / b),
  divRest: (a, b) => console.log(Math.floor(a / b) + ' rest: ' + (a % b)),
  power: (a, b) => console.log(Math.pow(a, b)) 
};

