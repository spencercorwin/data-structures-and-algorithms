const math = require('mathjs');
// Given a string of numbers, you can interpolate basic operations (+, -, * and /) 
// to create an equation that can be evaluated using simple math.
// Given a string of numbers and a value, write a method that prints all of the equations
// that can be generated using that string that evaluate to the given value.
// Ex- f("323",3) will print out "3 * 2 - 3"

/*
  The first 12 digits of pi are 314159265358. We can make these digits into an
  expression evaluating to 27182 (first 5 digits of e) as follows:
  3141 * 5 / 9 * 26 / 5 * 3 - 5 * 8 = 27182
  or
  3 + 1 - 415 * 92 + 65358 = 27182
  Notice that the order of the input digits is not changed. Operators (+,-,/,
  or *) are simply inserted to create the expression.
  Write a function to take a list of numbers and a target, and return all the
  ways that those numbers can be formed into expressions evaluating to the
  target
  For example:
  f("314159265358", 27182) should print:
  3 + 1 - 415 * 92 + 65358 = 27182
  3 * 1 + 4 * 159 + 26535 + 8 = 27182
  3 / 1 + 4 * 159 + 26535 + 8 = 27182
  3 * 14 * 15 + 9 + 26535 + 8 = 27182
  3141 * 5 / 9 * 26 / 5 * 3 - 5 * 8 = 27182
  ------------------------------------------------------------------------------
*/

/*
    Sample input: 123456
    Result        Set size
    ----------------------
    1 2 3 4 5 6   1
    12 34 56      2
    123 456       3
    1234 56       4
    12 3456       4 <-- Notice how this groups in reverse
    12345 6       5
    1 23456       5 <-- Notice how this groups in reverse
    123456        6
 */

// Get every permutation of the input string and return an array of those permutations (array of arrays)
const createSubstrings = (string) => {
    const returnArray = [];

    for (let setSize = 1; setSize < string.length; setSize++) {
        let stringArray = [];
        for (let characterIndex = 0; characterIndex < string.length; characterIndex += setSize) {
            stringArray.push(string.substr(characterIndex, setSize));
        }
        returnArray.push(stringArray);
    }

    const reversedString = string.split('').reverse().join('');
    for (let setSize = 1; setSize < string.length; setSize++) {
        let stringArray = [];
        for (let characterIndex = 0; characterIndex < string.length; characterIndex += setSize) {
            const unreversed = reversedString.substr(characterIndex, setSize).split('').reverse().join('');
            stringArray.push(unreversed);
        }
        // Only add the reversed substring if it doesn't already exist in returnArray
        // findIndex won't work on arrays matching arrays, so each subString and stringArray should be sorted (will use same default method)
        // then made toString so they are able to match. Arrays won't match same array
        if (returnArray.findIndex(subString => subString.sort().toString() === stringArray.sort().toString()) === -1) {
            returnArray.push(stringArray);
        }
    }

    return returnArray;
};

//console.log(createSubstrings('2345'));

const generateOperatorPermutations = (operandsLessOne) => {
    const returnArray = [];
    const operators = ['+', '-', '*', '/'];
    const generate = (operators, prefix, numOfOperators, counter) => {
        if (counter === 0) {
            returnArray.push(prefix);
            return;
        }

        for (let i = 0; i < numOfOperators; i++) {
            const newPrefix = [...prefix, operators[i]];

            generate(operators, newPrefix, numOfOperators, counter - 1);
        }
    }
    generate(operators, [], operators.length, operandsLessOne);
    return returnArray;
}

// Takes in an array of arrays. Each array will output many strings with every possible operator permutation
const generateEquations = (inputPermutations) => {
    const returnArray = []; // Array of strings. Each string will be an equation to evaluate
    for (const operands of inputPermutations) {
        const operatorSet = generateOperatorPermutations(operands.length - 1);
        for (const operators of operatorSet) {
            let output = ''; // Start new string which will be an equation
            for (let i = 0; i < operands.length; i++) {
                // Add an operand
                output += `${operands[i]}`;
                // Add an operator from one of operatorSet
                if (i < operands.length - 1) {
                    output += `${operators[i]}`;
                }
            }
            returnArray.push(output);
        }
    }
    return returnArray;
};

//console.log(generateEquations([ [ '2', '3', '4', '5' ], [ '23', '45' ], [ '234', '5' ], [ '2', '345' ] ]));;


const generateEval = (numStr, target) => {
    const solutions = [];
    const subStrings = createSubstrings(numStr);
    const equations = generateEquations(subStrings);
    for (const equation of equations) {
        if (math.eval(equation) === target) {
            solutions.push(equation);
        }
    }
    if (solutions.length === 0) {
        console.log(`No solutions found for ${numStr}, ${target}`);
    } else {
        console.log(`Found ${solutions.length} solution${solutions.length === 1 ? '' : 's'} for ${numStr}, ${target}:`);
    }
    for (const solution of solutions) {
        console.log(`${solution} = ${target}`);
    }
};

//generateEval('234', 27);
//generateEval('32', 5);
generateEval('232', 12);
//generateEval('3232', 15);
//generateEval('19238', 13);