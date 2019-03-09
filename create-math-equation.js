const math = require('mathjs');
// Given a string of numbers, you can interpolate basic operations (+, -, * and /) 
// to create an equation that can be evaluated using simple math.
// Given a string of numbers and a value, write a method that prints all of the equations
// that can be generated using that string that evaluate to the given value.
// Ex- f("323",3) will print out "3 * 2 - 3"

const factorial = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

const generateEval = (numStr, result) => {
    const ops = ['+', '-', '*', '/'];
    const numArr = numStr.split('');
    const properLength = numArr.length + (numArr.length - 1);
    const allEvals = [];

    let toEval = [];
    let opsNum = 0;
    let numNum = 0;
    for (let i = 0; i < properLength; i++) {
        // If its even then push a number from numArr
        if (i % 2 === 0) {
            toEval.push(numArr[numNum]);
            numNum++;
        // Else push a operator
        } else {
            toEval.push(ops[opsNum]);
        }
    }
    const readyToEval = toEval.join('');
    allEvals.push(readyToEval);


    for (let i = 0; i < allEvals.length; i++) {
        if (math.eval(allEvals[i]) === result) {
            console.log(allEvals[i] + '=' + result);
        }
    }
};

generateEval('23', 5);