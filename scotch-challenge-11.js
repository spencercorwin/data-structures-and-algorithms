// Scotch.io Code Challenge #11: Javascript Functional Programming
// https://scotch.io/bar-talk/code-challenge-11-javascript-functional-programming

// ARRAY 1
const texasss = [
  {
    name: 'Mike',
    age: 23,
    gender: 'm',
    us: false,
  },
  {
    name: 'Liz',
    age: 20,
    gender: 'f',
    us: true,
  },
  {
    name: 'Chris',
    age: 102,
    gender: 'm',
    us: true,
  },
  {
    name: 'Chuloo',
    age: 27,
    gender: 'm',
    us: false,
  },
  {
    name: 'Annie',
    age: 30,
    gender: 'f',
    us: true,
  },
]

// Part 1 - Find all users older than 24
console.log('Array 1, Part 1 - Find all users older than 24');
const arr1part1 = texasss.filter(person => person.age > 24);
console.table(arr1part1);

// Part 2 - Find the total age of all users
console.log('Array 1, Part 2 - Find the total age of all users');
const arr1part2 = texasss.reduce((starter, person) => starter + person.age, 0);
console.log(arr1part2);

// Part 3 - List all female coders
console.log('Arra 1, Part 3 - List all female coders');
const arr1part3 = texasss.filter(person => person.gender === 'f');
console.table(arr1part3);


// ARRAY 2
const newieyork = [
  {
    name: 'Michelle',
    age: 19,
    coder:true,
    gender: 'f',
    us: true,
  },
  {
    name: 'Sam',
    age: 25,
    coder:false,
    gender: 'm',
    us: false,
  },
  {
    name: 'Ivy',
    age: 26,
    coder:true,
    gender: 'f',
    us: false,
  },
  {
    name: 'Nick',
    age: 32,
    coder:true,
    gender: 'm',
    us: true,
  },
  {
    name: 'Jim Beglin',
    age: 65,
    coder:false,
    gender: 'm',
    us: true,
  },
]

// Part 1 - List all users in US in ascending order
console.log('Array 2, Part 1 - List all users in US in ascending order');
const arr2part1 = newieyork.filter(person => person.us).sort((current, next) => current.age < next.age);
console.table(arr2part1);

// Part 2 - Sort all users by age
console.log('Array 2, Part 2 - Sort all users by age');
const arr2part2 = newieyork.sort((current, next) => next.age - current.age);
console.table(arr2part2);

// Part 3 -  List all female coders
console.log('Array 2, Part 3 - List all female coders');
const arr2part3 = newieyork.filter(person => person.gender === 'f' && person.coder);
console.table(arr2part3);


// ARRAY 3
const vegzas = [
  {
    name: 'Charly',
    age: 32,
    coder:true,
    gender: 'm',
  },
  {
    name: 'Law',
    age: 21,
    coder:true,
    gender: 'm',
  },
  {
    name: 'Rosey',
    age: 42,
    coder:false,
    gender: 'f',
  },
  {
    name: 'Steph',
    age: 18,
    coder:true,
    gender:'f'
  },
  {
    name: 'Jon',
    age: 47,
    coder:false,
    gender: 'm',
  },
]

// Part 1 - Find the total age of male coders under 25
console.log('Array 3, Part 1 - Find the total age of male coders under 25');
const arr3part1 = vegzas.reduce((starter, person) => {
  if (person.age < 25 && person.gender === 'm' && person.coder === true) {
    return starter + person.age;
  } else {
    return starter;
  }
}, 0);
console.log(arr3part1);

// Part 2 - List all male coders over 30
console.log('Array 3, Part 2 - List all male coders over 30');
const arr3part2 = vegzas.filter(coder => coder.coder && coder.gender === 'm' && coder.age > 30);
console.table(arr3part2);

// Part 3 - Find the total age of everyone in texasss, newieyork and vegzas combined.
console.log('Array 3, Part 3 - Find the total age of everyone in texass, newieyork, and vegzas combined');
const allPeople = [...texasss, ...newieyork, ...vegzas];
const arr3part3 = allPeople.reduce((starter, person) => starter + person.age, 0);
console.log(arr3part3);