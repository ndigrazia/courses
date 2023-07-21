console.log("Hello world");
let frequency = {};
console.log(frequency["m"]);

let text = "Na na na na na na na na Batman!";
console.log(text.split(" "));
let wordSet = new Set(text.split(" "));
console.log(wordSet);
let unique = [];
for(let word of wordSet)  {
    unique.push(word);
}
console.log(unique);
