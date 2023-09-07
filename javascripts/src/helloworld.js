console.log(isNaN(NaN)); // true
console.log(isNaN(Number.NaN)); // true
console.log(isNaN("t3")); // true

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(Number.NaN)); // true 

console.log(Number.isNaN("t3")); // true