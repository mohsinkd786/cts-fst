const calculator = require('./calculator');
const i = 10;
const j = 5;
const sum = calculator.add(i,j);
console.log(`Sum of i , j  ${sum}`);
//
const diff = calculator.subtract(i,j);
console.log(`Difference of i , j  ${diff}`);
//
const product = calculator.multiply(i,j);
console.log(`Product of i , j  ${product}`);
//
const div = calculator.division(i,j);
console.log(`Division of i , j  ${div}`);
//
const square = calculator.square(i);
console.log(`Square of i  ${square}`);