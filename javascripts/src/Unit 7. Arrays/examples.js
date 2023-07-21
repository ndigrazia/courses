let a = []

a[0] = 1;
a[1] = 1;
a[150] = 1;
a[200] = 0;
a[210] = 0;

//For sparse arrays, length is larger than the highest index of any element.
console.log(a.length);

let count = [1,,3]; // Elements at indexes 0 and 2. No element at index 1
let undefs = [,,]; // An array with no elements but a length of 2
let undefs1 = [,]; // An array with no elements but a length of 2

console.log(count.length);
console.log(undefs.length);
console.log("tamaño: " + undefs1.length);

console.log("--------------------------");

let letters = [..."hello world"];
let s = new Set(letters);
console.log([...s]);


console.log("--------------------------");

let everyother = "";

console.log(letters);

for(let [l, v] of letters.entries()) 
    console.log(l + " " + v);

