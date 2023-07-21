//3.1 Overview and Definitions
/*
JavaScript types can be divided into two categories: primitive types and object types.
JavaScript’s primitive types include numbers, strings of text (known as strings), and
Boolean truth values (known as booleans).
The special JavaScript values null and undefined are primitive values, but they are
not numbers, strings, or booleans.

Any JavaScript value that is not a number, a string, a boolean, a symbol, null, or unde
fined is an object.

An object (that is, a member of the type object) is a collection of
properties where each property has a name and a value

An ordinary JavaScript object is an unordered collection of named values. The language
also defines a special kind of object, known as an array, that represents an
ordered collection of numbered values. The JavaScript language includes special syntax
for working with arrays, and arrays have some special behavior that distinguishes
them from ordinary objects.

In addition to basic objects and arrays, JavaScript defines a number of other useful
object types. A Set object represents a set of values. A Map object represents a mapping
from keys to values

The JavaScript interpreter performs automatic garbage collection for memory management.
This means that a JavaScript programmer generally does not need to worry
about destruction or deallocation of objects or other values. When a value is no
longer reachable—when a program no longer has any way to refer to it—the interpreter
knows it can never be used again and automatically reclaims the memory it
was occupying

JavaScript’s object types are mutable and its primitive types are immutable. A value of
a mutable type can change: a JavaScript program can change the values of object
properties and array elements. Numbers, booleans, symbols, null, and undefined are
immutable—it doesn’t even make sense to talk about changing the value of a number,
for example. Strings can be thought of as arrays of characters, and you might expect
them to be mutable. In JavaScript, however, strings are immutable: you can access the
text at any index of a string, but JavaScript provides no way to alter the text of an
existing string.

JavaScript liberally converts values from one type to another. If a program expects a
string, for example, and you give it a number, it will automatically convert the number
to a string for you. And if you use a non-boolean value where a boolean is
expected, JavaScript will convert accordingly.

Constants and variables allow you to use names to refer to values in your programs.
Constants are declared with const and variables are declared with let (or with var in
older JavaScript code)

*/


//3.2 Numbers

//3.2.1 Integer Literals

/*In a JavaScript program, a base-10 integer is written as a sequence of digits. For
example:*/
0
3
10000000

/*JavaScript recognizes hexadecimal (base-16) values. A hexadecimal literal begins with 0x or 0X, followed by a string of hexadecimal
digits. A hexadecimal digit is one of the digits 0 through 9 or the letters a (or A)
through f (or F), which represent values 10 through 15. Here are examples of hexadecimal
integer literals:*/

0xff // => 255: (15*16 + 15)
0xBADCAFE // => 195939070

/*
In ES6 and later, you can also express integers in binary (base 2) or octal (base 8)
using the prefixes 0b and 0o (or 0B and 0O) instead of 0x:*/

0b10101 // => 21: (1*16 + 0*8 + 1*4 + 0*2 + 1*1)
0o377 // => 255: (3*64 + 7*8 + 7*1)

//3.2.2 Floating-Point Literals
/*
Floating-point literals can have a decimal point; they use the traditional syntax for
real numbers. A real value is represented as the integral part of the number, followed
by a decimal point and the fractional part of the number

Floating-point literals may also be represented using exponential notation: a real
number followed by the letter e (or E), followed by an optional plus or minus sign,
followed by an integer exponent. This notation represents the real number multiplied
by 10 to the power of the exponent
*/

3.14
2345.6789
.333333333333333333
6.02e23 // 6.02 × 10²³
1.4738223E-32 // 1.4738223 × 10⁻³²


//3.2.3 Arithmetic in JavaScript

Math.pow(2,53) // => 9007199254740992: 2 to the power 53
Math.round(.6) // => 1.0: round to the nearest integer
Math.ceil(.6) // => 1.0: round up to an integer
Math.floor(.6) // => 0.0: round down to an integer
Math.abs(-5) // => 5: absolute value
Math.max(x,y,z) // Return the largest argument
Math.min(x,y,z) // Return the smallest argument
Math.random() // Pseudo-random number x where 0 <= x < 1.0
Math.PI // π: circumference of a circle / diameter
Math.E // e: The base of the natural logarithm
Math.sqrt(3) // => 3**0.5: the square root of 3
Math.pow(3, 1/3) // => 3**(1/3): the cube root of 3
Math.sin(0) // Trigonometry: also Math.cos, Math.atan, etc.
Math.log(10) // Natural logarithm of 10
Math.log(100)/Math.LN10 // Base 10 logarithm of 100
Math.log(512)/Math.LN2 // Base 2 logarithm of 512
Math.exp(3) // Math.E cubed
Math.cbrt(27) // => 3: cube root
Math.hypot(3, 4) // => 5: square root of sum of squares of all arguments
Math.log10(100) // => 2: Base-10 logarithm
Math.log2(1024) // => 10: Base-2 logarithm
Math.log1p(x) // Natural log of (1+x); accurate for very small x
Math.expm1(x) // Math.exp(x)-1; the inverse of Math.log1p()
Math.sign(x) // -1, 0, or 1 for arguments <, ==, or > 0
Math.imul(2,3) // => 6: optimized multiplication of 32-bit integers
Math.clz32(0xf) // => 28: number of leading zero bits in a 32-bit integer
Math.trunc(3.9) // => 3: convert to an integer by truncating fractional part
Math.fround(x) // Round to nearest 32-bit float number
Math.sinh(x) // Hyperbolic sine. Also Math.cosh(), Math.tanh()
Math.asinh(x) // Hyperbolic arcsine. Also Math.acosh(), Math.atanh()

/*
Arithmetic in JavaScript does not raise errors in cases of overflow, underflow, or division
by zero. When the result of a numeric operation is larger than the largest representable
number (overflow), the result is a special infinity value, Infinity. Similarly,
when the absolute value of a negative value becomes larger than the absolute value of
the largest representable negative number, the result is negative infinity, -Infinity.

Underflow occurs when the result of a numeric operation is closer to zero than the
smallest representable number. In this case, JavaScript returns 0. If underflow occurs
from a negative number, JavaScript returns a special value known as “negative zero.”

Division by zero is not an error in JavaScript: it simply returns infinity or negative
infinity. There is one exception, however: zero divided by zero does not have a welldefined
value, and the result of this operation is the special not-a-number value, NaN.

JavaScript predefines global constants Infinity and NaN to hold the positive infinity
and not-a-number value, and these values are also available as properties of the
Number object*/

Infinity // A positive number too big to represent
Number.POSITIVE_INFINITY // Same value
1/0 // => Infinity
Number.MAX_VALUE * 2 // => Infinity; overflow

-Infinity // A negative number too big to represent
Number.NEGATIVE_INFINITY // The same value
-1/0 // => -Infinity
-Number.MAX_VALUE * 2 // => -Infinity

NaN // The not-a-number val
Number.NaN // The same value, written another way
0/0 // => NaN
Infinity/Infinity // => NaN

Number.MIN_VALUE/2 // => 0: underflow
-Number.MIN_VALUE/2 // => -0: negative zero
-1/Infinity // -> -0: also negative 0
-0

// The following Number properties are defined in ES6
Number.parseInt() // Same as the global parseInt() function
Number.parseFloat() // Same as the global parseFloat() function
Number.isNaN(x) // Is x the NaN value?
Number.isFinite(x) // Is x a number and finite?
Number.isInteger(x) // Is x an integer?
Number.isSafeInteger(x) // Is x an integer -(2**53) < x < 2**53?
Number.MIN_SAFE_INTEGER // => -(2**53 - 1)
Number.MAX_SAFE_INTEGER // => 2**53 - 1
Number.EPSILON // => 2**-52: smallest difference between numbers


/*

The not-a-number value has one unusual feature in JavaScript: it does not compare
equal to any other value, including itself. This means that you can’t write x === NaN
to determine whether the value of a variable x is NaN. Instead, you must write x != x
or Number.isNaN(x).

The related function Number.isFinite() returns true if its argument is a
number other than NaN, Infinity, or -Infinity

*/


//3.2.4 Binary Floating-Point and Rounding Errors

/*
The IEEE-754 floating-point representation used by JavaScript (and just about every
other modern programming language) is a binary representation, which can exactly
represent fractions like 1/2, 1/8, and 1/1024. Unfortunately, the fractions we use
most commonly (especially when performing financial calculations) are decimal fractions:
1/10, 1/100, and so on. Binary floating-point representations cannot exactly
represent numbers as simple as 0.1.

JavaScript numbers have plenty of precision and can approximate 0.1 very closely.
But the fact that this number cannot be represented exactly can lead to problems.
Consider this code:

let x = .3 - .2; // thirty cents minus 20 cents
let y = .2 - .1; // twenty cents minus 10 cents
x === y // => false: the two values are not the same!
x === .1 // => false: .3-.2 is not equal to .1
y === .1 // => true: .2-.1 is equal to .1

Because of rounding error, the difference between the approximations of .3 and .2 is
not exactly the same as the difference between the approximations of .2 and .1. It is
important to understand that this problem is not specific to JavaScript: it affects any
programming language that uses binary floating-point numbers.

Also, note that the values x and y in the code shown here are very close to each other and to the correct
value. The computed values are adequate for almost any purpose; the problem only
arises when we attempt to compare values for equality.

If these floating-point approximations are problematic for your programs, consider
using scaled integers.For example, you might manipulate monetary values as integer
cents rather than fractional dollars.
*/


//3.2.5 Arbitrary Precision Integers with BigInt

/*
One of the newest features of JavaScript, defined in ES2020, is a new numeric type
known as BigInt.

BigInt is a numeric type whose values are integers. The type was added to JavaScript
mainly to allow the representation of 64-bit integers, which are required for compatibility
with many other programming languages and APIs.

You have need to work with numbers that large. (Note, however, that BigInt implementations are not suitable for cryptography)

BigInt literals are written as a string of digits followed by a lowercase letter n. By
default, the are in base 10, but you can use the 0b, 0o, and 0x prefixes for binary, octal,
and hexadecimal BigInts:

1234n // A not-so-big BigInt literal
0b111111n // A binary BigInt
0o7777n // An octal BigInt
0x8000000000000000n // => 2n**63n: A 64-bit integer

You can use BigInt() as a function for converting regular JavaScript numbers or
strings to BigInt values:

BigInt(Number.MAX_SAFE_INTEGER) // => 9007199254740991n
let string = "1" + "0".repeat(100); // 1 followed by 100 zeros.
BigInt(string) // => 10n**100n: one googol

Arithmetic with BigInt values works like arithmetic with regular JavaScript numbers,
except that division drops any remainder and rounds down (toward zero):

1000n + 2000n // => 3000n
3000n - 2000n // => 1000n
2000n * 3000n // => 6000000n
3000n / 997n // => 3n: the quotient is 3
3000n % 997n // => 9n: and the remainder is 9
(2n ** 131071n) - 1n // A Mersenne prime with 39457 decimal digits

Although the standard +, -, *, /, %, and ** operators work with BigInt, it is important
to understand that you may not mix operands of type BigInt with regular number
operands

Comparison operators, by contrast, do work with mixed numeric types:

1 < 2n // => true
2 > 1n // => true
0 == 0n // => true
0 === 0n // => false: the === checks for type equality as well
*/

//3.2.6 Dates and Times

/*
JavaScript defines a simple Date class for representing and manipulating the numbers
that represent dates and times. JavaScript Dates are objects, but they also have a
numeric representation as a timestamp that specifies the number of elapsed milliseconds
since January 1, 1970
*/

let timestamp = Date.now(); // The current time as a timestamp (a number).
let now = new Date(); // The current time as a Date object.
let ms = now.getTime(); // Convert to a millisecond timestamp.
let iso = now.toISOString(); // Convert to a string in standard format.

//3.3 Text

/*
The JavaScript type for representing text is the string. A string is an immutable
ordered sequence of 16-bit values, each of which typically represents a Unicode character.
The length of a string is the number of 16-bit values it contains.

JavaScript’s strings (and its arrays) use zero-based indexing: the first 16-bit value is at position 0,
the second at position 1, and so on. The empty string is the string of length 0. Java‐
Script does not have a special type that represents a single element of a string.
*/

//3.3.1 String Literals

/*
To include a string in a JavaScript program, simply enclose the characters of the
string within a matched pair of single or double quotes or backticks (' or " or `).
Double-quote characters and backticks may be contained within strings delimited by
single-quote characters, and similarly for strings delimited by double quotes and
backticks. Here are examples of string literals:

"" // The empty string: it has zero characters
'testing'
"3.14"
'name="myform"'
"Wouldn't you prefer O'Reilly's book?"
"τ is the ratio of a circle's circumference to its radius"
`"She said 'hi'", he said.`

The original versions of JavaScript required string literals to be written on a single
line, and it is common to see JavaScript code that creates long strings by concatenating
single-line strings with the + operator. As of ES5, however, you can break a string literal 
across multiple lines by ending each line but the last with a backslash (\). Neither
the backslash nor the line terminator that follow it are part of the string literal. If
you need to include a newline character in a single-quoted or double-quoted string literal, 
use the character sequence \n
*/

// A string representing 2 lines written on one line:
'two\nlines'

// A one-line string written on 3 lines:
"one\
long\
line"

// A two-line string written on two lines:
`the newline character at the end of this line
is included literally in this string`


//3.3.2 Escape Sequences in String Literals

/*
The backslash character (\) has a special purpose in JavaScript strings. Combined
with the character that follows it, it represents a character that is not otherwise representable
within the string. For example, \n is an escape sequence that represents a
newline character.

Another example, mentioned earlier, is the \' escape, which represents the single
quote (or apostrophe) character. This escape sequence is useful when you need to
include an apostrophe in a string literal that is contained within single quotes.

the backslash allows you to escape from the usual interpretation of the single-quote character. 
Instead of using it to mark the end of the string, you use it as an apostrophe:

'You\'re right, it can\'t be a quote'

\0 The NUL character (\u0000)
\b Backspace (\u0008)
\t Horizontal tab (\u0009)
\n Newline (\u000A)
\v Vertical tab (\u000B)
\f Form feed (\u000C)
\r Carriage return (\u000D)
\" Double quote (\u0022)
\' Apostrophe or single quote (\u0027)
\\ Backslash (\u005C)
\xnn The Unicode character specified by the two hexadecimal digits nn
\unnnn The Unicode character specified by the four hexadecimal digits nnnn
\u{n} The Unicode character specified by the codepoint n, where n is one to six hexadecimal digits between 0 and
10FFFF (ES6)
*/

//3.3.3 Working with Strings

/*

One of the built-in features of JavaScript is the ability to concatenate strings. If you
use the + operator with numbers, it adds them. But if you use this operator on strings,
it joins them by appending the second to the first. For example:
let msg = "Hello, " + "world"; // Produces the string "Hello, world"
let greeting = "Welcome to my blog," + " " + name;

Strings can be compared with the standard === equality and !== inequality operators:
two strings are equal if and only if they consist of exactly the same sequence of 16-bit
values. Strings can also be compared with the <, <=, >, and >= operators. String comparison
is done simply by comparing the 16-bit values

To determine the length of a string—the number of 16-bit values it contains—use the
length property of the string:

s.length

In addition to this length property, JavaScript provides a rich API for working with
strings:

let s = "Hello, world"; // Start with some text.

// Obtaining portions of a string
s.substring(1,4) // => "ell": the 2nd, 3rd, and 4th characters.
s.slice(1,4) // => "ell": same thing
s.slice(-3) // => "rld": last 3 characters
s.split(", ") // => ["Hello", "world"]: split at delimiter st

// Searching a string
s.indexOf("l") // => 2: position of first letter l
s.indexOf("l", 3) // => 3: position of first "l" at or after 3
s.indexOf("zz") // => -1: s does not include the substring "zz"
s.lastIndexOf("l") // => 10: position of last letter l

// Boolean searching functions in ES6 and later
s.startsWith("Hell") // => true: the string starts with these
s.endsWith("!") // => false: s does not end with that
s.includes("or") // => true: s includes substring "or"

// Creating modified versions of a string
s.replace("llo", "ya") // => "Heya, world"
s.toLowerCase() // => "hello, world"
s.toUpperCase() // => "HELLO, WORLD"
s.normalize() // Unicode NFC normalization: ES6
s.normalize("NFD") // NFD normalization. Also "NFKC", "NFKD"

// Inspecting individual (16-bit) characters of a string
s.charAt(0) // => "H": the first character
s.charAt(s.length-1) // => "d": the last character
s.charCodeAt(0) // => 72: 16-bit number at the specified position
s.codePointAt(0) // => 72: ES6, works for codepoints > 16 bits

// String padding functions in ES2017
"x".padStart(3) // => " x": add spaces on the left to a length of 3
"x".padEnd(3) // => "x ": add spaces on the right to a length of 3
"x".padStart(3, "*") // => "**x": add stars on the left to a length of 3
"x".padEnd(3, "-") // => "x--": add dashes on the right to a length of 3
// Space trimming functions. trim() is ES5; others ES2019
" test ".trim() // => "test": remove spaces at start and end
" test ".trimStart() // => "test ": remove spaces on left. Also trimLeft
" test ".trimEnd() // => " test": remove spaces at right. Also trimRight

// Miscellaneous string methods
s.concat("!") // => "Hello, world!": just use + operator instead
"<>".repeat(5) // => "<><><><><>": concatenate n copies. ES6

Strings can also be treated like read-only arrays, and you can access individual characters
(16-bit values) from a string using square brackets instead of the charAt()
method:

let s = "hello, world";
s[0] // => "h"
s[s.length-1] // => "d"
*/

//3.3.4 Template Literals

//In ES6 and later, string literals can be delimited with backticks:

let s = `hello world`;

/*This is more than just another string literal syntax, however, because these template
literals can include arbitrary JavaScript expressions.
The final value of a string literal in backticks is computed by evaluating any included expressions,
converting the values of those expressions to strings and combining those computed strings with the
literal characters within the backticks:
*/

let name = "Bill";
let greeting = `Hello ${ name }.`; // greeting == "Hello Bill."

/*
Everything between the ${ and the matching } is interpreted as a JavaScript expression.
The expression inside the braces is evaluated and then converted to a string and inserted into the
template, replacing the dollar sign, the curly braces, and everything in between them
A template literal may include any number of expressions.
*/

//3.3.5 Pattern Matching

/*
 JavaScript defines a datatype known as a regular expression (or RegExp) for describing
and matching patterns in strings of text. RegExps are powerful and commonly used for text processing,

Text between a pair of slashes constitutes a regular expression literal. The second
slash in the pair can also be followed by one or more letters, which modify the meaning
of the patter

Text between a pair of slashes constitutes a regular expression literal. The second
slash in the pair can also be followed by one or more letters, which modify the meaning
of the pattern. For example:*/

/^HTML/; // Match the letters H T M L at the start of a string
/[1-9][0-9]*/; // Match a nonzero digit, followed by any # of digits
/\bjavascript\b/i; // Match "javascript" as a word, case-insensitive

/*
RegExp objects define a number of useful methods, and strings also have methods
that accept RegExp arguments. For example:*/

let text = "testing: 1, 2, 3"; // Sample text
let pattern = /\d+/g; // Matches all instances of one or more digits
pattern.test(text) // => true: a match exists
text.search(pattern) // => 9: position of first match
text.match(pattern) // => ["1", "2", "3"]: array of all matches
text.replace(pattern, "#") // => "testing: #, #, #"
text.split(/\D+/) // => ["","1","2","3"]: split on nondigits


//3.4 Boolean Values

/*
A boolean value represents truth or falsehood on or off, yes or no. There are only two
possible values of this type. The reserved words true and false evaluate to these two
values.

Boolean values are commonly used in JavaScript control structures. For example, the
if/else statement in JavaScript performs one action if a boolean value is true and
another action if the value is false. You usually combine a comparison that creates a
boolean value directly with a statement that uses it. The result looks like this:
*/
if (a === 4) {
b = b + 1;
} else {
a = a + 1;
}

/*
Any JavaScript value can be converted to a boolean value.

The following values convert to, and therefore work like, false:

undefined
null
0
-0
NaN
"" // the empty string

All other values, including all objects (and arrays) convert to, and work like, true.

false, and the six values that convert to it, are sometimes called falsy values, and all
other values are called truthy

Any time JavaScript expects a boolean value, a falsy
value works like false and a truthy value works like true.

As an example, suppose that the variable o either holds an object or the value null.
You can test explicitly to see if o is non-null with an if statement like this:
if (o !== null) ...

The not-equal operator !== compares o to null and evaluates to either true or false.

But you can omit the comparison and instead rely on the fact that null is falsy and
objects are truthy:
if (o) ...

In the first case, the body of the if will be executed only if o is not null. The second
case is less strict: it will execute the body of the if only if o is not false or any falsy
value (such as null or undefined). Which if statement is appropriate for your program
really depends on what values you expect to be assigned to o. If you need to
distinguish null from 0 and "", then you should use an explicit comparison.

Boolean values have a toString() method that you can use to convert them to the
strings “true” or “false”, but they do not have any other useful methods.

The && operator performs the Boolean AND operation. It evaluates to a truthy value
if and only if both of its operands are truthy

The || operator is the Boolean OR operation: it evaluates to a truthy value if either
one (or both) of its operands is truthy*/

if ((x === 0 && y === 0) || !(z === 0)) {
    // x and y are both zero or z is non-zero
}

//3.5 null and undefined

/*
null is a language keyword that evaluates to a special value that is usually used to
indicate the absence of a value.
In practice, however, null is typically regarded as the sole member of its
own type, and it can be used to indicate “no value” for numbers and strings as well as
objects

JavaScript also has a second value that indicates absence of value. The undefined value 
represents a deeper kind of absence. It is the value of variables that have not
been initialized and the value you get when you query the value of an object property
or array element that does not exist. The undefined value is also the return value of
functions that do not explicitly return a value and the value of function parameters
for which no argument is passed

Despite these differences, null and undefined both indicate an absence of value and
can often be used interchangeably
The equality operator == considers them to be equal. (Use the strict equality operator 
    === to distinguish them.) Both are falsy values. Both are falsy values:
they behave like false when a boolean value is required.

avoid using null and undefined when I can, but if I need to assign one of these values
to a variable or property or pass or return one of these values to or from a function,
I usually use null*/

//3.6 Symbols

/*Symbols were introduced in ES6 to serve as non-string property names. To understand
Symbols, you need to know that JavaScript’s fundamental Object type is an
unordered collection of properties, where each property has a name and a value.
Property names are typically (and until ES6, were exclusively) strings. But in ES6 and
later, Symbols can also serve this purpose:*/

let strname = "string name"; // A string to use as a property name
let symname = Symbol("propname"); // A Symbol to use as a property name
typeof strname // => "string": strname is a string
typeof symname // => "symbol": symname is a symbol
let o = {}; // Create a new object
o[strname] = 1; // Define a property with a string name
o[symname] = 2; // Define a property with a Symbol name
o[strname] // => 1: access the string-named property
o[symname] // => 2: access the symbol-named property

/*The Symbol type does not have a literal syntax. To obtain a Symbol value, you call the
Symbol() function. This function never returns the same value twice, even when
called with the same argument. This means that if you call Symbol() to obtain a Symbol
value, you can safely use that value as a property name to add a new property to
an object and do not need to worry that you might be overwriting an existing property
with the same name. Similarly, if you use symbolic property names and do not
share those symbols, you can be confident that other modules of code in your program
will not accidentally overwrite your properties.

In practice, Symbols serve as a language extension mechanism.

The Symbol() function takes an optional string argument and returns a unique Symbol
value. If you supply a string argument, that string will be included in the output
of the Symbol’s toString() method. Note, however, that calling Symbol() twice with
the same string produces two completely different Symbol values.
*/

let s1 = Symbol("sym_x");
s1.toString() // => "Symbol(sym_x)"

/*
toString() is the only interesting method of Symbol instances.

There are two other Symbol-related functions you should know about, however. Sometimes when using
Symbols, you want to keep them private to your own code so you have a guarantee
that your properties will never conflict with properties used by other code

To serve this latter use case, JavaScript defines a global Symbol registry. The
Symbol.for() function takes a string argument and returns a Symbol value that is
associated with the string you pass. If no Symbol is already associated with that string,
then a new one is created and returned; otherwise, the already existing Symbol is
returned. Other times, however, you might want to define a Symbol value and share it widely with
other code.

To serve this latter use case, JavaScript defines a global Symbol registry. The
Symbol.for() function takes a string argument and returns a Symbol value that is
associated with the string you pass.If no Symbol is already associated with that string,
then a new one is created and returned; otherwise, the already existing Symbol is
returned.

That is, the Symbol.for() function is completely different than the Sym
bol() function: Symbol() never returns the same value twice, but Symbol.for()
always returns the same value when called with the same string.*/

let s2 = Symbol.for("shared");
let t = Symbol.for("shared");
s2 === t // => true
s2.toString() // => "Symbol(shared)"
Symbol.keyFor(t) // => "shared"

//3.7 The Global Object

/*
The global object is a regular JavaScript object that serves a very important purpose: the
properties of this object are the globally defined identifiers that are available to a Java‐
Script program.

When the JavaScript interpreter starts, it creates a new global object and gives it an initial set of properties
that define:

Global constants like undefined, Infinity, and NaN
Global functions like isNaN(), parseInt(), and eval() 
Constructor functions like Date(), RegExp(), String(), Object(), and Array()
Global objects like Math and JSON

In Node, the global object has a property named "global" whose value is the global
object itself, so you can always refer to the global object by the name "global" in Node
programs

In web browsers, the Window object serves as the global object for all JavaScript code
contained in the browser window it represents. This global Window object has a self referential
window property that can be used to refer to the global object. The Window
object defines the core global properties, but it also defines quite a few other
globals that are specific to web browsers and client-side JavaScript. Web worker
threads (§15.13) have a different global object than the Window with which they are
associated. Code in a worker can refer to its global object as self.
*/

//3.8 Immutable Primitive Values and Mutable Object References

/*
There is a fundamental difference in JavaScript between primitive values (undefined,
null, booleans, numbers, and strings) and objects (including arrays and functions).

Primitives are immutable: there is no way to change (or “mutate”) a primitive value.

Since strings are like arrays of characters, you might expect to be able to alter the character
 at any specified index. In fact, JavaScript does not allow this, and all string methods that appear to
return a modified string are, in fact, returning a new string value*/

let s3 = "hello"; // Start with some lowercase text
s3.toUpperCase(); // Returns "HELLO", but doesn't alter s
s3 // => "hello": the original string has not changed

/*
Primitives are also compared by value: two values are the same only if they have the
same value. Again, however, it is not so obvious for strings. If two distinct string values are compared, 
JavaScript treats them as equal if, and only if, they have the same length and if the character at each 
index is the same.

Objects are different than primitives. First, they are mutable—their values can
change:*/

let o = { x: 1 }; // Start with an object
o.x = 2; // Mutate it by changing the value of a property
o.y = 3; // Mutate it again by adding a new property

let a = [1,2,3]; // Arrays are also mutable
a[0] = 0; // Change the value of an array element
a[3] = 4; // Add a new array element

/*
Objects are not compared by value: two distinct objects are not equal even if they
have the same properties and values. And two distinct arrays are not equal even if
they have the same elements in the same order:*/

let o = {x: 1}, p = {x: 1}; // Two objects with the same properties

o === p // => false: distinct objects are never equal

let a = [], b = []; // Two distinct, empty arrays
a === b // => false: distinct arrays are never equal

/*
Objects are sometimes called reference types to distinguish them from JavaScript’s
primitive types.
Using this terminology, object values are references, and we say that
objects are compared by reference: two object values are the same if and only if they
refer to the same underlying object*/

let a = []; // The variable a refers to an empty array.
let b1 = a; // Now b refers to the same array.
b1[0] = 1; // Mutate the array referred to by variable b.
a[0] // => 1: the change is also visible through variable a.
a === b // => true: a and b refer to the same object, so they are equal

/*
As you can see from this code, assigning an object (or array) to a variable simply
assigns the reference: it does not create a new copy of the object. If you want to make
a new copy of an object or array, you must explicitly copy the properties of the object
or the elements of the array.
*/

let a = ["a","b","c"]; // An array we want to copy
let b2 = []; // A distinct array we'll copy into
for(let i = 0; i < a.length; i++) { // For each index of a[]
    b2[i] = a[i]; // Copy an element of a into b
}
let c = Array.from(b2); // In ES6, copy arrays with Array.from()

/*
Similarly, if we want to compare two distinct objects or arrays, we must compare their
properties or elements. This code defines a function to compare two arrays:
*/

function equalArrays(a, b) {
    if (a === b) return true; // Identical arrays are equal
    if (a.length !== b.length) return false; // Different-size arrays not equal
    for(let i = 0; i < a.length; i++) { // Loop through all elements
        if (a[i] !== b[i]) return false; // If any differ, arrays not equal
    }
    return true;
}

//3.9 Type Conversions

/*
JavaScript is very flexible about the types of values it requires. We’ve seen this for
booleans: when JavaScript expects a boolean value, you may supply a value of any
type, and JavaScript will convert it as needed. Some values (“truthy” values) convert
to true and others (“falsy” values) convert to false. The same is true for other types:
if JavaScript wants a string, it will convert whatever value you give it to a string. If
JavaScript wants a number, it will try to convert the value you give it to a number
*/

10 + " objects" // => "10 objects": Number 10 converts to a string
"7" * "4" // => 28: both strings convert to numbers
let n = 1 - "x"; // n == NaN; string "x" can't convert to a number
n + " objects" // => "NaN objects": NaN converts to string "NaN"

/*
Value           to String       to Number       to Boolean
undefined       "undefined"         NaN         false
null            "null"              0              false
true "true" 1
false "false" 0
"" (empty string) 0 false
"1.2" (nonempty, numeric) 1.2 true
"one" (nonempty, non-numeric) NaN true
0 "0" false
-0 "0" false
1 (finite, non-zero) "1" true
Infinity "Infinity" true
-Infinity "-Infinity" true
NaN "NaN" false
{} (any object) see §3.9.3 see §3.9.3 true
[] (empty array) "" 0 true
[9] (one numeric element) "9" 9 true
['a'] (any other array) use join() method NaN true
function(){} (any function) see §3.9.3 NaN true*/

//3.9.1 Conversions and Equality

/*
JavaScript has two operators that test whether two values are equal. The “strict equality
operator,” ===, does not consider its operands to be equal if they are not of the
same type, and this is almost always the right operator to use when coding. But
because JavaScript is so flexible with type conversions, it also defines the == operator
with a flexible definition of equality.
*/

null == undefined // => true: These two values are treated as equal.
"0" == 0 // => true: String converts to a number before comparing.
0 == false // => true: Boolean converts to number before comparing.
"0" == false // => true: Both operands convert to 0 before comparing!

/*Keep in mind that convertibility of one value to another does not imply equality of
those two values. If undefined is used where a boolean value is expected, for example,
it will convert to false. But this does not mean that undefined == false*/

//3.9.2 Explicit Conversions

/*
Although JavaScript performs many type conversions automatically, you may sometimes
need to perform an explicit conversion, or you may prefer to make the conversions
explicit to keep your code clearer.

The simplest way to perform an explicit type conversion is to use the Boolean(), Num
ber(), and String() functions*/

Number("3") // => 3
String(false) // => "false": Or use false.toString()
Boolean([]) // => true

/*As an aside, note that the Boolean(), Number(), and String() functions can also be
invoked—with new—as constructor. If you use them this way, you’ll get a “wrapper”
object that behaves just like a primitive boolean, number, or string value. These wrapper
objects are a historical leftover from the earliest days of JavaScript, and there is
never really any good reason to use them.

Certain JavaScript operators perform implicit type conversions and are sometimes
used explicitly for the purpose of type conversion. If one operand of the + operator is
a string, it converts the other one to a string. The unary + operator converts its
operand to a number. And the unary ! operator converts its operand to a boolean
and negates it.*/

x + "" // => String(x)
+x // => Number(x)
x-0 // => Number(x)
!!x // => Boolean(x): Note double !

/*The toString() method defined by the Number class accepts an optional argument
that specifies a radix, or base, for the conversion*/

let n1 = 17;
let binary = "0b" + n1.toString(2); // binary == "0b10001"
let octal = "0o" + n1.toString(8); // octal == "0o21"
let hex = "0x" + n1.toString(16); // hex == "0x11"

/*The Number class defines three methods for these kinds of
number-to-string conversions. toFixed() converts a number to a string with a specified
number of digits after the decimal point.

When working with financial or scientific data, you may want to convert numbers to
strings in ways that give you control over the number of decimal places

toExponential() converts a number to a string using exponential notation,with one
digit before the decimal point and a specified number of digits after the decimal point
toPrecision() converts a number to a string with the number of significant
digits you specify*/

let n2 = 123456.789;
n2.toFixed(0) // => "123457"
n2.toFixed(2) // => "123456.79"
n2.toFixed(5) // => "123456.78900"
n2.toExponential(1) // => "1.2e+5"
n2.toExponential(3) // => "1.235e+5"
n2.toPrecision(4) // => "1.235e+5"
n2.toPrecision(7) // => "123456.8"
n2.toPrecision(10) // => "123456.7890"

/*If you pass a string to the Number() conversion function, it attempts to parse that
string as an integer or floating-point literal. That function only works for base-10
integers and does not allow trailing characters that are not part of the literal

The parseInt() and parseFloat() functions (these are global functions, not methods of
any class) are more flexible. parseInt() parses only integers, while parseFloat()
parses both integers and floating-point numbers. If a string begins with “0x” or “0X”,
parseInt() interprets it as a hexadecimal number. Both parseInt() and parse
Float() skip leading whitespace, parse as many numeric characters as they can, and
ignore anything that follows.*/

parseInt("3 blind mice") // => 3
parseFloat(" 3.14 meters") // => 3.14
parseInt("-12.34") // => -12
parseInt("0xFF") // => 255
parseInt("0xff") // => 255
parseInt("-0XFF") // => -255
parseFloat(".1") // => 0.1
parseInt("0.1") // => 0
parseInt(".1") // => NaN: integers can't start with "."
parseFloat("$72.47") // => NaN: numbers can't start with "$"


//3.9.3 Object to Primitive Conversions

/*
The JavaScript specification defines three fundamental algorithms for converting objects to primitive
values:

prefer-string
    This algorithm returns a primitive value, preferring a string value, if a conversion
    to string is possible.

prefer-number
    This algorithm returns a primitive value, preferring a number, if such a conversion
    is possible

no-preference
    This algorithm expresses no preference about what type of primitive value is
    desired, and classes can define their own conversions

Object-to-boolean conversions
    Object-to-boolean conversions are trivial: all objects convert to true. It literally applies to all 
    objects, including empty arrays and even the wrapper object new Boolean(false).

Object-to-string conversions
    When an object needs to be converted to a string, JavaScript first converts it to a
    primitive using the prefer-string algorithm, then converts the resulting primitive value
    to a string,    

Object-to-number conversions
    When an object needs to be converted to a number, JavaScript first converts it to a
    primitive value using the prefer-number algorithm, then converts the resulting primitive
    value to a number

The toString() and valueOf() methods

All objects inherit two conversion methods that are used by object-to-primitive conversions,
and before we can explain the prefer-string, prefer-number, and no-preference
conversion algorithms, we have to explain these two methods.

The first method is toString(), and its job is to return a string representation of the
object. The default toString() method does not return a very interesting value

({x: 1, y: 2}).toString() // => "[object Object]"

Many classes define more specific versions of the toString() method. The
toString() method of the Array class, for example, converts each array element to a
string and joins the resulting strings together with commas in between.
The Date class defines a toString() method that returns a human-readable (and JavaScript-parsable) 
date and time string. The RegExp class defines a toString() method that converts RegExp objects to 
a string that looks like a RegExp literal:

[1,2,3].toString() // => "1,2,3"
(function(x) { f(x); }).toString() // => "function(x) { f(x); }"
/\d+/g.toString() // => "/\\d+/g"
let d = new Date(2020,0,1);
d.toString() // => "Wed Jan 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)"

The other object conversion function is called valueOf(). The job of this method is
less well defined: it is supposed to convert an object to a primitive value that represents
the object.Objects are compound values, and most objects cannot really be represented by a single 
primitive value, so the default valueOf() method simply returns the object itself rather 
than returning a primitive.
Wrapper classes such as String, Number, and Boolean define valueOf() methods that
simply return the wrapped primitive value. Arrays, functions, and regular expressions
simply inherit the default method. Calling valueOf() for instances of these types simply
returns the object itself. The Date class defines a valueOf() method that returns
the date in its internal representation: the number of milliseconds since January 1,
1970:
*/

let d = new Date(2010, 0, 1); // January 1, 2010, (Pacific time)
d.valueOf() // => 1262332800000

/*
Object-to-primitive conversion algorithms

we can now explain approximately how the three object-to-primitive algorithms work

The prefer-string algorithm first tries the toString() method. If the method is
defined and returns a primitive value, then JavaScript uses that primitive value
(even if it is not a string!). If toString() does not exist or if it returns an object,
then JavaScript tries the valueOf() method. If that method exists and returns a
primitive value, then JavaScript uses that value. Otherwise, the conversion fails
with a TypeError

The prefer-number algorithm works like the prefer-string algorithm, except that it
tries valueOf() first and toString() second

The no-preference algorithm depends on the class of the object being converted.
If the object is a Date object, then JavaScript uses the prefer-string algorithm. For
any other object, JavaScript uses the prefer-number algorithm.

Before we leave this topic, it is worth noting that the details of the prefer-number conversion
explain why empty arrays convert to the number 0 and single-element arrays
can also convert to numbers:

Number([]) // => 0: this is unexpected!
Number([99]) // => 99: really?

The object-to-number conversion first converts the object to a primitive using the
prefer-number algorithm, then converts the resulting primitive value to a number.
The prefer-number algorithm tries valueOf() first and then falls back on toString().
But the Array class inherits the default valueOf() method, which does not return a
primitive value. So when we try to convert an array to a number, we end up invoking
the toString() method of the array. Empty arrays convert to the empty string. And
the empty string converts to the number 0. An array with a single element converts to
the same string that that one element does. If an array contains a single number, that
number is converted to a string, and then back to a number.

*/

//3.10 Variable Declaration and Assignment

/*
One of the most fundamental techniques of computer programming is the use of
names—or identifiers—to represent values
When we do this, we typically say that we are assigning a value to a variable.
The term “variable” implies that new values can be assigned: that the value associated 
with the variable may vary as your program runs.

Before you can use a variable or constant in a JavaScript program, you must declare it.

this is done with the let and const keywords.

Prior to ES6, variables were declared with var.

3.10.1 Declarations with let and const

In modern JavaScript (ES6 and later), variables are declared with the let keyword,
like this:*/

let i;
let sum;

//You can also declare multiple variables in a single let statement:

let i1, sum1;

/*It is a good programming practice to assign an initial value to your variables when
you declare them, when this is possible:*/

let message = "hello";
let i2 = 0, j = 0, k = 0;
let x = 2, y = x*x; // Initializers can use previously declared variables

/*If you don’t specify an initial value for a variable with the let statement, the variable
is declared, but its value is undefined until your code assigns a value to it.

To declare a constant instead of a variable, use const instead of let. const works just
like let except that you must initialize the constant when you declare it*/

const H0 = 74; // Hubble constant (km/s/Mpc)
const C = 299792.458; // Speed of light in a vacuum (km/s)
const AU = 1.496E8; // Astronomical Unit: distance to the sun (km)

/*
As the name implies, constants cannot have their values changed, and any attempt to
do so causes a TypeError to be thrown

JavaScript allows us to declare the loop variable as part of the loop syntax itself, 
and this is another common way to use let:*/

for(let i = 0, len = data.length; i < len; i++) console.log(data[i]);
for(let datum of data) console.log(datum);
for(let property in object) console.log(property);

/*
Variable and constant scope

The scope of a variable is the region of your program source code in which it is
defined. Variables and constants declared with let and const are block scoped.
This means that they are only defined within the block of code.

JavaScript class and function definitions are blocks, and so are the
bodies of if/else statements, while loops, for loops, and so on.

if a variable or constant is declared within a set of curly braces, then 
those curly braces delimit the region of code in which the variable or constant
 is defined.

When a declaration appears at the top level, outside of any code blocks, we say it is a
global variable or constant and has global scope. the scope of a global variable 
is the file that it is defined in.

Repeated declarations

It is a syntax error to use the same name with more than one let or const declaration
in the same scope. It is legal (though a practice best avoided) to declare a new variable
with the same name in a nested scope:

const x3 = 1; // Declare x as a global constant
if (x3 === 1) {
let x3 = 2; // Inside a block x can refer to a different value
console.log(x3); // Prints 2
}
console.log(x3); // Prints 1: we're back in the global scope now
let x3 = 3; // ERROR! Syntax error trying to re-declare x

*/

//Declarations and types

/*If you’re used to statically typed languages such as C or Java, you may think that the
primary purpose of variable declarations is to specify the type of values that may be
assigned to a variable. But, as you have seen, there is no type associated with
JavaScript’s variable declarations

A JavaScript variable can hold a value of any type.*/

let i3 = 10;
i3 = "ten";

//3.10.2 Variable Declarations with var

/*
In versions of JavaScript before ES6, the only way to declare a variable is with the var
keyword, and there is no way to declare constants. The syntax of var is just like the
syntax of let:

var x;
var data = [], count = data.length;
for(var i = 0; i < count; i++) console.log(data[i]);

Although var and let have the same syntax, there are important differences in the
way they work:

- Variables declared with var do not have block scope. Instead, they are scoped to
the body of the containing function no matter how deeply nested they are inside
that function
- If you use var outside of a function body, it declares a global variable. But global
variables declared with var differ from globals declared with let in an important
way.  Globals declared with var are implemented as properties of the global object. The 
global object can be referenced as globalThis. So if you write var x = 2; outside of a 
function, it is like you wrote globalThis.x = 2;. Global variables
and constants declared with let and const are not properties of the global
object.
- Unlike variables declared with let, it is legal to declare the same variable multiple
times with var. And because var variables have function scope instead of block
scope, it is actually common to do this kind of redeclaration. The variable i is
frequently used for integer values, and especially as the index variable of for
loops. In a function with multiple for loops, it is typical for each one to begin
for(var i = 0; .... Because var does not scope these variables to the loop
body, each of these loops is (harmlessly) re-declaring and re-initializing the same
variable.
- One of the most unusual features of var declarations is known as hoisting. When
a variable is declared with var, the declaration is lifted up (or “hoisted”) to the
top of the enclosing function. The initialization of the variable remains where
you wrote it, but the definition of the variable moves to the top of the function. So 
variables declared with var can be used, without error, anywhere in the
enclosing function. If the initialization code has not run yet, then the value of the
variable may be undefined, but you won’t get an error if you use the variable
before it is initialized.*/

//3.10.3 Destructuring Assignment

/*
ES6 implements a kind of compound declaration and assignment syntax known as
destructuring assignment. In a destructuring assignment, the value on the righthand
side of the equals sign is an array or object and the lefthand
side specifies one or more variable names using a syntax that mimics array and object
literal syntax. When a destructuring assignment occurs, one or more values are
extracted (“destructured”) from the value on the right and stored into the variables
named on the left. Destructuring assignment is perhaps most commonly used to initialize
variables as part of a const, let, or var declaration statement, but it can also be
done in regular assignment expressions

Here are simple destructuring assignments using arrays of values:*/

let [x1,y1] = [1,2]; // Same as let x=1, y=2
[x1,y1] = [x+1,y+1]; // Same as x = x + 1, y = y + 1
[x1,y1] = [y1,x1]; // Swap the value of the two variables
[x1,y1] // => [3,2]: the incremented and swapped values

/*
Notice how destructuring assignment makes it easy to work with functions that
return arrays of values:*/

// Convert [x,y] coordinates to [r,theta] polar coordinates
function toPolar(x, y) {
    return [Math.sqrt(x*x+y*y), Math.atan2(y,x)];
}
    
// Convert polar to Cartesian coordinates
function toCartesian(r, theta) {
    return [r*Math.cos(theta), r*Math.sin(theta)];
}

let [r,theta] = toPolar(1.0, 1.0); // r == Math.sqrt(2); theta == Math.PI/4
let [x2,y2] = toCartesian(r,theta); // [x2, y2] == [1.0, 1,0]

/*
We saw that variables and constants can be declared as part of JavaScript’s various for
loops. It is possible to use variable destructuring in this context as well.Here is a code
that loops over the name/value pairs of all properties of an object and uses destructuring
assignment to convert those pairs from two-element arrays into individual
variables:*/

let o = { x: 1, y: 2 }; // The object we'll loop over
for(const [name, value] of Object.entries(o)) {
    console.log(name, value); // Prints "x 1" and "y 2"
}

/*
The number of variables on the left of a destructuring assignment does not have to
match the number of array elements on the right.Extra variables on the left are set to
undefined, and extra values on the right are ignored.*/

let [x3,y3] = [1]; // x3 == 1; y3 == undefined
[x3,y3] = [1,2,3]; // x3 == 1; y3 == 2
[,x3,,y3] = [1,2,3,4]; // x3 == 2; y3 == 4

/*If you want to collect all unused or remaining values into a single variable when
destructuring an array, use three dots (...) before the last variable name on the lefthand
side:*/

let [x4, ...y4] = [1,2,3,4]; // x4==1, y4 == [2,3,4]

/*
We’ll see three dots used this way again in §8.3.2, where they are used to indicate that
all remaining function arguments should be collected into a single array.

Destructuring assignment can be used with nested arrays. In this case, the lefthand
side of the assignment should look like a nested array literal:
*/

let [a1, [b1, c1]] = [1, [2,2.5], 3]; // a1 == 1; b1 == 2; c1 == 2.5

/*
A powerful feature of array destructuring is that it does not actually require an array!
You can use any iterable object on the righthand side of the assignment; any object that 
can be used with a for/of loop (§5.4.4) can also be destructured:*/

let [first, ...rest] = "Hello"; // first == "H"; rest == ["e","l","l","o"]

/*
Destructuring assignment can also be performed when the righthand side is an object
value. In this case, the lefthand side of the assignment looks something like an object
literal: a comma-separated list of variable names within curly braces:
*/

let transparent = {r: 0.0, g: 0.0, b: 0.0, a: 1.0}; // A RGBA color
let {r1, g1, b1} = transparent; // r1 == 0.0; g1 == 0.0; b1 == 0.0

/*
The next example copies global functions of the Math object into variables, which
might simplify code that does a lot of trigonometry:*/

// Same as const sin=Math.sin, cos=Math.cos, tan=Math.tan
const {sin, cos, tan} = Math;
