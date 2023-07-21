//Expressions and Operators

/*An expression is a phrase of JavaScript that can be evaluated to produce a value.

A constant embedded literally in your program is a very simple kind of expression.
variable name is also a simple expression that evaluates to whatever value has been assigned 
to that variable. Complex expressions are built from simpler expressions. An array access 
expression, for example, consists of one expression that evaluates to an array followed by 
an open square bracket, an expression that evaluates to an integer, and a close square bracket
This new, more complex expression evaluates to the value stored at the specified index of the 
specified array. Similarly, a function invocation expression consists of one expression that 
evaluates to a function object and zero or more additional expressions that are used as the arguments
to the function.

The most common way to build a complex expression out of simpler expressions is
with an operator.
*/

//4.1 Primary Expressions

/*
The simplest expressions, known as primary expressions, are those that stand alone.
Primary expressions in JavaScript are constant or literal values, certain language keywords,
and variable references.

Literals are constant values that are embedded directly in your program:

1.23 // A number literal
"hello" // A string literal
/pattern/ // A regular expression literal

Some of JavaScript’s reserved words are primary expressions:

true // Evalutes to the boolean true value
false // Evaluates to the boolean false value
null // Evaluates to the null value
this // Evaluates to the "current" object

Finally, the third type of primary expression is a reference to a variable, constant, or
property of the global object

i // Evaluates to the value of the variable i.
sum // Evaluates to the value of the variable sum.
undefined // The value of the "undefined" property of the global object

When any identifier appears by itself in a program, JavaScript assumes it is a variable
or constant or property of the global object and looks up its value. If no variable with
that name exists, an attempt to evaluate a nonexistent variable throws a ReferenceError
instead.*/


//4.2 Object and Array Initializers

/*
Object and array initializers are expressions whose value is a newly created object or
array.These initializer expressions are sometimes called object literals and array literals.

An array initializer is a comma-separated list of expressions contained within square
brackets. The value of an array initializer is a newly created array. The elements of
this new array are initialized to the values of the comma-separated expressions:
*/

[] // An empty array: no expressions inside brackets means no elements
[1+2,3+4] // A 2-element array. First element is 3, second is 7

/*
The element expressions in an array initializer can themselves be array initializers,
which means that these expressions can create nested arrays:
*/

let matrix = [[1,2,3], [4,5,6], [7,8,9]];

/*
Undefined elements can be included in an array literal by simply omitting a value
between commas. For example, the following array contains five elements, including
three undefined elements:
*/
let sparseArray = [1,,,,5];

/*
Object initializer expressions are like array initializer expressions, but the square
brackets are replaced by curly brackets, and each subexpression is prefixed with a
property name and a colon:
*/

let p = { x: 2.3, y: -1.2 }; // An object with 2 properties

let q = {}; // An empty object with no properties
q.x = 2.3; q.y = -1.2; // Now q has the same properties as p

//Object literals can be nested. For example:

let rectangle = {
    upperLeft: { x: 2, y: 2 },
    lowerRight: { x: 4, y: 5 }
    };

//4.3 Function Definition Expressions

/*
A function definition expression defines a JavaScript function, and the value of such an
expression is the newly defined function.
A function definition expression typically consists of the keyword "function" followed by
a comma-separated list of zero or more identifiers (the parameter names) in parentheses 
and a block of JavaScript code (the function body) in curly braces.
*/

// This function returns the square of the value passed to it.
let square = function(x) { return x * x; };

/*
A function definition expression can also include a name for the function. Functions
can also be defined using a function statement rather than a function expression*/

//4.4 Property Access Expressions

/*
A property access expression evaluates to the value of an object property or an array
element. JavaScript defines two syntaxes for property access:

expression . identifier
expression [ expression ]

The first style of property access specifies the object, and the identifier specifies the name of the
desired property.
The second style of property access follows the first expression (the
object or array) with another expression in square brackets. This second expression
specifies the name of the desired property or the index of the desired array element.
*/

let o = {x: 1, y: {z: 3}}; // An example object
let a = [o, 4, [5, 6]]; // An example array that contains the object

o.x // => 1: property x of expression o
o.y.z // => 3: property z of expression o.y
o["x"] // => 1: property x of object o
a[1] // => 4: element at index 1 of expression a
a[2]["1"] // => 6: element at index 1 of expression a[2]
a[0].x // => 1: property x of expression a[0]

/*
With either type of property access expression, the expression before the . or [ is first
evaluated. If the value is null or undefined, the expression throws a TypeError,
if the named property does not exist, then the value of the property access expression 
is undefined

The .identifier syntax is the simpler of the two property access options. it can only be used
when the property you want to access has a name that is a legal identifier.
If the property name includes spaces or punctuation characters, or when it is a number (for arrays),
you must use the square bracket notation.
*/

//4.4.1 Conditional Property Access

/*
ES2020 adds two new kinds of property access expressions:

expression ?. identifier
expression ?.[ expression ]

In JavaScript, the values null and undefined are the only two values that do not have
properties. In a regular property access expression using . or [], you get a TypeError
if the expression on the left evaluates to null or undefined. You can use ?. and ?.[]
syntax to guard against errors of this type.

Consider the expression a?.b. If a is null or undefined, then the expression evaluates
to undefined without any attempt to access the property b. If a is some other
value, then a?.b evaluates to whatever a.b would evaluate to.*/

let a1 = { b1: null };
a1.b1?.c.d // => undefined

/*
a is an object, so a.b is a valid property access expression. But the value of a.b is
null, so a.b.c would throw a TypeError. By using ?. instead of . we avoid the Type‐
Error, and a.b?.c evaluates to undefined.

Of course, if a.b is an object, and if that object has no property named c, then
a.b?.c.d will again throw a TypeError, and we will want to use another conditional
property access (optional chaining):
*/

let a2 = { b2: {} };
a2.b2?.c2?.d2 // => undefined

let a4; // Oops, we forgot to initialize this variable!
let index = 0;
try {
    a[index++]; // Throws TypeError
} catch(e) {
    index // => 1: increment occurs before TypeError is thrown
}
a?.[index++] // => undefined: because a is undefined
index // => 1: not incremented because ?.[] short-circuits
a[index++] // !TypeError: can't index undefined.


//4.5 Invocation Expressions

/*
An invocation expression is JavaScript’s syntax for calling (or executing) a function or
method.
It starts with a function expression that identifies the function to be called.
The function expression is followed by an open parenthesis, a comma-separated list
of zero or more argument expressions, and a close parenthesis*/

f(0) // f is the function expression; 0 is the argument expression.
Math.max(x,y,z) // Math.max is the function; x, y, and z are the arguments.
a.sort() // a.sort is the function; there are no arguments

/*
When an invocation expression is evaluated, the function expression is evaluated
first, and then the argument expressions are evaluated to produce a list of argument
values. If the value of the function expression is not a function, a TypeError is
thrown.
Next, the argument values are assigned, in order, to the parameter names
specified when the function was defined, and then the body of the function is executed.
If the function uses a return statement to return a value, then that value
becomes the value of the invocation expression.Otherwise, the value of the invocation
expression is undefined

If that expression is a property access expression, then the invocation
is known as a method invocation. In method invocations, the object or array
that is the subject of the property access becomes the value of the this keyword while
the body of the function is being executed
*/

//4.5.1 Conditional Invocation

/*
In ES2020, you can also invoke a function using ?.() instead of (). Normally when
you invoke a function, if the expression to the left of the parentheses is null or unde
fined or any other non-function, a TypeError is thrown. With the new ?.() invocation
syntax, if the expression to the left of the ?. evaluates to null or undefined, then
the entire invocation expression evaluates to undefined and no exception is thrown.

Array objects have a sort() method that can optionally be passed a function argument
that defines the desired sorting order for the array elements. Before ES2020, if
you wanted to write a method like sort() that takes an optional function argument,
you would typically use an if statement to check that the function argument was
defined before invoking it in the body of the if:*/

function square(x, log) { // The second argument is an optional function
    if (log) { // If the optional function is passed
        log(x); // Invoke it
    }
    return x * x; // Return the square of the argument
}

/*
With this conditional invocation syntax of ES2020, however, you can simply write the
function invocation using ?.(), knowing that invocation will only happen if there is
actually a value to be invoked:*/

function square(x, log) { // The second argument is an optional function
    log?.(x); // Call the function if there is one
    return x * x; // Return the square of the argument
}

/*
Note, however, that ?.() only checks whether the lefthand side is null or undefined.
It does not verify that the value is actually a function. So the square() function in this
example would still throw an exception if you passed two numbers to it, for example.

Like conditional property access expressions (§4.4.1), function invocation with ?.()
is short-circuiting: if the value to the left of ?. is null or undefined, then none of the
argument expressions within the parentheses are evaluated:
*/

let f = null, x = 0;
try {
    f(x++); // Throws TypeError because f is null
} catch(e) {
    x // => 1: x gets incremented before the exception is thrown
}

f?.(x++) // => undefined: f is null, but no exception thrown
x // => 1: increment is skipped because of short-circuiting

/*
Conditional invocation expressions with ?.() work just as well for methods as they
do for functions. But because method invocation also involves property access, it is
worth taking a moment to be sure you understand the differences between the following
expressions:*/

o.m() // Regular property access, regular invocation
o?.m() // Conditional property access, regular invocation
o.m?.() // Regular property access, conditional invocation

/*
the first expression, o must be an object with a property m and the value of that
property must be a function. In the second expression, if o is null or undefined, then
the expression evaluates to undefined. But if o has any other value, then it must have
a property m whose value is a function. And in the third expression, o must not be
null or undefined. If it does not have a property m, or if the value of that property is
null, then the entire expression evaluates to undefined
*/

//4.6 Object Creation Expressions

/*
An object creation expression creates a new object and invokes a function (called a
constructor) to initialize the properties of that object*/

new Object()
new Point(2,3)

/*
If no arguments are passed to the constructor function in an object creation expression,
the empty pair of parentheses can be omitted:*/

new Object
new Date

//4.7 Operator Overview

/*
Operators are used for JavaScript’s arithmetic expressions, comparison expressions,
logical expressions, assignment expressions, and more.

Note that most operators are represented by punctuation characters such as + and =.
Some, however, are represented by keywords such as delete and instanceof.

The operators listed first have higher precedence than those listed last.

The column labeled A gives the operator associativity, which can be L (left-to-right) 
or R (right-to-left), and the column N specifies the number of operands.
The column labeled Types lists the expected types of the operands and
(after the → symbol) the result type for the operator

Operator Operation A N Types

++ Pre- or post-increment R 1 lval→num
-- Pre- or post-decrement R 1 lval→num
- Negate number R 1 num→num
+ Convert to number R 1 any→num
~ Invert bits R 1 int→int
! Invert boolean value R 1 bool→bool
delete Remove a property R 1 lval→bool
typeof Determine type of operand R 1 any→str
void Return undefined value R 1 any→undef
** Exponentiate R 2 num,num→num
*, /, % Multiply, divide, remainder L 2 num,num→num
+, - Add, subtract L 2 num,num→num
+ Concatenate strings L 2 str,str→str
<< Shift left L 2 int,int→int
>> Shift right with sign extension L 2 int,int→int
>>> Shift right with zero extension L 2 int,int→int
<, <=,>, >= Compare in numeric order L 2 num,num→bool
<, <=,>, >= Compare in alphabetical order L 2 str,str→bool
instanceof Test object class L 2 obj,func→bool
in Test whether property exists L 2 any,obj→bool
== Test for non-strict equality L 2 any,any→bool
!= Test for non-strict inequality L 2 any,any→bool
=== Test for strict equality L 2 any,any→bool

4.7.1 Number of Operands

Operators can be categorized based on the number of operands they expect
Most JavaScript operators are binary operators that combine two expressions 
into a single, more complex expression. That is,
they expect two operands. JavaScript also supports a number of unary operators,
which convert a single expression into a single, more complex expression.
Finally, JavaScript supports one ternary operator, the conditional
operator ?:, which combines three expressions into a single expression.

4.7.2 Operand and Result Type

Some operators work on values of any type, but most expect their operands to be of a
specific type, and most operators return (or evaluate to) a value of a specific type

JavaScript operators usually convert the type (see §3.9) of their operands as needed.
The multiplication operator * expects numeric operands, but the expression "3" *
"5" is legal because JavaScript can convert the operands to numbers.  The value of this
expression is the number 15, not the string “15”, of course. Remember also that every
JavaScript value is either “truthy” or “falsy,” so operators that expect boolean operands
will work with an operand of any type.

Some operators behave differently depending on the type of the operands used with
them. Most notably, the + operator adds numeric operands but concatenates string
operands. Similarly, the comparison operators such as < perform comparison in
numerical or alphabetical order depending on the type of the operands

Notice that the assignment operators and a few of the other operators expect an operand 
of type lval. lvalue is a historical term that means “an expression that can legally appear 
on the left side of an assignment expression.” In JavaScript, variables, properties of objects, 
and elements of arrays are lvalues

4.7.3 Operator Side Effects

Some expressions, have side effects, and their evaluation may affect the result of future evaluations.
The assignment operators are the most obvious example: 
if you assign a value to a variable or property, that changes the value of any expression
that uses that variable or property. The ++ and -- increment and decrement
operators are similar, since they perform an implicit assignment. The delete operator
also has side effects: deleting a property is like (but not the same as) assigning
undefined to the property.

No other JavaScript operators have side effects, but function invocation and object
creation expressions will have side effects if any of the operators used in the function
or constructor body have side effects.

4.7.4 Operator Precedence

Operator precedence controls the order in which operations are performed.
Operators with higher precedence (nearer the top of the table) are performed
before those with lower precedence (nearer to the bottom).

Consider the following expression:
w = x + y*z;

The multiplication operator * has a higher precedence than the addition operator +,
so the multiplication is performed before the addition. Furthermore, the assignment
operator = has the lowest precedence, so the assignment is performed after all the
operations on the right side are completed.

Operator precedence can be overridden with the explicit use of parentheses. To force
the addition in the previous example to be performed first, write:

w = (x + y)*z;

Note that property access and invocation expressions have higher precedence than
any of the operators:

// my is an object with a property named functions whose value is an
// array of functions. We invoke function number x, passing it argument
// y, and then we ask for the type of the value returned.
typeof my.functions[x](y)

Although typeof is one of the highest-priority operators, the typeof operation is performed
on the result of the property access, array index, and function invocation, all
of which have higher priority than operators.

In practice, if you are at all unsure about the precedence of your operators, the simplest
thing to do is to use parentheses to make the evaluation order explicit.

The ?? operator  has lowerprecedence than || and &&, but, in fact, its precedence relative to 
those operators is not defined, and ES2020 requires you to explicitly use parentheses if you mix ?? with
either || or &&. Similarly, the new ** exponentiation operator does not have a welldefined
precedence relative to the unary negation operator, and you must use parentheses
when combining negation with exponentiation.


4.7.5 Operator Associativity

The associativity of an operator specifies the order in which operations of the
same precedence are performed. 
A value of L specifies left-to-right associativity, and a value of R specifies right-to-left associativity
Left-to-right associativity means that operations are performed from left to right

w = x - y - z;

is the same as:
w = ((x - y) - z);

On the other hand, the following expressions:
y = a ** b ** c;
x = ~-y;
w = x = y = z;
q = a?b:c?d:e?f:g;

are equivalent to:

y = (a ** (b ** c));
x = ~(-y);
w = (x = (y = z));
q = a?b:(c?d:(e?f:g));

4.7.6 Order of Evaluation

Operator precedence and associativity specify the order in which operations are performed
in a complex expression


4.8 Arithmetic Expressions

The basic arithmetic operators are ** (exponentiation), * (multiplication), / (division),
% (modulo: remainder after division), + (addition), and - (subtraction).

The operators simply evaluate their operands, convert the values to numbers if necessary, and
then compute the power, product, quotient, remainder, or difference. Non-numeric operands that 
cannot convert to numbers convert to the NaN value. If either operand is (or converts to) NaN, 
the result of the operation is (almost always) NaN. There is a natural ambiguity to expressions
like -3**2. Depending on the relative precedence of unary minus and exponentiation,
that expression could mean (-3)**2 or -(3**2). Different languages handle this differently,
and rather than pick sides, JavaScript simply makes it a syntax error to omit
parentheses in this case, forcing you to write an unambiguous expression. ** is
JavaScript’s newest arithmetic operator: it was added to the language with ES2016.

4.8.1 The + Operator

The binary + operator adds numeric operands or concatenates string operands-

When the values of both operands are numbers, or are both strings, then it is obvious
what the + operator does. In any other case, however, type conversion is necessary,
and the operation to be performed depends on the conversion performed.
if either of the operands is a string or an object that converts to a string, the 
other operand is converted to a string and concatenation is performed.
Addition is performed only if neither operand is string-like.

Technically, the + operator behaves like this:

- If either of its operand values is an object, it converts it to a primitive using the
object-to-primitive algorithm.  Date objects are converted by their toString() method, and 
all other objects are converted via valueOf(). However, most objects do not have a useful
valueOf() method, so they are converted via toString() as well.
- After object-to-primitive conversion, if either operand is a string, the other is
converted to a string and concatenation is performed.
- Otherwise, both operands are converted to numbers (or to NaN) and addition is
performed.

Here are some examples:*/

1 + 2 // => 3: addition
"1" + "2" // => "12": concatenation
"1" + 2 // => "12": concatenation after number-to-string
1 + {} // => "1[object Object]": concatenation after object-to-string
true + true // => 2: addition after boolean-to-number
2 + null // => 2: addition after null converts to 0
2 + undefined // => NaN: addition after undefined converts to NaN

//4.8.2 Unary Arithmetic Operators

/*

Unary operators modify the value of a single operand to produce a new value

The arithmetic unary operators described in this section (+, -, ++, and --) all convert
their single operand to a number, if necessary. Note that the punctuation characters +
and - are used as both unary and binary operators.

The unary arithmetic operators are the following:

Unary plus (+)
The unary plus operator converts its operand to a number (or to NaN) and
returns that converted value. When used with an operand that is already a number,
it doesn’t do anything.

Unary minus (-)
When - is used as a unary operator, it converts its operand to a number, if necessary,
and then changes the sign of the result

Increment (++)  
The ++ operator increments (i.e., adds 1 to) its single operand, which must be an
lvalue (a variable, an element of an array, or a property of an object).The operator
converts its operand to a number, adds 1 to that number, and assigns the
incremented value back into the variable, element, or property

The return value of the ++ operator depends on its position relative to the
operand.When used before the operand, where it is known as the pre-increment
operator, it increments the operand and evaluates to the incremented value of
that operand. When used after the operand, where it is known as the postincrement
operator, it increments its operand but evaluates to the unincremented
value of that operand.

let i = 1, j = ++i; // i and j are both 2
let n = 1, m = n++; // n is 2, m is 1

Decrement (--)
The -- operator expects an lvalue operand. It converts the value of the operand
to a number, subtracts 1, and assigns the decremented value back to the operand.

4.8.3 Bitwise Operators

The bitwise operators perform low-level manipulation of the bits in the binary representation
of numbers
Although they do not perform traditional arithmetic operations, they are categorized as arithmetic 
operators here because they operate on numeric operands and return a numeric value
Four of these operators perform Boolean algebra on the individual bits of the operands behaving as 
if each bit in each operand were a boolean value (1=true, 0=false).The other three bitwise operators are
used to shift bits left and right.

The bitwise operators expect integer operands and behave as if those values were represented
as 32-bit integers rather than 64-bit floating-point values. These operators
convert their operands to numbers, if necessary, and then coerce the numeric values
to 32-bit integers by dropping any fractional part and any bits beyond the 32nd.

Bitwise AND (&)
The & operator performs a Boolean AND operation on each bit of its integer
arguments. A bit is set in the result only if the corresponding bit is set in both
operands. For example, 0x1234 & 0x00FF evaluates to 0x0034.

Bitwise OR (|)
The | operator performs a Boolean OR operation on each bit of its integer arguments.
A bit is set in the result if the corresponding bit is set in one or both of the
operands. For example, 0x1234 | 0x00FF evaluates to 0x12FF.

Bitwise XOR (^)
The ^ operator performs a Boolean exclusive OR operation on each bit of its integer
arguments. Exclusive OR means that either operand one is true or operand
two is true, but not both. A bit is set in this operation’s result if a corresponding
bit is set in one (but not both) of the two operands. For example, 0xFF00 ^
0xF0F0 evaluates to 0x0FF0.

Bitwise NOT (~)
The ~ operator is a unary operator that appears before its single integer operand.
It operates by reversing all bits in the operand. Because of the way signed integers
are represented in JavaScript, applying the ~ operator to a value is equivalent to
changing its sign and subtracting 1. For example, ~0x0F evaluates to 0xFFFFFFF0,
or −16.

Shift left (<<)
The << operator moves all bits in its first operand to the left by the number of
places specified in the second operand, which should be an integer between 0 and
31. For example, in the operation a << 1, the first bit (the ones bit) of a becomes
the second bit (the twos bit), the second bit of a becomes the third, etc. A zero is
used for the new first bit, and the value of the 32nd bit is lost. Shifting a value left
by one position is equivalent to multiplying by 2, shifting two positions is equivalent
to multiplying by 4, and so on. For example, 7 << 2 evaluates to 28.

Shift right with sign (>>)
The >> operator moves all bits in its first operand to the right by the number of
places specified in the second operand (an integer between 0 and 31). Bits that
are shifted off the right are lost. The bits filled in on the left depend on the sign
bit of the original operand, in order to preserve the sign of the result. If the first
operand is positive, the result has zeros placed in the high bits; if the first
operand is negative, the result has ones placed in the high bits. Shifting a positive
value right one place is equivalent to dividing by 2 (discarding the remainder),
shifting right two places is equivalent to integer division by 4, and so on. 7 >> 1
evaluates to 3, for example, but note that and −7 >> 1 evaluates to −4.

Shift right with zero fill (>>>)
The >>> operator is just like the >> operator, except that the bits shifted in on the
left are always zero, regardless of the sign of the first operand.This is useful when
you want to treat signed 32-bit values as if they are unsigned integers.

4.9 Relational Expressions

These operators test for a relationship (such as “equals,” “less than,” or “property of ”) between 
two values and return true or false depending on whether that relationship exists

Relational expressions always evaluate to a boolean value, and that value is often used to control
the flow of program execution in if, while, and for statements

4.9.1 Equality and Inequality Operators

The == and === operators check whether two values are the same, using two different
definitions of sameness. Both operators accept operands of any type, and both return
true if their operands are the same and false if they are different. The === operator
is known as the strict equality operator (or sometimes the identity operator), and it
checks whether its two operands are “identical” using a strict definition of sameness.
The == operator is known as the equality operator; it checks whether its two operands
are “equal” using a more relaxed definition of sameness that allows type conversions.

The != and !== operators test for the exact opposite of the == and === operators.
The != inequality operator returns false if two values are equal to each other according
to == and returns true otherwise. The !== operator returns false if two values
are strictly equal to each other and returns true otherwise.

Strict equality
The strict equality operator === evaluates its operands, then compares the two values
as follows, performing no type conversion:

- If the two values have different types, they are not equal.
- If both values are null or both values are undefined, they are equal.
- If both values are the boolean value true or both are the boolean value false,
they are equal.
- If one or both values is NaN, they are not equal.
To check whether a value x is NaN, use x !== x, or the global isNaN() function.
- If both values are numbers and have the same value, they are equal. If one value
is 0 and the other is -0, they are also equal.
- If both values are strings and contain exactly the same 16-bit values in the same positions, 
they are equal. If the strings differ in length or content, they are not equal. 
- If both values refer to the same object, array, or function, they are equal. If they
refer to different objects, they are not equal, even if both objects have identical
properties.

Equality with type conversion

The equality operator == is like the strict equality operator, but it is less strict. If the
values of the two operands are not the same type, it attempts some type conversions
and tries the comparison again:

- If the two values have the same type, test them for strict equality as described
previously. If they are strictly equal, they are equal. If they are not strictly equal,
they are not equal.
- If the two values do not have the same type, the == operator may still consider
them equal. It uses the following rules and type conversions to check for equality:

- If one value is null and the other is undefined, they are equal.
- If one value is a number and the other is a string, convert the string to a number
and try the comparison again, using the converted value.
- If either value is true, convert it to 1 and try the comparison again. If either
value is false, convert it to 0 and try the comparison again.
- If one value is an object and the other is a number or string, convert the object
to a primitive using the algorithm described in §3.9.3 and try the comparison
again. An object is converted to a primitive value by either its toString() method 
or its valueOf() method. The built-in classes of core JavaScript attempt valueOf() conversion 
before toString() conversion, except for the Date class, which performs toString() conversion.
—Any other combinations of values are not equal.

As an example of testing for equality, consider the comparison:
"1" == true // => true

4.9.2 Comparison Operators

The comparison operators test the relative order (numerical or alphabetical) of their
two operands:

Less than (<)
The < operator evaluates to true if its first operand is less than its second
operand; otherwise, it evaluates to false.

Greater than (>)
The > operator evaluates to true if its first operand is greater than its second
operand; otherwise, it evaluates to false.

Less than or equal (<=)
The <= operator evaluates to true if its first operand is less than or equal to its
second operand; otherwise, it evaluates to false.

Greater than or equal (>=)
The >= operator evaluates to true if its first operand is greater than or equal to its
second operand; otherwise, it evaluates to false

The operands of these comparison operators may be of any type. Comparison can be
performed only on numbers and strings, however, so operands that are not numbers
or strings are converted.

Comparison and conversion occur as follows:

- If either operand evaluates to an object, that object is converted to a primitive
value, as described at the end of §3.9.3; if its valueOf() method returns a primitive
value, that value is used. Otherwise, the return value of its toString() method is used.
- If, after any required object-to-primitive conversion, both operands are strings,
the two strings are compared, using alphabetical order, where “alphabetical
order” is defined by the numerical order of the 16-bit Unicode values that make
up the strings.
- If, after object-to-primitive conversion, at least one operand is not a string, both
operands are converted to numbers and compared numerically. 0 and -0 are considered
equal. Infinity is larger than any number other than itself, and
-Infinity is smaller than any number other than itself. If either operand is (or
converts to) NaN, then the comparison operator always returns false. 

Remember that JavaScript strings are sequences of 16-bit integer values, and that
string comparison is just a numerical comparison of the values in the two strings.
*/

1 + 2 // => 3: addition.
"1" + "2" // => "12": concatenation.
"1" + 2 // => "12": 2 is converted to "2".
11 < 3 // => false: numeric comparison.
"11" < "3" // => true: string comparison.
"11" < 3 // => false: numeric comparison, "11" converted to 11.
"one" < 3 // => false: numeric comparison, "one" converted to NaN.

/*
4.9.3 The in Operator

The in operator expects a left-side operand that is a string, symbol, or value that can
be converted to a string. It expects a right-side operand that is an object. It evaluates
to true if the left-side value is the name of a property of the right-side object. 
*/

let point = {x: 1, y: 1}; // Define an object

"x" in point // => true: object has property named "x"
"z" in point // => false: object has no "z" property.

"toString" in point // => true: object inherits toString method

let data = [7,8,9]; // An array with elements (indices) 0, 1, and 2

"0" in data // => true: array has an element "0"
1 in data // => true: numbers are converted to strings
3 in data // => false: no element 3

/*
4.9.4 The instanceof Operator

The instanceof operator expects a left-side operand that is an object and a right-side
operand that identifies a class of objects. The operator evaluates to true if the leftside
object is an instance of the right-side class and evaluates to false otherwise.

Here are examples:*/

let d = new Date(); // Create a new object with the Date() constructor
d instanceof Date // => true: d was created with Date()
d instanceof Object // => true: all objects are instances of Object
d instanceof Number // => false: d is not a Number object

let a5 = [1, 2, 3]; // Create an array with array literal syntax
a5 instanceof Array // => true: a is an array
a5 instanceof Object // => true: all arrays are objects
a5 instanceof RegExp // => false: arrays are not regular expressions

/*
Note that all objects are instances of Object. instanceof considers the “superclasses”
when deciding whether an object is an instance of a class. If the left-side operand of
instanceof is not an object, instanceof returns false. If the righthand side is not a
class of objects, it throws a TypeError.


4.10 Logical Expressions

4.10.1 Logical AND (&&)
The && operator can be understood at three different levels. 

At the simplest level, when used with boolean operands, && performs the Boolean AND operation on the
two values: it returns true if and only if both its first operand and its second operand
are true. If one or both of these operands is false, it returns false.
&& is often used as a conjunction to join two relational expressions:

x === 0 && y === 0 // true if, and only if, x and y are both 0

But && does not require that its operands be boolean values. Recall that all JavaScript
values are either “truthy” or “falsy.”

The second level at which && can be understood is as a Boolean AND operator for
truthy and falsy values.If both operands are truthy, the operator returns a truthy
value. Otherwise, one or both operands must be falsy, and the operator returns a falsy
value.

Notice that this description says that the operator returns “a truthy value” or “a falsy
value” but does not specify what that value is. 

For that, we need to describe && at the third and final level. This operator starts by evaluating 
its first operand, the expression on its left. If the value on the left is falsy, the value of the 
entire expression must also be falsy, so && simply returns the value on the left and does not even 
evaluate the expression on the right. On the other hand, if the value on the left is truthy, then 
the overall value of the expression depends on the value on the righthand side. If the value on the 
right is truthy, then the overall value must be truthy, and if the value on the right is falsy, then
the overall value must be falsy. So when the value on the left is truthy, the && operator
evaluates and returns the value on the right*/

let o1 = {x: 1};
let p1 = null;
o1 && o1.x // => 1: o1 is truthy, so return value of o1.x
p1 && p1.x // => null: p1 is falsy, so return it and don't evaluate p1.x

/*
It is important to understand that && may or may not evaluate its right-side operand.
The behavior of && is sometimes called short circuiting, and you may sometimes see
code that purposely exploits this behavior to conditionally execute code*/

if (a === b) stop(); // Invoke stop() only if a === b
(a === b) && stop(); // This does the same thing

/*
4.10.2 Logical OR (||)
The || operator performs the Boolean OR operation on its two operands. If one or
both operands is truthy, it returns a truthy value. If both operands are falsy, it returns
a falsy value.

Although the || operator is most often used simply as a Boolean OR operator, it, like
the && operator, has more complex behavior. It starts by evaluating its first operand,
the expression on its left.If the value of this first operand is truthy, it short-circuits
and returns that truthy value without ever evaluating the expression on the right. If,
on the other hand, the value of the first operand is falsy, then || evaluates its second
operand and returns the value of that expression.

As with the && operator, you should avoid right-side operands that include side
effects, unless you purposely want to use the fact that the right-side expression may
not be evaluated.

An idiomatic usage of this operator is to select the first truthy value in a set of
alternatives:

// If maxWidth is truthy, use that. Otherwise, look for a value in
// the preferences object. If that is not truthy, use a hardcoded constant.
let max = maxWidth || preferences.maxWidth || 500;

Note that if 0 is a legal value for maxWidth, then this code will not work correctly,
since 0 is a falsy value.

Prior to ES6, this idiom is often used in functions to supply default values for
parameters:
*/

// Copy the properties of o to p, and return p
function copy(o, p) {
    p = p || {}; // If no object passed for p, use a newly created object.
    // function body goes here
    }

/*
4.10.3 Logical NOT (!)

The ! operator is a unary operator; it is placed before a single operand. Its purpose is
to invert the boolean value of its operand. For example, if x is truthy, !x evaluates to
false. If x is falsy, then !x is true.
Unlike the && and || operators, that ! always returns true or false and that you can convert
 any value x to its equivalent boolean value by applying this operator twice: !!x

 As a unary operator, ! has high precedence.
*/

// DeMorgan's Laws
!(p && q) === (!p || !q) // => true: for all values of p and q
!(p || q) === (!p && !q) // => true: for all values of p and q


/*
4.11 Assignment Expressions

JavaScript uses the = operator to assign a value to a variable or property. For example:
*/

i = 0; // Set the variable i to 0.
o.x = 1; // Set the property x of object o to 1.

/*
The = operator expects its left-side operand to be an lvalue: a variable or object property
(or array element). It expects its right-side operand to be an arbitrary value of any type.
As a side effect, the = operator assigns the value on the right to the variable
or property on the left so that future references to the variable or property evaluate to
the value.

Although assignment expressions are usually quite simple, you may sometimes see
the value of an assignment expression used as part of a larger expression.
For example, you can assign and test a value in the same expression with code like this:

(a = b) === 0

If you do this, be sure you are clear on the difference between the = and === operators!
Note that = has very low precedence, and parentheses are usually necessary
when the value of an assignment is to be used in a larger expression.

4.11.1 Assignment with Operation

JavaScript supports a number of other assignment operators that provide shortcuts by 
combining assignment with some other operation.

Operator Example Equivalent
+=  a += b   a = a + b
-=  a -= b   a = a - b
*=  a *= b   a = a * b
/=  a /= b   a = a / b
%=  a %= b   a = a % b
**=  a **= b  a = a ** b
<<=  a <<= b  a = a << b
>>=  a >>= b  a = a >> b
>>>=  a >>>= b  a = a >>> b
&=   a &= b a = a & b
|=   a |= b a = a | b
^=   a ^= b a = a ^ b

4.12 Evaluation Expressions

JavaScript has the ability to interpret strings of JavaScript source code, 
evaluating them to produce a value:

eval("3+2") // => 5

If you find yourself using eval(), you should think carefully about whether 
you really need to use it. In particular, eval() can be a
security hole, and you should never pass any string derived from user input to
eval().

4.12.1 eval()

eval() expects one argument. If you pass any value other than a string, it simply
returns that value. If you pass a string, it attempts to parse the string as JavaScript
code, throwing a SyntaxError if it fails. If it successfully parses the string, then it evaluates
the code and returns the value of the last expression or statement in the string
or undefined if the last expression or statement had no value.

4.13 Miscellaneous Operators

4.13.1 The Conditional Operator (?:)

The conditional operator is the only ternary operator (three operands) in JavaScript
and is sometimes actually called the ternary operator.This operator is sometimes
written "?:", although it does not appear quite that way in code. Because this operator
has three operands, the first goes before the ?, the second goes between the ? and
the :, and the third goes after the :. It is used like this: */

x > 0 ? x : -x // The absolute value of x

/*
The operands of the conditional operator may be of any type. The first operand is
evaluated and interpreted as a boolean. If the value of the first operand is truthy, then
the second operand is evaluated, and its value is returned. Otherwise, if the first
operand is falsy, then the third operand is evaluated and its value is returned. Only
one of the second and third operands is evaluated; never both.

While you can achieve similar results using the if statement (§5.3.1), the ?: operator
often provides a handy shortcut.*/

greeting = "hello " + (username ? username : "there");

//This is equivalent to, but more compact than, the following if statement:

greeting = "hello ";
if (username) {
greeting += username;
} else {
greeting += "there";
}

//4.13.2 First-Defined (??)

/*
The first-defined operator ?? evaluates to its first defined operand: if its left operand
is not null and not undefined, it returns that value. Otherwise, it returns the value of
the right operand. Like the && and || operators, ?? is short-circuiting: it only evaluates
its second operand if the first operand evaluates to null or undefined. If the
expression a has no side effects, then the expression a ?? b is equivalent to:
*/

// If maxWidth is defined, use that. Otherwise, look for a value in
// the preferences object. If that is not defined, use a hardcoded constant.
let max = maxWidth ?? preferences.maxWidth ?? 500;

/*
Here are more examples showing how ?? works when the first operand is falsy. If that
operand is falsy but defined, then ?? returns it. It is only when the first operand is
“nullish” (i.e., null or undefined) that this operator evaluates and returns the second
operand:*/

let options = { timeout: 0, title: "", verbose: false, n: null };

options.timeout ?? 1000 // => 0: as defined in the object
options.title ?? "Untitled" // => "": as defined in the object
options.verbose ?? true // => false: as defined in the object
options.quiet ?? false // => false: property is not defined
options.n ?? "10"; // => 10: property is null

/*
The ?? operator is similar to the && and || operators but does not have higher precedence
or lower precedence than they do. If you use it in an expression with either of
those operators, you must use explicit parentheses to specify which operation you
want to perform first:*/

(a ?? b) || c // ?? first, then ||
a ?? (b || c) // || first, then ??
//a ?? b || c // SyntaxError: parentheses are required


//4.13.3 The typeof Operator

/*
typeof is a unary operator that is placed before its single operand, which can be of
any type. Its value is a string that specifies the type of the operand.

Table 4-3. Values returned by the typeof operator
x   typeof x
undefined   "undefined"
null    "object"
true or false   "boolean"
any number or NaN   "number"
any BigInt  "bigint"
any string  "string"
any symbol  "symbol"
any function    "function"
any nonfunction object  "object"

Because typeof evaluates to “object” for all object and array values other than functions,
it is useful only to distinguish objects from other, primitive types. In order to 
distinguish one class of object from another, you must use other techniques, such as
the instanceof operator

4.13.4 The delete Operator

delete is a unary operator that attempts to delete the object property or array element
specified as its operand.delete is typically used for its property deletion side effect 
and not for the value it returns.*/

let o = { x: 1, y: 2}; // Start with an object
delete o.x; // Delete one of its properties
"x" in o // => false: the property does not exist anymore

let a3 = [1,2,3]; // Start with an array
delete a3[2]; // Delete the last element of the array
2 in a // => false: array element 2 doesn't exist anymore
a.length // => 3: note that array length doesn't change, though

/*
Note that a deleted property or array element is not merely set to the undefined
value. When a property is deleted, the property ceases to exist. Attempting to read a
nonexistent property returns undefined.
Deleting an array element leaves a “hole” in the array and does not change the array’s length.

delete expects its operand to be an lvalue. If it is not an lvalue, the operator takes no
action and returns true. Otherwise, delete attempts to delete the specified lvalue.
delete returns true if it successfully deletes the specified lvalue. Not all properties
can be deleted, however: non-configurable properties (§14.1) are immune from
deletion.

4.13.5 The await Operator

await was introduced in ES2017 as a way to make asynchronous programming more
natural in JavaScript.

Briefly, however, await expects a Promise object (representing an asynchronous computation)
as its sole operand, and it makes your program behave as if it were waiting
for the asynchronous computation to complete (but it does this without actually
blocking, and it does not prevent other asynchronous operations from proceeding at
the same time). Importantly, await is only legal within functions that have been
declared asynchronous with the async keyword

4.13.6 The void Operator

void is a unary operator that appears before its single operand, which may be of any
type. This operator is unusual and infrequently used; it evaluates its operand, then
discards the value and returns undefined.

The void operator is so obscure that it is difficult to come up with a practical example
of its use

4.13.7 The comma Operator (,)

The comma operator is a binary operator whose operands may be of any type. It evaluates
its left operand, evaluates its right operand, and then returns the value of the
right operand. Thus, the following line:

i=0, j=1, k=2;

evaluates to 2 and is basically equivalent to:

i = 0; j = 1; k = 2;

The lefthand expression is always evaluated, but its value is discarded, which means
that it only makes sense to use the comma operator when the lefthand expression has
side effects.

The only situation in which the comma operator is commonly used is with a for loop (§5.4.3) 
that has multiple loop variables*/

// The first comma below is part of the syntax of the let statement
// The second comma is the comma operator: it lets us squeeze 2
// expressions (i++ and j--) into a statement (the for loop) that expects 1.
for(let i=0,j=10; i < j; i++,j--) {
    console.log(i+j);
    }