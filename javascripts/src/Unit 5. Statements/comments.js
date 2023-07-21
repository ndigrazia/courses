//Statements

/*
statements are JavaScript sentences or commands. JavaScript statements are terminated with semicolons;

Expressions are evaluated to produce a value, but statements are executed to make something happen.

One way to “make something happen” is to evaluate an expression that has side effects. Expressions with side effects, 
such as assignments and function invocations, can stand alone as statements, and when used this way are known as 
expression statements.

JavaScript programs are nothing more than a sequence of statements to execute. By
default, the JavaScript interpreter executes these statements one after another in the
order they are written.

Another way to alter this default order of execution is with control structures: Conditionals (if and switch), 
Loops (while and for) and Jumps (break, return, and throw)


5.1 Expression Statements

The simplest kinds of statements in JavaScript are expressions that have side effects.

Assignment statements are one major category of expression statements.
*/

greeting = "Hello " + name;
i *= 3;

/*
The increment and decrement operators, ++ and --, are related to assignment statements.
These have the side effect of changing a variable value, just as if an assignment
had been performed:
*/

counter++;

/*
The delete operator has the important side effect of deleting an object property.
Thus, it is almost always used as a statement, rather than as part of a larger
expression:
*/

delete o.x;

/*
Function calls are another major category of expression statements. For example:
*/

console.log(debugMessage);
displaySpinner(); // A hypothetical function to display a spinner in a web app.

/*
These function calls are expressions, but they have side effects that affect the host
environment or program state, and they are used here as statements. If a function
does not have any side effects, there is no sense in calling it, unless it is part of a larger
expression or an assignment statement. For example, you wouldn’t just compute a cosine 
and discard the result:

Math.cos(x);

But you might well compute the value and assign it to a variable for future use:

cx = Math.cos(x);

Note that each line of code in each of these examples is terminated with a semicolon.


5.2 Compound and Empty Statements

A statement block combines multiple statements into a single compound statement. A statement block 
is simply a sequence of statements enclosed within curly braces. Thus, the following lines act as 
a single statement and can be used anywhere that JavaScript expects a single statement
*/

{
x = Math.PI;
cx = Math.cos(x);
console.log("cos(π) = " + cx);
}

/*

Just as expressions often contain subexpressions, many JavaScript statements contain
substatements. Formally, JavaScript syntax usually allows a single substatement. For
example, the while loop syntax includes a single statement that serves as the body of
the loop. Using a statement block, you can place any number of statements within this
single allowed substatement.

The empty statement is the opposite: it allows you to include no statements where one
 is expected. The empty statement looks like this:

 ;

 The JavaScript interpreter takes no action when it executes an empty statement. The
empty statement is occasionally useful when you want to create a loop that has an
empty body.
*/

// Initialize an array a
for(let i = 0; i < a.length; a[i++] = 0) ;

/*
In this loop, all the work is done by the expression a[i++] = 0, and no loop body is
necessary. JavaScript syntax requires a statement as a loop body, however, so an empty
statement—just a bare semicolon—is used.

Note that the accidental inclusion of a semicolon after the right parenthesis of a for
loop, while loop, or if statement can cause frustrating bugs that are difficult to
detect. 

When you intentionally use the empty statement, it is a good idea to comment your
code in a way that makes it clear that you are doing it on purpose:
*/

for(let i = 0; i < a.length; a[i++] = 0) /* empty */ ;

//5.3 Conditionals

/*
Conditional statements execute or skip other statements depending on the value of a
specified expression.

5.3.1 if
The if statement is the fundamental control statement that allows JavaScript to make
decisions, or, more precisely, to execute statements conditionally. This statement has
two forms:
*/
if (expression)
    statement

/*
In this form, expression is evaluated. If the resulting value is truthy, statement is executed.
If expression is falsy, statement is not executed*/

if (username == null) // If username is null or undefined,
    username = "John Doe"; // define it

//Or similarly:

// If username is null, undefined, false, 0, "", or NaN, give it a new value
if (!username) username = "John Doe";

/*
JavaScript syntax requires a single statement after the if keyword and parenthesized
expression, but you can use a statement block to combine multiple statements into
one:
*/

if (!address) {
    address = "";
    message = "Please specify a mailing address.";
}   

/*
The second form of the if statement introduces an else clause that is executed when
expression is false. Its syntax is:

if (expression)
    statement1
else
    statement2

This form of the statement executes statement1 if expression is truthy and executes
statement2 if expression is falsy. For example:
*/

if (n === 1)
    console.log("You have 1 new message.");
else
    console.log(`You have ${n} new messages.`);

/*
When you have nested if statements with else clauses, some caution is required to
ensure that the else clause goes with the appropriate if statement. The rule in JavaScript
(as in most programming languages) is that by default an else clause is part of the
nearest if statement. To make easier to read, understand, maintain, and debug, 
you should use curly braces.
*/

// 5.3.2 else if

/*
The if/else statement evaluates an expression and executes one of two pieces of
code, depending on the outcome.

But what about when you need to execute one of many pieces of code?

One way to do this is with an else if statement. else if is not really a JavaScript statement, 
but simply a frequently used programming idiom that results when repeated if/else statements are used
*/

if (n === 1) {
    // Execute code block #1
} else if (n === 2) {
    // Execute code block #2
} else if (n === 3) {
    // Execute code block #3
} else {
    // If all else fails, execute block #4
}

/* Using the else if idiom is preferable to, and more legible than, writing these statements out in their
syntactically equivalent, fully nested form:
*/

if (n === 1) {
    // Execute code block #1
}
else {
    if (n === 2) {
        // Execute code block #2
    }   
    else {
        if (n === 3) {
            // Execute code block #3
        }
        else {
            // If all else fails, execute block #4
        }
    }
}

//5.3.3 switch

/*
An if statement causes a branch in the flow of a program’s execution, and you can
use the else if idiom to perform a multiway branch. This is not the best solution,
however, when all of the branches depend on the value of the same expression. 
The switch statement handles exactly this situation.
The switch keyword is followed by an expression in parentheses and a block of code in curly braces:

switch(expression) {
    statements
}

Various locations in the block of code are labeled with the case keyword followed by an
expression and a colon. 

When a switch executes, it computes the value of expression and then looks for a case label 
whose expression evaluates to the same value. If it finds one, it starts executing the
block of code at the statement labeled by the case. If it does not find a case with a
matching value, it looks for a statement labeled default:. If there is no default:
label, the switch statement skips the block of code altogether.
*/

switch(n) {
    case 1: // Start here if n === 1
        // Execute code block #1.
        break; // Stop here
    case 2: // Start here if n === 2
        // Execute code block #2.
        break; // Stop here
    case 3: // Start here if n === 3
        // Execute code block #3.
        break; // Stop here
    default: // If all else fails...
        // Execute code block #4.
        break; // Stop here
}

/*
Note the break keyword used at the end of each case in this code. The break statement
causes the interpreter to jump to the end (or “break out”) of the switch statement
and continue with the statement that follows it.

In the absence of break statements, a switch statement begins executing its block of code 
at the case label that matches the value of its expression and continues executing statements 
until it reaches the end of the block
99% of the time you should be careful to end every case with a break statement.

Here is a more realistic example of the switch statement:
*/

function convert(x) {
    switch(typeof x) {
        case "number": // Convert the number to a hexadecimal integer
            return x.toString(16);
        case "string": // Return the string enclosed in quotes
            return '"' + x + '"';
        default: // Convert any other type in the usual way
            return String(x);
    }
}

/*
The matching case is determined using the === identity operator, not the == equality operator, 
so the expressions must match without any type conversion.

The switch statement first evaluates the expression that follows the switch keyword
and then evaluates the case expressions, in the order in which they appear, until it
finds a value that matches.

The default: label appears at the end of the switch body following all the case labels. This is 
a logical and common place for it, but it can actually appear anywhere within the body of the statement.
*/

//5.4 Loops 

/*
To understand conditional statements, we imagined the JavaScript interpreter following
a branching path through your source code.The looping statements are those that
bend that path back upon itself to repeat portions of your code.

JavaScript has five
looping statements: while, do/while, for, for/of (and its for/await variant), and
for/in.

5.4.1 while

The while statement is JavaScript’s basic loop.

while (expression)
    statement

To execute a while statement, the interpreter first evaluates expression. If the value of
the expression is falsy, then the interpreter skips over the statement that serves as the
loop body and moves on to the next statement in the program. If, on the other hand,
the expression is truthy, the interpreter executes the statement and repeats, jumping
back to the top of the loop and evaluating expression again.

Another way to say this is that the interpreter executes statement repeatedly while the 
expression is truthy.

Note that you can create an infinite loop with the syntax while(true).

Usually, you do not want JavaScript to perform exactly the same operation over and
over again. In almost every loop, one or more variables change with each iteration of
the loop. Since the variables change, the actions performed by executing statement
may differ each time through the loop. Furthermore, if the changing variable or variables
are involved in expression, the value of the expression may be different each
time through the loop.
*/

let count = 0;

while(count < 10) {
    console.log(count);
    count++;
}

/*
5.4.2 do/while

The do/while loop is like a while loop, except that the loop expression is tested at the
bottom of the loop rather than at the top. 

This means that the body of the loop is always executed at least once. The syntax is:

do
    statement
while (expression);

The do/while loop is less commonly used than its while cousin.

the do loop must always be terminated with a semicolon;

5.4.3 for

The for statement provides a looping construct that is often more convenient than
the while statement.

Most loops have a counter variable of some kind. This variable is initialized
before the loop starts and is tested before each iteration of the loop. Finally, the
counter variable is incremented or otherwise updated at the end of the loop body, just
before the variable is tested again.

In this kind of loop, the initialization, the test, and
the update are the three crucial manipulations of a loop variable.

for(initialize ; test ; increment)
    statement

initialize, test, and increment are three expressions (separated by semicolons) that are
responsible for initializing, testing, and incrementing the loop variable

Finally, the increment expression must be an expression with side effects in
order to be useful. Generally, it is either an assignment expression, or it uses the ++
or -- operators.

*/

for(let count = 0; count < 10; count++) {
    console.log(count);
}

/*
Loops can become a lot more complex than this simple example, of course, and
sometimes multiple variables change with each iteration of the loop
This situation is
the only place that the comma operator is commonly used in JavaScript; it provides a
way to combine multiple initialization and increment expressions into a single
expression suitable for use in a for loop:
*/

let i, j, sum = 0;
for(i = 0, j = 10 ; i < 10 ; i++, j--) {
    sum += i * j;
}

/*
In all our loop examples so far, the loop variable has been numeric. This is quite common
but is not necessary.  The following code uses a for loop to traverse a linked list
data structure and return the last object in the list
*/

function tail(o) { // Return the tail of linked list o
    for(; o.next; o = o.next) /* empty */ ; // Traverse while o.next is truthy
    return o;
}

/*
Note that this code has no initialize expression. Any of the three expressions may be
omitted from a for loop, but the two semicolons are required. If you omit the test
expression, the loop repeats forever, and for(;;) is another way of writing an infinite
loop, like while(true).
*/

//5.4.4 for/of

/*
This new kind of loop uses the for keyword but is a completely different
kind of loop than the regular for loop.

The for/of loop works with iterable objects. it is enough to know that
arrays, strings, sets, and maps are iterable: they represent a sequence or set of elements
that you can loop or iterate through using a for/of loop.

Here, for example, is how we can use for/of to loop through the elements of an array
of numbers and compute their sum:
*/

let data = [1, 2, 3, 4, 5, 6, 7, 8, 9], sum1 = 0;

for(let element of data) {
    sum += element;
}
sum // => 45

/*
In this case, the parentheses contain a variable declaration (or, for variables that have already been
declared, simply the name of the variable) followed by the of keyword and an expression
that evaluates to an iterable object, like the data array in this case. As with all
loops, the body of a for/of loop follows the paren  theses, typically within curly
braces.

In the code just shown, the loop body runs once for each element of the data array

Array elements are iterated in order from first to last

Arrays are iterated “live”—changes made during the iteration may affect the outcome
of the iteration. If we modify the preceding code by adding the line data.push(sum);
inside the loop body, then we create an infinite loop



for/of with objects

Objects are not (by default) iterable. Attempting to use for/of on a regular object
throws a TypeError at runtime:
*/

let o = { x: 1, y: 2, z: 3 };
for(let element of o) { // Throws TypeError because o is not iterable
    console.log(element);
}

/*
If you want to iterate through the properties of an object, you can use the for/in loop
or use for/of with the Object.keys() method:*/

let o1 = { x: 1, y: 2, z: 3 };

let keys = "";
for(let k of Object.keys(o1)) 
    keys += k;

    keys // => "xyz

//If you don’t care about the keys of an object, you can also iterate through their corresponding values like this:

let sum2 = 0;

for(let v of Object.values(o)) 
    sum2 += v;

sum2 // => 6

//And if you are interested in both the keys and the values of an object’s properties, you can use for/of with Object.entries():

let pairs = "";
for(let [k, v] of Object.entries(o)) 
    pairs += k + v;

pairs // => "x1y2z3"

//Object.entries() returns an array of arrays, where each inner array represents a key/value pair for one property of the object


// for/of with strings
//Strings are iterable character-by-character in ES6:

let frequency = {};
for(let letter of "mississippi") {
    if (frequency[letter]) {
        frequency[letter]++;
    } else {
        frequency[letter] = 1;
    }
}
frequency // => {m: 1, i: 4, s: 4, p: 2}

//for/of with Set and Map

/*
Set and Map classes are iterable. When you iterate a Set with for/of,
the loop body runs once for each element of the set.*/

let text = "Na na na na na na na na Batman!";
let wordSet = new Set(text.split(" "));

let unique = [];
for(let word of wordSet) 
    unique.push(word);

unique // => ["Na", "na", "Batman!"]


/*
Maps are an interesting case because the iterator for a Map object does not iterate the
Map keys, or the Map values, but key/value pairs.
Each time through the iteration, the iterator returns an array whose first element is a key
and whose second element is the corresponding value
*/
let m = new Map([[1, "one"]]);
for(let [key, value] of m) {
    key // => 1
    value // => "one"
}

//5.4.5 for/in

/*
A for/in loop looks a lot like a for/of loop, with the of keyword changed to in.

While a for/of loop requires an iterable object after the of, a for/in loop works with
any object after the in.

The for/in statement loops through the property names of a specified object. The
syntax looks like this:

for (variable in object)
    statement

variable typically names a variable, but it may be a variable declaration or anything
suitable as the left-hand side of an assignment expression. object is an expression that
evaluates to an object. As usual, statement is the statement or statement block that
serves as the body of the loop.

And you might use a for/in loop like this:

for(let p in o) { // Assign property names of o to variable p
    console.log(o[p]); // Print the value of each property
}

To execute a for/in statement, the JavaScript interpreter first evaluates the object
expression. If it evaluates to null or undefined, the interpreter skips the loop and
moves on to the next statement. The interpreter now executes the body of the loop
once for each enumerable property of the object. Before each iteration, however, the
interpreter evaluates the variable expression and assigns the name of the property

Note that the variable in the for/in loop may be an arbitrary expression, as long as it
evaluates to something suitable for the left side of an assignment. This expression is
evaluated each time through the loop, which means that it may evaluate differently
each time. For example, you can use you can use code like the following to copy the 
names of all object properties into an array:
*/

let o2 = { x: 1, y: 2, z: 3 };

let a = [], i1 = 0;
for(a[i1++] in o) /* empty */;

/*
JavaScript arrays are simply a specialized kind of object, and array indexes are object
properties that can be enumerated with a for/in loop. For example, following the
previous code with this line enumerates the array indexes 0, 1, and 2:
*/

for(let i in a) console.log(i);

/*
I find that a common source of bugs in my own code is the accidental use of for/in
with arrays when I meant to use for/of. When working with arrays, you almost
always want to use for/of instead of for/in.

The for/in loop does not actually enumerate all properties of an object. It does not
enumerate properties whose names are symbols. It only loops over the enumerable properties.
All objects have a toString() method, for example, but the for/in loop does not enumerate 
this toString property. In addition to built-in methods, many other properties of the
built-in objects are non-enumerable.

All properties and methods defined by your code are enumerable, by default.
*/

// 5.5 Jumps

/*
Another category of JavaScript statements are jump statements. As the name implies,
these cause the JavaScript interpreter to jump to a new location in the source code

5.5.1 Labeled Statements

Any statement may be labeled by preceding it with an identifier and a colon:

identifier: statement

By labeling a statement, you give it a name that you can use to refer to it elsewhere in
your program. You can label any statement, although it is only useful to label statements
that have bodies, such as loops and conditionals. By giving a loop a name, you
can use break and continue statements inside the body of the loop to exit the loop or
to jump directly to the top of the loop to begin the next iteration.

break and continue are the only JavaScript statements that use statement labels.

mainloop: while(token !== null) {
    // Code omitted...
    continue mainloop; // Jump to the next iteration of the named loop
    // More code omitted...
}

The identifier you use to label a statement can be any legal JavaScript identifier that is
not a reserved word. 

The namespace for labels is different than the namespace for
variables and functions, so you can use the same identifier as a statement label and as
a variable or function name.


5.5.2 break

The break statement, used alone, causes the innermost enclosing loop or switch
statement to exit immediately. Its syntax is simple:

break;

Because it causes a loop or switch to exit, this form of the break statement is legal
only if it appears inside one of these statements.

In loops, it is typically used to exit prematurely when, for whatever reason, there is no
longer any need to complete the loop.

When a loop has complex termination conditions, it is often easier to implement some of 
these conditions with break statements rather than trying to express them all in a 
single loop expression.

The following code searches the elements of an array for a particular value. The loop 
terminates in the normal way when it reaches the end of the array; it terminates with 
a break statement if it finds what it is looking for in the array:*/

for(let i = 0; i < a.length; i++) {
    if (a[i] === target) break;
}

/*
JavaScript also allows the break keyword to be followed by a statement label:

break labelname;

When break is used with a label, it jumps to the end of, or terminates, the enclosing
statement that has the specified label. It is a syntax error to use break in this form
if there is no enclosing statement with the specified label. break can “break out of ” 
any enclosing statement. the named statement need not be a loop or switch, This statement
can even be a statement block grouped within curly braces for the sole purpose of 
naming the block with a label.

You need the labeled form of the break statement when you want to break out of a
statement that is not the nearest enclosing loop or a switch. The following code
demonstrates:*/

let matrix = getData(); // Get a 2D array of numbers from somewhere
// Now sum all the numbers in the matrix.

let sum3 = 0, success = false;
// Start with a labeled statement that we can break out of if errors occur

computeSum: if (matrix) {
    for(let x = 0; x < matrix.length; x++) {
        let row = matrix[x];
        if (!row) break computeSum;
        for(let y = 0; y < row.length; y++) {
            let cell = row[y];
            if (isNaN(cell)) break computeSum;
            sum += cell;
        }
    }
    success = true;
}
// The break statements jump here. If we arrive here with success == false
// then there was something wrong with the matrix we were given.
// Otherwise, sum contains the sum of all cells of the matrix.


//5.5.3 continue

/*
The continue statement is similar to the break statement. Instead of exiting a loop,
however, continue restarts a loop at the next iteration.

continue;

The continue statement can also be used with a label:

continue labelname;

When the continue statement is executed, the current iteration of the enclosing loop
is terminated, and the next iteration begins. This means different things for different
types of loops:

- In a while loop, the specified expression at the beginning of the loop is tested
again, and if it’s true, the loop body is executed starting from the top.

- In a do/while loop, execution skips to the bottom of the loop, where the loop
condition is tested again before restarting the loop at the top.

- In a for loop, the increment expression is evaluated, and the test expression is tested
again to determine if another iteration should be done.

- In a for/of or for/in loop, the loop starts over with the next iterated value or
next property name being assigned to the specified variable.

Note the difference in behavior of the continue statement in the while and for loops:
a while loop returns directly to its condition, but a for loop first evaluates its increment
expression and then returns to its condition
*/

for(let i = 0; i < data.length; i++) {
    if (!data[i]) continue; // Can't proceed with undefined data
        total += data[i];
}

/*
Like the break statement, the continue statement can be used in its labeled form
within nested loops when the loop to be restarted is not the immediately enclosing
loop*/

//5.5.4 return

/*
A return statement within a function specifies the value of invocations of that function.
Here’s the syntax of the return statement:

return expression;

Recall that function invocations are expressions and that all expressions have values.

A return statement may appear only within the body of a function. It is a syntax
error for it to appear anywhere else. When the return statement is executed, the
function that contains it returns the value of expression to its caller.
*/

function square(x) { return x*x; } // A function that has a return statement
square(2) // => 4

/*
With no return statement, a function invocation simply executes each of the statements
in the function body in turn until it reaches the end of the function and then
returns to its caller. In this case, the invocation expression evaluates to undefined

A function returns to its caller when a return statement is executed, even
if there are other statements remaining in the function body

The return statement can also be used without an expression to make the function
return undefined to its caller. For example:
*/

function displayObject(o) {
    // Return immediately if the argument is null or undefined.
    if (!o) return;

    // Rest of function goes here...
}


//5.5.5 yield

/*
The yield statement is much like the return statement but is used only in generator
functions to produce the next value in the generated sequence of values
without actually returning
*/

// A generator function that yields a range of integers
function* range(from, to) {
    for(let i = from; i <= to; i++) {
    yield i;
    }
}

//5.5.6 throw


/*
An exception is a signal that indicates that some sort of exceptional condition or error
has occurred.To throw an exception is to signal such an error or exceptional condition.
To catch an exception is to handle it—to take whatever actions are necessary or
appropriate to recover from the exception. In JavaScript, exceptions are thrown
whenever a runtime error occurs and whenever the program explicitly throws one
using the throw statement.

Exceptions are caught with the try/catch/finally statement.

The throw statement has the following syntax:
    throw expression;

expression may evaluate to a value of any type. You might throw a number that represents
an error code or a string that contains a human-readable error message.

The Error class and its subclasses are used when the JavaScript interpreter itself throws an
error, and you can use them as well. An Error object has a name property that specifies
the type of error and a message property that holds the string passed to the constructor
function.
*/

function factorial(x) {
    // If the input argument is invalid, throw an exception!
    if (x < 0) throw new Error("x must not be negative");

    // Otherwise, compute a value and return normally
    let f;
    for(f = 1; x > 1; f *= x, x--) /* empty */ ;
    return f;
}

factorial(4) // => 24


/*
When an exception is thrown, the JavaScript interpreter immediately stops normal
program execution and jumps to the nearest exception handler. 

Exception handlers are written using the catch clause of the try/catch/finally statement.

If the block of code in which the exception was thrown does not have an associated catch 
clause, the interpreter checks the next-highest enclosing block of code to see if it has
an exception handler associated with it. This continues until a handler is found.

If an exception is thrown in a function that does not contain a try/catch/finally statement 
to handle it, the exception propagates up to the code that invoked the function. 

If no exception handler is ever found, the exception is treated as an error and 
is reported to the user

*/


//5.5.7 try/catch/finally

/*
The try/catch/finally statement is JavaScript’s exception handling mechanism.

The try clause of this statement simply defines the block of code whose exceptions
are to be handled.
The try block is followed by a catch clause, which is a block of
statements that are invoked when an exception occurs anywhere within the try block
The catch clause is followed by a finally block containing cleanup code that is guaranteed
to be executed, regardless of what happens in the try block. Both the catch
and finally blocks are optional, but a try block must be accompanied by at least one
of these blocks.
*/

try {
// Normally, this code runs from the top of the block to the bottom
// without problems. But it can sometimes throw an exception,
// either directly, with a throw statement, or indirectly, by calling
// a method that throws an exception.
}
catch(e) {
// The statements in this block are executed if, and only if, the try
// block throws an exception. These statements can use the local variable
// e to refer to the Error object or other value that was thrown.
// This block may handle the exception somehow, may ignore the
// exception by doing nothing, or may rethrow the exception with throw.
}
finally {
// This block contains statements that are always executed, regardless of
// what happens in the try block. They are executed whether the try
// block terminates:
// 1) normally, after reaching the bottom of the block
// 2) because of a break, continue, or return statement
// 3) with an exception that is handled by a catch clause above
// 4) with an uncaught exception that is still propagating
}

/*
Note that the catch keyword is generally followed by an identifier in parentheses.
This identifier is like a function parameter. When an exception is caught, the value
associated with the exception (an Error object, for example) is assigned to this parameter.
*/

try {
    // Ask the user to enter a number
    let n = Number(prompt("Please enter a positive integer", ""));
    // Compute the factorial of the number, assuming the input is valid
    let f = factorial(n);
    // Display the result
    alert(n + "! = " + f);
}
catch(ex) { // If the user's input was not valid, we end up here
    alert(ex); // Tell the user what the error is
}


/*
Although finally is not used as often as catch, it can be useful. However, 
its behavior requires additional explanation.

The finally clause is guaranteed to be executed if any portion of the
try block is executed, regardless of how the code in the try block completes
It is generally used to clean up after the code in the try clause.

If a finally block itself causes a jump with a return, continue, break, or throw
statement, or by calling a method that throws an exception, the interpreter abandons
whatever jump was pending and performs the new jump. For example, if a finally
clause throws an exception, that exception replaces any exception that was in the process
of being thrown. If a finally clause issues a return statement, the method
returns normally, even if an exception has been thrown and has not yet been handled.

try and finally can be used together without a catch clause.

In this case, the finally block is simply cleanup code that is guaranteed to 
be executed, regardless of what happens in the try block.
*/


//5.6 Miscellaneous Statements

//5.6.1 with

/*
The with statement runs a block of code as if the properties of a specified object were
variables in scope for that code.

with (object)
    statement

This statement creates a temporary scope with the properties of object as variables
and then executes statement within that scope

Avoid using it whenever possible. JavaScript code that uses with is difficult to optimize 
and is likely to run significantly more slowly than the equivalent code written without 
the with statement.

The common use of the with statement is to make it easier to work with deeply nested
object hierarchies.

document.forms[0].address.value

If you need to write expressions like this a number of times, you can use the with
statement to treat the properties of the form object like variables:

with(document.forms[0]) {
    // Access form elements directly here. For example:
    name.value = "";
    address.value = "";
    email.value = "";
}

This reduces the amount of typing you have to do. You no longer need to prefix each
form property name with document.forms[0]. It is just as simple, of course, to avoid
the with statement and write the preceding code like this:

let f = document.forms[0];
f.name.value = "";
f.address.value = "";
f.email.value = "";
*/


//5.7 Declarations

/*
The keywords const, let, var, function, class, import, and export are not technically
statements. These keywords are more accurately described as declarations rather than statements.
Declarations serve to define new values and give them names that we can use to refer to
those values. They don’t make much happen themselves, but by providing names for
values they, in an important sense, define the meaning of the other statements in your
program.

5.7.1 const, let, and var

const declares constants, and let declares variables. In  the past, the var keyword was the
only way to declare variables and there was no way to declare constants. Variables
declared with var are scoped to the containing function rather than the containing
block.

In modern JavaScript there is really no reason to use var instead of let.

5.7.2 function

The function declaration is used to define functions. A function declaration looks like this:

function area(radius) {
    return Math.PI * radius * radius;
}

A function declaration creates a function object and assigns it to the specified name.
Elsewhere in our program, we can refer to the function by using this name. 

The function declarations in any block of JavaScript code are processed before that 
code runs, and the function names are bound to the function objects throughout the block.
The upshot is that code that invokes a function can exist in your program 
before the code that declares the function.


5.7.3 class

the class declaration creates a new class and gives it a name that we
can use to refer to it. A simple class declaration
might look like this:
*/

class Circle {
    constructor(radius) { this.r = radius; }
    area() { return Math.PI * this.r * this.r; }
    circumference() { return 2 * Math.PI * this.r; }
}

/*
You cannot use a class declared this way in code that appears before the declaration.


5.7.4 import and export

The import and export declarations are used together to make values defined in one
module of JavaScript code available in another module. 
A module is a file of Java‐Script code with its own global namespace, completely 
independent of all other modules.
The only way that a value (such as function or class) defined in one module can
be used in another module is if the defining module exports it with export
 and the using module imports it with import.

import directives are used to import one or more values from another file of Java‐
Script code and give them names within the current module.

import directives come in a few different forms.

*/

import Circle from './geometry/circle.js';
import { PI, TAU } from './geometry/constants.js';
import { magnitude as hypotenuse } from './vectors/utils.js';

/*
Values within a JavaScript module are private and cannot be imported into other
modules unless they have been explicitly exported.
The export directive does this: it declares that one or more values defined in
the current module are exported and therefore available for import by other modules.

The export directive has more variants than the import directive does.
*/

// geometry/constants.js
const PI = Math.PI;
const TAU = 2 * PI;
export { PI, TAU };

/*
The export keyword is sometimes used as a modifier on other declarations, resulting
in a kind of compound declaration that defines a constant, variable, function, or class
and exports it at the same time. And when a module exports only a single value, this
is typically done with the special form export default

*/
export const TAU1 = 2 * Math.PI;
export function magnitude(x,y) { return Math.sqrt(x*x + y*y); }
export default class Circle1 { /* class definition omitted here */ }