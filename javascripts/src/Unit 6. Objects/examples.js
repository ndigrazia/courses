
let o4 = { x: "don't change this value" };
let o5 = Object.create(o4);

console.log("o5");
console.log(o5.x);
o5.x = "change it"
console.log(o5.x);

console.log("o4");
console.log(o4.x);

o5.y = "change it again!!!"

console.log("o5.y");

console.log(o5.y);