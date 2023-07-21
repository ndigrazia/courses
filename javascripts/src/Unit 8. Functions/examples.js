// This function takes a function and returns a wrapped version
function timed(f) {
    return function(...args) { // Collect args into a rest parameter array
        console.log(`Entering function ${f.name}`);
        let startTime = Date.now();
        try {
            console.log(args);
            // Pass all of our arguments to the wrapped function
            return f(...args); // Spread the args back out again
        }
        finally {
            // Before we return the wrapped return value, print elapsed time.
            console.log(`Exiting ${f.name} after ${Date.now()-startTime}ms`);
        }
    }
}

// Compute the sum of the numbers between 1 and n by brute force
function benchmark(n) {
    let sum = 0;
    for(let i = 1; i <= n; i++) sum += i;
        return sum;
}

// Now invoke the timed version of that test function
console.log(timed(benchmark)(1000000, 100)); // => 500000500000; this is the sum of the numbers

console.log("------------------------------");

function unique() { // Define and invoke
    let counter = 0; // Private state of function below
    function f() { return counter++; };
    return f;}

let execute = unique()();

console.log(execute);

console.log("------------------------------");

let v1 = [1,2,3,5];
let v2 = [...v1];

function test(x, y, z) {
    console.log(x,y,z);
}
console.log(v2);

test(...v1);

console.log("------------------------------");
let biggest = Math.max.apply(Math, [1,2,3,4]);
console.log(biggest);


// Replace the method named m of the object o with a version that logs
// messages before and after invoking the original method.
function trace(o, m) {
    let original = o[m]; // Remember original method in the closure.
    o[m] = function(...args) { // Now define the new method.
        console.log(new Date(), "Entering:", m); // Log message.
        let result = original.apply(o, args); // Invoke original.
        console.log(new Date(), "Exiting:", m); // Log message.
        return result; // Return result.
    };
}

console.log("------------------------------");

let object = {
    op: function() {console.log("op invoked");} 
};

trace(object, "op");

object.op();

console.log("------------------------------");

let f = (y) => {
    console.log(typeof this);
    console.log(this);
    return this.x + y}; 
let succ = f.bind({x:1});
console.log(succ(2)); 

function f2(y) {
    console.log(typeof this);
    console.log(this);
    return this.x + y}; 
    
let succ2 = f2.bind({x:1});
console.log(succ2(2)); 

console.log({}.x);
console.log(undefined + 2);