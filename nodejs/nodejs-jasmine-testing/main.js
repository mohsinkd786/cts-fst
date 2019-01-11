const calculator = require('./calculator');
const sum = calculator._add(12,5);
const diff = calculator._diff(12,5);
const multiply = calculator._mul(12,5);
const divide = calculator._divide(12,5);
const square = calculator._square(4);

console.log(`Sum is ${sum}`);
console.log(`Difference is ${diff}`);
console.log(`Product is ${multiply}`);
console.log(`Division is ${divide}`);
console.log(`Square is ${square}`);