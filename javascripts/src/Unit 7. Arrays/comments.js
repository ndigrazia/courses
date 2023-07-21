//Arrays

/*

An array is an ordered collection of values. Each value
is called an element, and each element has a numeric position in the array, known as
its index.
JavaScript arrays are untyped: an array element may be of any type, and different
elements of the same array may be of different types.

Array elements may even be objects or other arrays, which allows you to create complex 
data structures, such as arrays of objects and arrays of arrays.

JavaScript arrays are zero-based and use 32-bit indexes: the index of the first element is 0, 
and the highest possible index is 4294967294 (232−2).

JavaScript arrays are dynamic: they grow or shrink as needed,and there is no need to declare 
a fixed size for the array when you create it or to reallocate it when the size changes.

JavaScript arrays may be sparse: the elements need not have contiguous indexes, and
there may be gaps. Every JavaScript array has a length property. For nonsparse
arrays, this property specifies the number of elements in the array. For sparse arrays,
length is larger than the highest index of any element.

JavaScript arrays are a specialized form of JavaScript object, and array indexes are
really little more than property names that happen to be integers.Implementations typically
optimize arrays so that access to numerically indexed array elements is generally
significantly faster than access to regular object properties.

Arrays inherit properties from Array.prototype, which defines a rich set of array
manipulation methods. Most of these methods are generic, which means that they work 
correctly not only for true arrays, but for any “array-like object.”

Finally, JavaScript strings behave like arrays of characters-

ES6 introduces a set of new array classes known collectively as “typed arrays.” Unlike
regular JavaScript arrays, typed arrays have a fixed length and a fixed numeric element
type. They offer high performance.

7.1 Creating Arrays

There are several ways to create arrays.

• Array literals
• The ... spread operator on an iterable object
• The Array() constructor
• The Array.of() and Array.from() factory methods

7.1.1 Array Literals

By far the simplest way to create an array is with an array literal, which is simply a
comma-separated list of array elements within square brackets.
*/

let empty = []; // An array with no elements
let primes = [2, 3, 5, 7, 11]; // An array with 5 numeric elements
let misc = [ 1.1, true, "a", ]; // 3 elements of various types + trailing comma

/*The values in an array literal need not be constants; they may be arbitrary
expressions:*/

let base = 1024;
let table = [base, base+1, base+2, base+3];

//Array literals can contain object literals or other array literals:

let b = [[1, {x: 1, y: 2}], [2, {x: 3, y: 4}]];

/*If an array literal contains multiple commas in a row, with no value between, the
array is sparse. Array elements for which values are omitted do not exist
but appear to be undefined if you query them.*/

let count = [1,,3]; // Elements at indexes 0 and 2. No element at index 1
let undefs = [,,]; // An array with no elements but a length of 2

/*
Array literal syntax allows an optional trailing comma, so [,,] has a length of 2,
not 3.*/

//7.1.2 The Spread Operator

/* You can use the “spread operator,” ..., to include the elements of one array 
within an array literal:*/

let a = [1, 2, 3];
let c = [0, ...a, 4]; // c == [0, 1, 2, 3, 4]

/*
The three dots “spread” the array a so that its elements become elements within the
array literal that is being created. It is as if the ...a was replaced by the elements of
the array a.

The spread operator is a convenient way to create a (shallow) copy of an array:*/

let original = [1,2,3];
let copy = [...original];

copy[0] = 0; // Modifying the copy does not change the original
original[0] // => 1

/*
The spread operator works on any iterable object. Strings are iterable, so you can 
use a spread operator to turn any string into an array of single-character strings.*/

let digits = [..."0123456789ABCDEF"];
digits // => ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]

/*
Set objects are iterable. so an easy way to remove duplicate elements from
an array is to convert the array to a set and then immediately convert the set back to
an array using the spread operator*/

let letters = [..."hello world"];
let s = new Set(letters);
console.log([...s]);

//7.1.3 The Array() Constructor

/*
Another way to create an array is with the Array() constructor. You can invoke this
constructor in three distinct ways*/

//Call it with no arguments:

let a1 = new Array();

/*This method creates an empty array with no elements and is equivalent to the
array literal [].*/

//Call it with a single numeric argument, which specifies a length:

let a2 = new Array(10);

/*
This technique creates an array with the specified length. This form of the
Array() constructor can be used to preallocate an array when you know in
advance how many elements will be required. Note that no values are stored in
the array*/

/*Explicitly specify two or more array elements or a single non-numeric element
for the array:*/

let a3 = new Array(5, 4, 3, 2, 1, "testing, testing");

/*Using an array literal is almost always simpler than this usage of the Array()
constructor.*/

//7.1.4 Array.of()

/*
When the Array() constructor function is invoked with one numeric argument, it
uses that argument as an array length. But when invoked with more than one
numeric argument, it treats those arguments as elements for the array to be created.
This means that the Array() constructor cannot be used to create an array with a single
numeric element.

In ES6, the Array.of() function addresses this problem: it is a factory method that
creates and returns a new array, using its argument values (regardless of how many of
them there are) as the array elements:*/

Array.of() // => []; returns empty array with no arguments
Array.of(10) // => [10]; can create arrays with a single numeric argument
Array.of(1,2,3) // => [1, 2, 3]


//7.1.5 Array.from()

/*
It expects an iterable or array-like object as its first argument and returns a new array 
that contains the elements of that object.

With an iterable argument, Array.from(iterable) works like the spread operator [...iterable]
does. It is also a simple way to make a copy of an array:
*/

let copy = Array.from(original);

/*
Array.from() is also important because it defines a way to make a true-array copy of
an array-like object. 

Array-like objects are non-array objects that have a numeric length property and have 
values stored with properties whose names happen to be integers.

When working with client-side JavaScript, the return values of some web browser methods 
are array-like, and it can be easier to work with them if you first convert them to true 
arrays:*/

let truearray = Array.from(arraylike);

/*
Array.from() also accepts an optional second argument. If you pass a function as the
second argument, then as the new array is being built, each element from the source
object will be passed to the function you specify, and the return value of the function
will be stored in the array instead of the original value.*/


//7.2 Reading and Writing Array Elements

/*
You access an element of an array using the [] operator. A reference to the array
should appear to the left of the brackets. An arbitrary expression that has a 
nonnegative integer value should be inside the brackets. You can use this syntax to 
both read and write the value of an element of an array.*/

let t = ["world"]; // Start with a one-element array
let value = t[0]; // Read element 0
t[1] = 3.14; // Write element 1
let i = 2;
t[i] = 3; // Write element 2
t[i + 1] = "hello"; // Write element 3
t[t[i]] = t[0]; // Read elements 0 and 2, write element 3

/*
What is special about arrays is that when you use property names that are nonnegative
integers , the array automatically maintains the value of the length property for you.

In the preceding, for example, we created an array t with a single element. We then 
assigned values at indexes 1, 2, and 3. The length property of the array changed as we 
did, so: a.length // => 4

Remember that arrays are a specialized kind of object. The square brackets used to
access array elements work just like the square brackets used to access 
object properties.

JavaScript converts the numeric array index you specify to a string—the index 1
becomes the string "1"—then uses that string as a property name.

There is nothing special about the conversion of the index from a number to a string: 
you can do that with regular objects, too:*/

let o = {}; // Create a plain object
o[1] = "one"; // Index it with an integer
o["1"] // => "one"; numeric and string property names are the same

/*
It is helpful to clearly distinguish an array index from an object property name. All
indexes are property names, but only property names that are integers between 0 and
232–2 are indexes.

All arrays are objects, and you can create properties of any name on them. If you use 
properties that are array indexes, however, arrays have the special behavior of updating 
their length property as needed.

Note that you can index an array using numbers that are negative or that are not integers.
When you do this, the number is converted to a string, and that string is used as
the property name.Since the name is not a non-negative integer, it is treated as a regular
object property, not an array index. Also, if you index an array with a string that
happens to be a non-negative integer, it behaves as an array index, 
not an object property. The same is true if you use a floating-point number
that is the same as an integer:*/

a[-1.23] = true; // This creates a property named "-1.23"
a["1000"] = 0; // This the 1001st element of the array
a[1.000] = 1; // Array index 1. Same as a[1] = 1;

/*
The fact that array indexes are simply a special type of object property name means
that JavaScript arrays have no notion of an “out of bounds” error. When you try to
query a nonexistent property of any object, you don’t get an error; you simply get
undefined.*/

let a = [true, false]; // This array has elements at indexes 0 and 1
a[2] // => undefined; no element at this index.
a[-1] // => undefined; no property with this name.

//7.3 Sparse Arrays

/*
A sparse array is one in which the elements do not have contiguous indexes starting at
0. Normally, the length property of an array specifies the number of elements in the
array. If the array is sparse, the value of the length property is greater than the number
of elements.*/

let a = new Array(5); // No elements, but a.length is 5.
a = []; // Create an array with no elements and length = 0.
a[1000] = 0; // Assignment adds one element but sets length to 1001

//We’ll see later that you can also make an array sparse with the delete operator.

/*
Arrays that are sufficiently sparse are typically implemented in a slower, more
memory-efficient way than dense arrays are, and looking up elements in such an
array will take about as much time as regular object property lookup.

Note that when you omit a value in an array literal (using repeated commas as in
[1,,3]), the resulting array is sparse, and the omitted elements simply do not exist:
*/

let a11 = [,]; // This array has no elements and length 1
let a21 = [undefined]; // This array has one undefined element
0 in a11 // => false: a11 has no element with index 0
0 in a21 // => true: a21 has the undefined value at index 0

//7.4 Array Length

/*
Every array has a length property, and it is this property that makes arrays different
from regular JavaScript objects. For arrays that are dense (i.e., not sparse), the length
property specifies the number of elements in the array. 

Its value is one more than the highest index in the array:

*/
let y = [];
y.length // => 0: the array has no elements

["a","b","c"].length // => 3: highest index is 2, length is 3

/*
When an array is sparse, the length property is greater than the number of elements and all
we can say about it is that length is guaranteed to be larger than the index of
every element in the array

Or, put another way, an array (sparse or not) will never have an element whose index is 
greater than or equal to its length.

In order to maintain this invariant, arrays have two special behaviors. The first we
described above: if you assign a value to an array element whose index i is greater than 
or equal to the array’s current length, the value of the length property is set to i+1.

The second special behavior that arrays implement in order to maintain the length
invariant is that, if you set the length property to a non-negative integer n smaller
than its current value, any array elements whose index is greater than or equal to n
are deleted from the array:*/

a = [1,2,3,4,5]; // Start with a 5-element array.

a.length = 3; // a is now [1,2,3].
a.length = 0; // Delete all elements. a is [].
a.length = 5; // Length is 5, but no elements, like new Array(5)


//7.5 Adding and Deleting Array Elements

/*
We’ve already seen the simplest way to add elements to an array: just assign values to
new indexes:*/

let a = []; // Start with an empty array.
a[0] = "zero"; // And add elements to it.
a[1] = "one";

//You can also use the push() method to add one or more values to the end of an array.

let a = []; // Start with an empty array

a.push("zero"); // Add a value at the end. a = ["zero"]
a.push("one", "two"); // Add two more values. a = ["zero", "one", "two"]

//Pushing a value onto an array a is the same as assigning the value to a[a.length].

/*
You can use the unshift() method to insert a value at the beginning of an array, shifting 
the existing array elements to higher indexes.*/

/*The pop() method is the opposite of push(): it removes the last element of the array and
 returns it, reducing the length of an array by 1.

Similarly, the shift() method removes and returns the first element of the array, reducing 
the length by 1 and shifting all elements down to an index one lower than their current 
index.

You can delete array elements with the delete operator, just as you can delete object
properties:*/

let a = [1,2,3];

delete a[2]; // a now has no element at index 2
2 in a // => false: no array index 2 is defined

a.length // => 3: delete does not affect array length

/*
Deleting an array element is similar to (but subtly different than) assigning unde
fined to that element. Note that using delete on an array element does not alter the
length property. 

If you delete an element from an array, the array becomes sparse.

Finally, splice() is the general-purpose method for inserting, deleting, or replacing
array elements. It alters the length property and shifts array elements to higher or
lower indexes as needed.*/

//7.6 Iterating Arrays

/*
the easiest way to loop through each of the elements of an array is with the for/of loop-
*/

let letters1 = [..."Hello world"]; // An array of letters
let string = "";

for(let letter of letters1) {
        string += letter;
}
string // => "Hello world"; we reassembled the original text

/*
The built-in array iterator that the for/of loop uses returns the elements of an array
in ascending order. It has no special behavior for sparse arrays and simply returns
undefined for any array elements that do not exist.

If you want to use a for/of loop for an array and need to know the index of each
array element, use the entries() method of the array, along with destructuring
assignment*/

let everyother = "";

for(let [index, letter] of letters.entries()) {
    if (index % 2 === 0) everyother += letter; // letters at even indexes
}
    everyother // => "Hlowrd"

/*
Another good way to iterate arrays is with forEach().

Offers a functional approach to array iteration.

You pass a function to the forEach() method of an array, and forEach() invokes
your function once on each element of the array*/

let uppercase = "";

letters.forEach(letter => { // Note arrow function syntax here
    uppercase += letter.toUpperCase();
});

uppercase // => "HELLO WORLD"

/*
As you would expect, forEach() iterates the array in order, and it actually passes the
array index to your function as a second argument, which is occasionally useful.

Unlike the for/of loop, the forEach() is aware of sparse arrays and does not invoke
your function for elements that are not there.

You can also loop through the elements of an array with a good old-fashioned for
loop*/

let vowels = "";
for(let i = 0; i < letters.length; i++) { // For each index in the array
    let letter = letters[i]; // Get the element at that index
    if (/[aeiou]/.test(letter)) { // Use a regular expression test
        vowels += letter; // If it is a vowel, remember it
    }
}
vowels // => "eoo"

/*
In nested loops, or other contexts where performance is critical, you may sometimes
see this basic array iteration loop written so that the array length is only looked up
once rather than on each iteration. Both of the following for loop forms are idiomatic 
and with modern JavaScript interpreters, it is not at all clear that they have 
any performance impact.*/

// Save the array length into a local variable
for(let i = 0, len = letters.length; i < len; i++) {
    // loop body remains the same
}

// Iterate backwards from the end of the array to the start
for(let i = letters.length-1; i >= 0; i--) {
 // loop body remains the same
}

/*
These examples assume that the array is dense and that all elements contain valid
data. this is not the case, you should test the array elements before using them*/

for(let i = 0; i < a.length; i++) {
    if (a[i] === undefined) continue; // Skip undefined + nonexistent elements
    // loop body here
}


//7.7 Multidimensional Arrays


/*
JavaScript does not support true multidimensional arrays, but you can approximate
them with arrays of arrays.

To access a value in an array of arrays, simply use the [] operator twice.

*/

// Create a multidimensional array
let table1 = new Array(10); // 10 rows of the table
for(let i = 0; i < table1.length; i++) {
    table1[i] = new Array(10); // Each row has 10 columns
}

// Initialize the array
for(let row = 0; row < table1.length; row++) {
    for(let col = 0; col < table1[row].length; col++) {
        table1[row][col] = row*col;
    }
}

// Use the multidimensional array to compute 5*7
table1[5][7] // => 35


//7.8 Array Methods

//7.8.1 Array Iterator Methods

/*
The methods described iterate over arrays by passing array elements,
in order, to a function you supply, and they provide convenient ways to iterate, map,
filter, test, and reduce arrays.

Before we explain the methods in detail, however, it is worth making some generalizations
about them. First, all of these methods accept a function as their first argument
and invoke that function once for each element (or some elements) of the array.

If the array is sparse, the function you pass is not invoked for nonexistent elements.

In most cases, the function you supply is invoked with three arguments: the value of
the array element, the index of the array element, and the array itself. Often, you only
need the first of these argument values and can ignore the second and third values

Most of the iterator methods described in the following subsections accept an
optional second argument. If specified, the function is invoked as if it is a method of
this second argument. That is, the second argument you pass becomes the value of
the this keyword inside of the function you pass as the first argument.

The return value of the function you pass is usually important, but different methods
handle the return value in different ways. 

None of the methods described here modify the array on which they are invoked.

Each of these functions is invoked with a function as its first argument. Arrow function
syntax works particularly well with these methods, and we will use it in the examples 
that follow.

forEach()

The forEach() method iterates through an array, invoking a function you specify for
each element. 
forEach() then invokes your function with three arguments: the value of
the array element, the index of the array element, and the array itself. If you only care
about the value of the array element, you can write a function with only one parameter—
the additional arguments will be ignored*/

let data = [1,2,3,4,5], sum = 0;

// Compute the sum of the elements of the array
data.forEach(value => { sum += value; }); // sum == 15

// Now increment each array element
data.forEach(function(v, i, a) { a[i] = v + 1; }); // data == [2,3,4,5,6]

/*
Note that forEach() does not provide a way to terminate iteration before all elements
have been passed to the function. That is, there is no equivalent of the break statement
you can use with a regular for loop.

map()

The map() method passes each element of the array on which it is invoked to the
function you specify and returns an array containing the values returned by your
function*/

let a = [1, 2, 3];

a.map(x => x*x) // => [1, 4, 9]: the function takes input x and returns x*x

/*
The function you pass to map() is invoked in the same way as a function passed to
forEach(). For the map() method, however, the function you pass should return a
value. Note that map() returns a new array: it does not modify the array it is invoked
on. If that array is sparse, your function will not be called for the missing elements,
but the returned array will be sparse in the same way as the original array.

filter()

The filter() method returns an array containing a subset of the elements of the
array on which it is invoked. The function you pass to it should be predicate: a function
that returns true or false.

The predicate is invoked just as for forEach() and
map(). If the return value is true, or a value that converts to true, then the element
passed to the predicate is a member of the subset and is added to the array that will
become the return value

*/

let a = [5, 4, 3, 2, 1];

a.filter(x => x < 3) // => [2, 1]; values less than 3
a.filter((x,i) => i%2 === 0) // => [5, 3, 1]; every other value

/*
Note that filter() skips missing elements in sparse arrays and that its return value is
always dense. To close the gaps in a sparse array, you can do this:*/

let dense = sparse.filter(() => true);

/*
And to close gaps and remove undefined and null elements, you can use filter, like
this:*/

a.filter(x => x !== undefined && x !== null)

/*

find() and findIndex()

The find() and findIndex() methods are like filter() in that they iterate through
your array looking for elements for which your predicate function returns a truthy
value.

Unlike filter(), however, these two methods stop iterating the first time the
predicate finds an element. When that happens, find() returns the matching element,
and findIndex() returns the index of the matching element.

If no matching element is found, find() returns undefined and findIndex() returns -1.
*/

let a = [1,2,3,4,5];

a.findIndex(x => x === 3) // => 2; the value 3 appears at index 2
a.findIndex(x => x < 0) // => -1; no negative numbers in the array
a.find(x => x % 5 === 0) // => 5: this is a multiple of 5
a.find(x => x % 7 === 0) // => undefined: no multiples of 7 in the array

/*
every() and some()

The every() method is like the mathematical “for all” quantifier ∀: it returns true if
and only if your predicate function returns true for all elements in the array.

The some() method is like the mathematical “there exists” quantifier ∃: it returns
true if there exists at least one element in the array for which the predicate returns
true and returns false if and only if the predicate returns false for all elements of
the array

*/

let a = [1,2,3,4,5];
a.every(x => x < 10) // => true: all values are < 10.
a.every(x => x % 2 === 0) // => false: not all values are even.

let a = [1,2,3,4,5];
a.some(x => x%2===0) // => true; a has some even numbers.
a.some(isNaN) // => false; a has no non-numbers

/*

reduce() and reduceRight()

The reduce() and reduceRight() methods combine the elements of an array, using
the function you specify, to produce a single value.

let a = [1,2,3,4,5];
a.reduce((x,y) => x+y, 0) // => 15; the sum of the values
a.reduce((x,y) => x*y, 1) // => 120; the product of the values
a.reduce((x,y) => (x > y) ? x : y) // => 5; the largest of the values

reduce() takes two arguments. 

The first is the function that performs the reduction operation. The task of this 
reduction function is to somehow combine or reduce two values into a single value 
and to return that reduced value.

The second (optional) argument is an initial value to pass to the function.

Functions used with reduce() are different than the functions used with forEach()
and map(). The familiar value, index, and array values are passed as the second, third,
and fourth arguments. The first argument is the accumulated result of the reduction
so far.

On the first call to the function, this first argument is the initial value you
passed as the second argument to reduce().On subsequent calls, it is the value
returned by the previous invocation of the function.

When you invoke reduce() like this with no initial value, it uses the first element 
of the array as the initial value. This means that the first call to the reduction function will have the first and second array elements
as its first and second arguments.

Calling reduce() on an empty array with no initial value argument causes a TypeError.

If you call it with only one value—either an array with one element and
no initial value or an empty array and an initial value—it simply returns that one
value without ever calling the reduction function.

reduceRight() works just like reduce(), except that it processes the array from highest
index to lowest (right-to-left), rather than from lowest to highest.


7.8.2 Flattening arrays with flat() and flatMap()

In ES2019, the flat() method creates and returns a new array that contains the same
elements as the array it is called on, except that any elements that are themselves
arrays are “flattened” into the returned array*/

[1, [2, 3]].flat() // => [1, 2, 3]
[1, [2, [3]]].flat() // => [1, 2, [3]]

/*
When called with no arguments, flat() flattens one level of nesting. Elements of the
original array that are themselves arrays are flattened but array elements of those
arrays are not flattened. If you want to flatten more levels, pass a number to flat()*/

let a = [1, [2, [3, [4]]]];

a.flat(1) // => [1, 2, [3, [4]]]
a.flat(2) // => [1, 2, 3, [4]]
a.flat(3) // => [1, 2, 3, 4]
a.flat(4) // => [1, 2, 3, 4]

/*
The flatMap() method works just like the map() method except that the returned array is 
automatically flattened as if passed to flat().

That is, calling a.flatMap(f) is the same as a.map(f).flat().
*/

let phrases = ["hello world", "the definitive guide"];
let words = phrases.flatMap(phrase =>    phrase.split(" "));
words // => ["hello", "world", "the", "definitive", "guide"];

//7.8.3 Adding arrays with concat()

/*
The concat() method creates and returns a new array that contains the elements of
the original array on which concat() was invoked, followed by each of the arguments
to concat(). If any of these arguments is itself an array, then it is the array elements
that are concatenated, not the array itself.

Note, however, that concat() does not recursively flatten arrays of arrays.

concat() does not modify the array on which it is invoked.
*/

let a = [1,2,3];
a.concat(4, 5) // => [1,2,3,4,5]
a.concat([4,5],[6,7]) // => [1,2,3,4,5,6,7]; arrays are flattened
a.concat(4, [5,[6,7]]) // => [1,2,3,4,5,[6,7]]; but not nested arrays
a // => [1,2,3]; the original array is unmodified

//7.8.4 Stacks and Queues with push(), pop(), shift(), and unshift()

/*
The push() and pop() methods allow you to work with arrays as if they were stacks.

The push() method appends one or more new elements to the end of an array and
returns the new length of the array.

Unlike concat(), push() does not flatten array arguments.

The pop() method does the reverse: it deletes the last element of an array, decrements 
the array length, and returns the value that it removed.

Note that both methods modify the array in place.

The combination of push() and pop() allows you to use a JavaScript array to implement 
a first-in, last-out stack.
*/

let stack = []; // stack == []

stack.push(1,2); // stack == [1,2];
stack.pop(); // stack == [1]; returns 2
stack.push(3); // stack == [1,3]
stack.pop(); // stack == [1]; returns 3
stack.push([4,5]); // stack == [1,[4,5]]
stack.pop() // stack == [1]; returns [4,5]
stack.pop(); // stack == []; returns 1

//if you want to push all of the elements from one array onto another array

a.push(...values);

/*
The unshift() and shift() methods behave much like push() and pop(), except
that they insert and remove elements from the beginning of an array rather than from
the end.

unshift() adds an element or elements to the beginning of the array. shifts
the existing array elements up to higher indexes to make room, and returns the new
length of the array. 

shift() removes and returns the first element of the array, shifting
all subsequent elements down one place to occupy the newly vacant space at the
start of the array
*/

let q = []; // q == []
q.push(1,2); // q == [1,2]
q.shift(); // q == [2]; returns 1
q.push(3) // q == [2, 3]
q.shift() // q == [3]; returns 2
q.shift() // q == []; returns 3

//7.8.5 Subarrays with slice(), splice(), fill(), and copyWithin()

/*
slice()

The slice() method returns a slice, or subarray, of the specified array.

Its two arguments specify the start and end of the slice to be returned.

The returned array contains the element specified by the first argument and 
all subsequent elements up to, but not including, the element specified by 
the second argument. If only one argument
is specified, the returned array contains all elements from the start position to
the end of the array.

If either argument is negative, it specifies an array element relative
to the length of the array. An argument of –1, specifies the last element
in the array, and an argument of –2 specifies the element before that one.
*/

let a = [1,2,3,4,5];

a.slice(0,3); // Returns [1,2,3]
a.slice(3); // Returns [4,5]
a.slice(1,-1); // Returns [2,3,4]
a.slice(-3,-2); // Returns [3]

/*
splice()

splice() is a general-purpose method for inserting or removing elements from an
array.

Unlike slice() and concat(), splice() modifies the array on which it is
invoked

splice() can delete elements from an array, insert new elements into an array, or
perform both operations at the same time.

Elements of the array that come after the insertion or deletion point have their indexes 
increased or decreased as necessary so that they remain contiguous with the rest of the 
array.

The first argument to splice() specifies the array position at which the insertion 
and/or deletion is to begin. The second argument specifies the number of elements
 that should be deleted from. 

If this second argument is omitted, all array elements from the start element to the 
end of the array are removed.

splice() returns an array of the deleted elements, or an empty array if no elements
 were deleted.
*/

let a = [1,2,3,4,5,6,7,8];

a.splice(4) // => [5,6,7,8]; a is now [1,2,3,4]
a.splice(1,2) // => [2,3]; a is now [1,4]
a.splice(1,1) // => [4]; a is now [1]

/*

The first two arguments to splice() specify which array elements are to be deleted.

These arguments may be followed by any number of additional arguments that specify
elements to be inserted into the array, starting at the position specified by the first
argument.*/

let a = [1,2,3,4,5];
a.splice(2,0,"a","b") // => []; a is now [1,2,"a","b",3,4,5]
a.splice(2,2,[1,2],3) // => ["a","b"]; a is now [1,2,[1,2],3,3,4,5]

/*
fill()

The fill() method sets the elements of an array, or a slice of an array, to a specified
value. It mutates the array it is called on, and also returns the modified array.
*/

let a = new Array(5); // Start with no elements and length 5

a.fill(0) // => [0,0,0,0,0]; fill the array with zeros
a.fill(9, 1) // => [0,9,9,9,9]; fill with 9 starting at index 1
a.fill(8, 2, -1) // => [0,9,8,8,9]; fill with 8 at indexes 2, 3

/*
The first argument to fill() is the value to set array elements to. The optional second
argument specifies the starting index. If omitted, filling starts at index 0. The
optional third argument specifies the ending index—

copyWithin()

copyWithin() copies a slice of an array to a new position within the array.It modifies
the array in place and returns the modified array, but it will not change the length of
the array.

The first argument specifies the destination index to which the first element
will be copied. The second argument specifies the index of the first element to be
copied. If this second argument is omitted, 0 is used. The third argument specifies the
end of the slice of elements to be copied.
*/

let a = [1,2,3,4,5];
a.copyWithin(1) // => [1,1,2,3,4]: copy array elements up one
a.copyWithin(2, 3, 5) // => [1,1,3,4,4]: copy last 2 elements to index 2
a.copyWithin(0, -2) // => [4,4,3,4,4]: negative offsets work, too


//7.8.6 Array Searching and Sorting Methods

/*

indexOf() and lastIndexOf()

indexOf() and lastIndexOf() search an array for an element with a specified value
and return the index of the first such element found, or -1 if none is found.

indexOf() searches the array from beginning to end, and lastIndexOf() searches
from end to beginning.
*/

let a = [0,1,2,1,0];

a.indexOf(1) // => 1: a[1] is 1
a.lastIndexOf(1) // => 3: a[3] is 1
a.indexOf(3) // => -1: no element has value 3

/*
indexOf() and lastIndexOf() take an optional second argument that specifies the
array index at which to begin the search. If this argument is omitted, indexOf() starts
at the beginning and lastIndexOf() starts at the end. Negative values are allowed for
the second argument and are treated as an offset from the end of the array.

The following function searches an array for a specified value and returns an array of
all matching indexes. This demonstrates how the second argument to indexOf() can
be used to find matches beyond the first.

*/

// Find all occurrences of a value x in an array a and return an array
// of matching indexes
function findall(a, x) {
    let results = [], // The array of indexes we'll return
    len = a.length, // The length of the array to be searched
    pos = 0; // The position to search from

    while(pos < len) { // While more elements to search...
        pos = a.indexOf(x, pos); // Search
        if (pos === -1) break; // If nothing found, we're done.
        results.push(pos); // Otherwise, store index in array
        pos = pos + 1; // And start next search at next element
    }
    
    return results; // Return array of indexes
}

/*
includes()

The ES2016 includes() method takes a single argument and returns true if the array
contains that value or false otherwise.

It does not tell you the index of the value, only whether it exists.

The includes() method is slightly different than the indexOf() method in one
important way. indexOf() tests equality using the same algorithm that the === operator
does, and that equality algorithm considers the not-a-number value to be different
from every other value, including itself. includes() uses a slightly different version
of equality that does consider NaN to be equal to itself.

*/

let a = [1,true,3,NaN];
a.includes(true) // => true
a.includes(2) // => false
a.includes(NaN) // => true

a.indexOf(NaN) // => -1; indexOf can't find NaN

/*

sort()

sort() sorts the elements of an array in place and returns the sorted array. When
sort() is called with no arguments, it sorts the array elements in alphabetical order.
*/

let a = ["banana", "cherry", "apple"];
a.sort(); // a == ["apple", "banana", "cherry"]

/*

To sort an array into some order other than alphabetical, you must pass a comparison
function as an argument to sort(). This function decides which of its two arguments
should appear first in the sorted array. If the first argument should appear before the
second, the comparison function should return a number less than zero. If the first
argument should appear after the second in the sorted array, the function should
return a number greater than zero. And if the two values are equivalent (i.e., if their
order is irrelevant), the comparison function should return 0.*/

let a = [33, 4, 1111, 222];

a.sort(); // a == [1111, 222, 33, 4]; alphabetical order

a.sort(function(a,b) { // Pass a comparator function
    return a-b; // Returns < 0, 0, or > 0, depending on order
}); // a == [4, 33, 222, 1111]; numerical order

a.sort((a,b) => b-a); // a == [1111, 222, 33, 4]; reverse numerical order

let a = ["ant", "Bug", "cat", "Dog"];
a.sort(); // a == ["Bug","Dog","ant","cat"]; case-sensitive sort
a.sort(function(s,t) {
    let a = s.toLowerCase();
    let b = t.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}); // a == ["ant","Bug","cat","Dog"]; case-insensitive sort

/*

reverse()

The reverse() method reverses the order of the elements of an array and returns the
reversed array.
*/

let a = [1,2,3];
a.reverse(); // a == [3,2,1]

/*

7.8.7 Array to String Conversions

The Array class defines three methods that can convert arrays to strings, which is
generally something you might do when creating log and error messages.

<<important>>
    If you want to save the contents of an array in textual form for later reuse, serialize 
    the array with JSON.stringify() instead of using the methods described here.
<<important>>

The join() method converts all the elements of an array to strings and concatenates
them, returning the resulting string. You can specify an optional string that separates
the elements in the resulting string.

If no separator string is specified, a comma is used.-

*/

let a = [1, 2, 3];

a.join() // => "1,2,3"
a.join(" ") // => "1 2 3"
a.join("") // => "123"

let b1 = new Array(10); // An array of length 10 with no elements
b1.join("-") // => "---------": a string of 9 hyphens

/*
The join() method is the inverse of the String.split() method, which creates an
array by breaking a string into pieces.

Arrays, like all JavaScript objects, have a toString() method. For an array, this
method works just like the join() method with no arguments.

toLocaleString() is the localized version of toString(). It converts each array element
to a string by calling the toLocaleString() method of the element, and then it
concatenates the resulting strings using a locale-specific*/

[1,2,3].toString() // => "1,2,3"
["a", "b", "c"].toString() // => "a,b,c"
[1, [2,"c"]].toString() // => "1,2,c"

/*

7.8.8 Static Array Functions

The Array class also defines three static functions that you can invoke through the Array 
constructor rather than on arrays. Array.of() and Array.from() are factory methods for 
creating new arrays.

The one other static array function is Array.isArray(), which is useful for determining
whether an unknown value is an array or not.*/

Array.isArray([]) // => true
Array.isArray({}) // => false


// 7.9 Array-Like Objects

/*
JavaScript arrays have some special features that other objects do not have:

- The length property is automatically updated as new elements are added to the
list.
- Setting length to a smaller value truncates the array.
- Arrays inherit useful methods from Array.prototype
- Array.isArray() returns true for arrays.

These are the features that make JavaScript arrays distinct from regular objects. But
they are not the essential features that define an array. 

It is often perfectly reasonable to treat any object with a numeric length property
and corresponding non-negative integer properties as a kind of array.

These “array-like” objects actually do occasionally appear in practice, and although
you cannot directly invoke array methods on them or expect special behavior from
the length property, you can still iterate through them with the same code you’d use
for a true array.

It turns out that many array algorithms work just as well with array-like
objects as they do with real arrays.

This is especially true if your algorithms treat the array as read-only or 
if they at least leave the array length unchanged.

*/

let a = {}; // Start with a regular empty object
// Add properties to make it "array-like"
let i1 = 0;
while(i1 < 10) {
    a[i1] = i1 * i1;
    i1++;
}
a.length = i1;

// Now iterate through it as if it were a real array
let total = 0;
for(let j = 0; j < a.length; j++) {
    total += a[j];
}

/*
In client-side JavaScript, a number of methods for working with HTML documents
(such as document.querySelectorAll(), for example) return array-like objects.

Here’s a function you might use to test for objects that work like arrays:

*/

function isArrayLike(o) {
    if (o && // o is not null, undefined, etc.
    typeof o === "object" && // o is an object
    Number.isFinite(o.length) && // o.length is a finite number
    o.length >= 0 && // o.length is non-negative
    Number.isInteger(o.length) && // o.length is an integer
    o.length < 4294967295) { // o.length < 2^32 - 1
        return true; // Then o is array-like.
    } else {
        return false; // Otherwise it is not.
    }
}

/*
Most JavaScript array methods are purposely defined to be generic so that they work
correctly when applied to array-like objects in addition to true arrays. 

Since array-like objects do not inherit from Array.prototype, you cannot invoke array
 methods on them directly.

You can invoke them indirectly using the Function.call method.
*/

let a = {"0": "a", "1": "b", "2": "c", length: 3}; // An array-like object

Array.prototype.join.call(a, "+") // => "a+b+c"
Array.prototype.map.call(a, x => x.toUpperCase()) // => ["A","B","C"]
Array.prototype.slice.call(a, 0) // => ["a","b","c"]: true array copy
Array.from(a)


//7.10 Strings as Arrays

/*
JavaScript strings behave like read-only arrays of UTF-16 Unicode characters. Instead
of accessing individual characters with the charAt() method, you can use square
brackets*/

let s1 = "test";
s1.charAt(0) // => "t"
s1[1] // => "e"

/*
The typeof operator still returns “string” for strings, of course, and 
the Array.isArray() method returns false if you pass it a string.

The fact that strings behave like arrays also means, however, that we
can apply generic array methods to them.
*/

Array.prototype.join.call("JavaScript", " ") // => "J a v a S c r i p t"

/*
Keep in mind that strings are immutable values, so when they are treated as arrays,
they are read-only arrays. Array methods like push(), sort(), reverse(), and
splice() modify an array in place and do not work on strings
*/


