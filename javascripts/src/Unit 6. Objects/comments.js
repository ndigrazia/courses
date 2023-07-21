// Objects

//Objects are JavaScript’s most fundamental datatype.

//6.1 Introduction to Objects

/*
An object is a composite value: it aggregates multiple values (primitive values or
other objects) and allows you to store and retrieve those values by name.

An object is an unordered collection of properties, each of which has a name and a value.

Property names are usually strings although, property names can also be Symbols.

An object is more than a simple string-to-value map, however. In addition to
maintaining its own set of properties, a JavaScript object also inherits the properties
of another object, known as its “prototype". The methods of an object are typically
inherited properties, and this “prototypal inheritance” is a key feature of JavaScript.

JavaScript objects are dynamic—properties can usually be added and deleted—but
they can be used to simulate the static objects and “structs” of statically typed languages.

They can also be used (by ignoring the value part of the string-to-value mapping)
to represent sets of strings.

Any value in JavaScript that is not a string, a number, a Symbol, or true, false, null,
or undefined is an object. And even though strings, numbers, and booleans are not
objects, they can behave like immutable objects.

Objects are mutable and manipulated by reference rather than by value. If the variable x 
refers to an object and the code let y = x; is executed, the variable y holds a 
reference to the same object, not a copy of that object. Any
modifications made to the object through the variable y are also visible through the
variable x.

A property has a name and a value. 

A property name may be any string, including the empty string (or any Symbol), but no 
 object may have two properties with the same name.

The value may be any JavaScript value, or it may be a getter or setter function
(or both).

It is sometimes important to be able to distinguish between properties defined
directly on an object and those that are inherited from a prototype object. JavaScript
uses the term own property to refer to non-inherited properties..

In addition to its name and value, each property has three property attributes:

• The writable attribute specifies whether the value of the property can be set.
• The enumerable attribute specifies whether the property name is returned by a
for/in loop.
• The configurable attribute specifies whether the property can be deleted and
whether its attributes can be altered.

Many of JavaScript’s built-in objects have properties that are read-only, nonenumerable,
or non-configurable

*/

//6.2 Creating Objects

/*
Objects can be created with object literals, with the new keyword, and with the
Object.create() function.


6.2.1 Object Literals

The easiest way to create an object is to include an object literal in your JavaScript
code. In its simplest form, an object literal is a comma-separated list of colon-separated
name: value pairs, enclosed within curly braces

A property name is a Java‐Script identifier or a string literal (the empty string is allowed).

A property value is any JavaScript expression; the value of the expression (it may be a primitive value or
an object value) becomes the value of the property.*/

let empty = {}; // An object with no properties

let point = { x: 0, y: 0 }; // Two numeric properties

let p2 = { x: point.x, y: point.y+1 }; // More complex values

let book = {
    "main title": "JavaScript", // These property names include spaces,
    "sub-title": "The Definitive Guide", // and hyphens, so use string literals.
    for: "all audiences", // for is reserved, but no quotes.
    author: { // The value of this property is
        firstname: "David", // itself an object.
        surname: "Flanagan"
    }
};

/*
An object literal is an expression that creates and initializes a new and distinct object
each time it is evaluated. The value of each property is evaluated each time the literal
is evaluated. This means that a single object literal can create many new objects if it
appears within the body of a loop or in a function that is called repeatedly, and that
the property values of these objects may differ from each other.


6.2.2 Creating Objects with new

The new operator creates and initializes a new object. The new keyword must be followed
by a function invocation. A function used in this way is called a constructor and
serves to initialize a newly created object.*/

let o = new Object(); // Create an empty object: same as {}.
let a = new Array(); // Create an empty array: same as [].
let d = new Date(); // Create a Date object representing the current time
let r = new Map(); // Create a Map object for key/value mapping

/*
In addition to these built-in constructors, it is common to define your own constructor
functions to initialize newly created objects.


6.2.3 Prototypes

Almost every JavaScript object has a second JavaScript object associated with it. This second
object is known as a prototype, and the first object inherits properties from the prototype.

All objects created by object literals have the same prototype object, and we can refer
to this prototype object in JavaScript code as Object.prototype.

Objects created using the new keyword and a constructor invocation use the value of 
the prototype property of the constructor function as their prototype. So the object 
created by new Object() inherits from Object.prototype, just as the object created 
by {} does. Similarly, the object created by new Array() uses Array.prototype as its 
prototype and the object created by new Date() uses Date.prototype as its prototype.

Remember: almost all objects have a prototype, but only a relatively small number 
of objects have a prototype property. It is these objects with prototype properties 
that define the prototypes for all the other objects.

Object.prototype is one of the rare objects that has no prototype: it does not inherit
any properties. Other prototype objects are normal objects that do have a prototype.
Most built-in constructors (and most user-defined constructors) have a prototype
that inherits from Object.prototype. For example, Date.prototype inherits properties
from Object.prototype, so a Date object created by new Date() inherits properties
from both Date.prototype and Object.prototype. This linked series of
prototype objects is known as a prototype chain.


6.2.4 Object.create()

Object.create() creates a new object, using its first argument as the prototype of
that object:

*/

let o1 = Object.create({x: 1, y: 2}); // o1 inherits properties x and y.
o1.x + o1.y // => 3

/*
You can pass null to create a new object that does not have a prototype, but if you do
this, the newly created object will not inherit anything, not even basic methods like
toString() (which means it won’t work with the + operator either):
*/

let o2 = Object.create(null); // o2 inherits no props or methods.

/*
If you want to create an ordinary empty object (like the object returned by {} or new
Object()), pass Object.prototype:*/

let o3 = Object.create(Object.prototype); // o3 is like {} or new Object().

/*
One use for Object.create() is when you want to guard against unintended (but
nonmalicious) modification of an object by a library function that you don’t have
control over. Instead of passing the object directly to the function, you can pass an
object that inherits from it. If the function reads properties of that object, it will see
the inherited values. If it sets properties, however, those writes will not affect the original
object.*/

let o4 = { x: "don't change this value" };
library.function(Object.create(o4)); // Guard against accidental modifications


//6.3 Querying and Setting Properties

/*
To obtain the value of a property, use the dot (.) or square bracket ([]) operators.

The lefthand side should be an expression whose value is an object.

If using the dot operator, the righthand side must be a simple identifier that names
the property. If using square brackets, the value within the brackets must be an
expression that evaluates to a string that contains the desired property name:*/

let author = book.author; // Get the "author" property of the book.
let name = author.surname; // Get the "surname" property of the author.
let title = book["main title"]; // Get the "main title" property of the book.

/*
To create or set a property, use a dot or square brackets as you would to query the
property, but put them on the lefthand side of an assignment expression*/

book.edition = 7; // Create an "edition" property of book.
book["main title"] = "ECMAScript"; // Change the "main title" property.

/*

6.3.1 Objects As Associative Arrays

the following two JavaScript expressions have the same value:
    object.property
    object["property"]

The first syntax, using the dot and an identifier, is like the syntax used to access a
static field of a struct or object in C or Java. The second syntax, using square brackets
and a string, looks like array access, but to an array indexed by strings rather than by
numbers. is kind of array is known as an associative array. 

In C, C++, Java, and similar strongly typed languages, an object can have only a fixed
number of properties, and the names of these properties must be defined in advance.

Since JavaScript is a loosely typed language, this rule does not apply: a program can
create any number of properties in any object. When you use the . operator to access
a property of an object, however, the name of the property is expressed as an identifier.

Identifiers must be typed literally into your JavaScript program; they are not a
datatype, so they cannot be manipulated by the program.

On the other hand, when you access a property of an object with the [] array notation,
the name of the property is expressed as a string. Strings are JavaScript datatypes,
so they can be manipulated and created while a program is running. So, for
example, you can write the following code in JavaScript:*/

let addr = "";
for(let i = 0; i < 4; i++) 
    addr += customer[`address${i}`] + "\n";

/*
This code could be rewritten using the dot notation, but there are cases in which only 
the array notation will do. Suppose, for example, that you are writing a program that 
uses network resources to compute the current value of the user’s stock market investments. 
The program allows the user to type in the name of each stock they own as well as the number 
of shares of each stock. You might use an object named portfolio to hold this information. 
The object has one property for each stock. The name of the property is the name of the stock, and
the property value is the number of shares of that stock.

Part of this program might be a function for adding a new stock to the portfolio:
*/

function addstock(portfolio, stockname, shares) {
    portfolio[stockname] = shares;
}

/*
Since the user enters stock names at runtime, there is no way that you can know the
property names ahead of time. Since you can’t know the property names when you
write the program, there is no way you can use the . operator to access the properties
of the portfolio object. You can use the [] operator, however, because it uses a string
value (which is dynamic and can change at runtime) rather than an identifier (which
is static and must be hardcoded in the program) to name the property.

The power of this JavaScript statement becomes clear when you consider its use with
associative arrays. Here is how you would use it when computing the total value of a
portfolio:
*/

function computeValue(portfolio) {
    let total = 0.0;
    for(let stock in portfolio) { // For each stock in the portfolio:
        let shares = portfolio[stock]; // get the number of shares
        let price = getQuote(stock); // look up share price
        total += shares * price; // add stock value to total value
    }
    return total; // Return total value.
}


//6.3.2 Inheritance

/*
JavaScript objects have a set of “own properties,” and they also inherit a set of properties
from their prototype object.

Suppose you query the property x in the object o. If o does not have an own property
with that name, the prototype object of o is queried for the property x. If the prototype
object does not have an own property by that name, but has a prototype itself,
the query is performed on the prototype of the prototype. This continues until the
property x is found or until an object with a null prototype is searched.

As you can see, the prototype attribute of an object creates a chain or linked list from which
properties are inherited:*/

let unitcircle = { r: 1 }; // An object to inherit from

let c = Object.create(unitcircle); // c inherits the property r
c.x = 1; c.y = 1; // c defines two properties of its own
c.r = 2; // c overrides its inherited property

unitcircle.r // => 1: the prototype is not affected


//6.3.3 Property Access Errors

/*
It is not an error to query a property that does not exist. If the property x is not found
as an own property or an inherited property of o, the property access expression o.x
evaluates to undefined.
*/

book.subtitle // => undefined: property doesn't exist

/*

It is an error, however, to attempt to query a property of an object that does not exist.
The null and undefined values have no properties, and it is an error to query properties
of these values.
*/

let len = book.subtitle.length; // !TypeError: undefined doesn't have length

/*
Property access expressions will fail if the lefthand side of the . is null or undefined.

So when writing an expression like book.author.surname, you should be careful if
you are not certain that book and book.author are actually defined.
Here are two ways to guard against this kind of problem:*/

// A verbose and explicit technique
let surname = undefined;
if (book) {
    if (book.author) {
        surname = book.author.surname;
    }
}

// A concise and idiomatic alternative to get surname or null or undefined
surname = book && book.author && book.author.surname;

/*
ES2020 supports conditional property access with ?., which allows us to rewrite
 the previous assignment expression as:*/

let surname1 = book?.author?.surname;

/*
An attempt to set a property p of an object o fails in these circumstances:

- o has an own property p that is read-only: it is not possible to set read-only
properties.
- o has an inherited property p that is read-only: it is not possible to hide an inherited
read-only property with an own property of the same name.
- o does not have an own property p; o does not inherit a property p with a setter
method, and o’s extensible attribute (see §14.2) is false.
*/

//6.4 Deleting Properties

/*
The delete operator (§4.13.4) removes a property from an object. Its single operand
should be a property access expression. Surprisingly, delete does not operate on the
value of the property but on the property itself.
*/

delete book.author; // The book object now has no author property.
delete book["main title"]; // Now it doesn't have "main title", either.

/*
The delete operator only deletes own properties, not inherited ones.

A delete expression evaluates to true if the delete succeeded or if the delete had no
effect (such as deleting a nonexistent property). delete also evaluates to true when
used (meaninglessly) with an expression that is not a property access expression.
*/

let o5 = {x: 1}; // o has own property x and inherits property toString
delete o5.x // => true: deletes property x
delete o5.x // => true: does nothing (x doesn't exist) but true anyway
delete o5.toString // => true: does nothing (toString isn't an own property)
delete 1 // => true: nonsense, but true anyway

/*
delete does not remove properties that have a configurable attribute of false.

6.5 Testing Properties

JavaScript objects can be thought of as sets of properties, and it is often useful to be
able to test for membership in the set—to check whether an object has a property
with a given name. You can do this with the in operator, with the hasOwnProperty()
and propertyIsEnumerable() methods, or simply by querying the property. The
examples shown here all use strings as property names, but they also work with Symbols

The in operator expects a property name on its left side and an object on its right. It
returns true if the object has an own property or an inherited property by that name*/

let o6 = { x: 1 };

"x" in o6 // => true: o has an own property "x"
"y" in o6 // => false: o doesn't have a property "y"
"toString" in o6 // => true: o inherits a toString property

/*
The hasOwnProperty() method of an object tests whether that object has an own
property with the given name. It returns false for inherited properties:
*/

let o7 = { x: 1 };

o7.hasOwnProperty("x") // => true: o has an own property x
o7.hasOwnProperty("y") // => false: o doesn't have a property y
o7.hasOwnProperty("toString") // => false: toString is an inherited property

/*
The propertyIsEnumerable() refines the hasOwnProperty() test. It returns true
only if the named property is an own property and its enumerable attribute is true.

Certain built-in properties are not enumerable. Properties created by normal Java‐
Script code are enumerable unless you’ve used one of the techniques to make them 
non-enumerable.*/

let o8 = { x: 1 };
o8.propertyIsEnumerable("x") // => true: o has an own enumerable property x
o8.propertyIsEnumerable("toString") // => false: not an own property
Object.prototype.propertyIsEnumerable("toString") // => false: not enumerable

/*
Instead of using the in operator, it is often sufficient to simply query the property and
use !== to make sure it is not undefined:
*/

let o9 = { x: 1 };

o9.x !== undefined // => true: o has a property x
o9.y !== undefined // => false: o doesn't have a property y
o9.toString !== undefined // => true: o inherits a toString property

//6.6 Enumerating Properties

/*
we sometimes want to iterate through or obtain a list of all the properties of an object.
The for/in loop runs the body of the loop once for each enumerable property (own or inherited) 
of the specified object, assigning the name of the property to the loop variable.
Built-in methods that objects inherit are not enumerable, but the properties that your 
code adds to objects are enumerable by default.
*/

let o10 = {x: 1, y: 2, z: 3}; // Three enumerable own properties
o10.propertyIsEnumerable("toString") // => false: not enumerable

for(let p in o) // Loop through the properties
    console.log(p); // Prints x, y, and z, but not toString

/*
To guard against enumerating inherited properties with for/in, you can add an
explicit check inside the loop body:*/

for(let p in o) 
    if (!o.hasOwnProperty(p)) continue; // Skip inherited properties

for(let p in o) 
    if (typeof o[p] === "function") continue; // Skip all methods

/*
As an alternative to using a for/in loop, it is often easier to get an array of property
names for an object and then loop through that array with a for/of loop.

- Object.keys() returns an array of the names of the enumerable own properties
of an object.
- Object.getOwnPropertyNames() works like Object.keys() but returns an array
of the names of non-enumerable own properties as well, as long as their names
are strings.  
- Object.getOwnPropertySymbols() returns own properties whose names are
Symbols, whether or not they are enumerable.
- Reflect.ownKeys() returns all own property names, both enumerable and nonenumerable,
and both string and Symbol

6.6.1 Property Enumeration Order

ES6 formally defines the order in which the own properties of an object are enumerated.

Object.keys(), Object.getOwnPropertyNames(), Object.getOwnPropertySymbols(), 
Reflect.ownKeys(), and related methods such as JSON.stringify() all list
properties in the following order:

- String properties whose names are non-negative integers are listed first, in
numeric order from smallest to largest. This rule means that arrays and array-like
objects will have their properties enumerated in order.     
- After all properties that look like array indexes are listed, all remaining properties
with string names are listed. These properties are listed in the order in which they
were added to the object.
- Finally, the properties whose names are Symbol objects are listed in the order in
which they were added to the object.

The enumeration order for the for/in loop is not as tightly specified as it is for these
enumeration functions, but implementations typically enumerate own properties in
the order just described, then travel up the prototype chain enumerating properties in
the same order for each prototype object.


//6.7 Extending Objects

A common operation in JavaScript programs is needing to copy the properties of one
object to another object. It is easy to do that with code like this:
*/

let target = {x: 1}, source = {y: 2, z: 3};
for(let key of Object.keys(source)) 
    target[key] = source[key];

target // => {x: 1, y: 2, z: 3}

/*
But because this is a common operation, various JavaScript frameworks have defined
utility functions, often named extend(), to perform this copying operation. Finally,
in ES6, this ability comes to the core JavaScript language in the form of
Object.assign().

Object.assign() expects two or more objects as its arguments. It modifies and
returns the first argument, which is the target object, but does not alter the second or
any subsequent arguments, which are the source objects. For each source object, it
copies the enumerable own properties of that object (including those whose names
are Symbols) into the target object. It processes the source objects in argument list
order so that properties in the first source object override properties by the same
name in the target object and properties in the second source object (if there is one)
override properties with the same name in the first source object.

Object.assign() copies properties with ordinary property get and set operations, so
if a source object has a getter method or the target object has a setter method, they
will be invoked during the copy, but they will not themselves be copied.

One reason to assign properties from one object into another is when you have an
object that defines default values for many properties and you want to copy those
default properties into another object if a property by that name does not already
exist in that object. Using Object.assign() naively will not do what you want:
*/

Object.assign(o, defaults); // overwrites everything in o with defaults

/*
Instead, what you can do is to create a new object, copy the defaults into it, and then
override those defaults with the properties in o:*/

o = Object.assign({}, defaults, o);

/*
We’ll see that you can also express this object copy-and-override operation using 
the ... spread operator like this:*/

o = {...defaults, ...o};

/*
We could also avoid the overhead of the extra object creation and copying by writing
a version of Object.assign() that copies properties only if they are missing
*/

// Like Object.assign() but doesn't override existing properties
// (and also doesn't handle Symbol properties)
function merge(target, ...sources) {
    for(let source of sources) {
        for(let key of Object.keys(source)) {
            if (!(key in target)) { // This is different than Object.assign()
                target[key] = source[key];
            }
        }
    }
    return target;
}

Object.assign({x: 1}, {x: 2, y: 2}, {y: 3, z: 4}) // => {x: 2, y: 3, z: 4}
merge({x: 1}, {x: 2, y: 2}, {y: 3, z: 4}) // => {x: 1, y: 2, z: 4}
 
/*
A restrict() function could delete properties of an object if they do not
appear in another template object, for example. Or a subtract() function could
remove all of the properties of one object from another object.
*/

//6.8 Serializing Objects

/*
Object serialization is the process of converting an object’s state to a string from
which it can later be restored. The functions JSON.stringify() and JSON.parse()
serialize and restore JavaScript objects. These functions use the JSON data interchange
format.
*/

let o11 = {x: 1, y: {z: [false, null, ""]}}; // Define a test object
let s = JSON.stringify(o11); // s == '{"x":1,"y":{"z":[false,null,""]}}'
let p = JSON.parse(s); // p == {x: 1, y: {z: [false, null, ""]}}

/*
JSON syntax is a subset of JavaScript syntax, and it cannot represent all JavaScript values.

Objects, arrays, strings, finite numbers, true, false, and null are supported and
can be serialized and restored.

NaN, Infinity, and -Infinity are serialized to null.

Date objects are serialized to ISO-formatted date strings (((see the Date.toJSON())) but JSON.parse() leaves these in 
string form and does not restore the original Date object.

Function, RegExp, and Error objects and the undefined value cannot serialized or restored.

JSON.stringify() serializes only the enumerable own properties of an object. If a property 
value cannot be serialized, that property is simply omitted from the stringified output.


6.9 Object Methods


As discussed earlier, all JavaScript objects inherit properties from Object.prototype. These 
inherited properties are primarily methods, and because they are universally available, they are of particular
interest to JavaScript programmers. 

We’ve already seen the hasOwnProperty() and propertyIsEnumerable() methods.

And we’ve also already covered suite a few static functions defined on the Object constructor,
 such as Object.create() and Object.keys().)

This section explains a handful of universal object methods that are defined on Object.prototype.


6.9.1 The toString() Method

The toString() method takes no arguments; it returns a string that somehow represents
the value of the object on which it is invoked, JavaScript invokes this method of
an object whenever it needs to convert the object to a string.

This occurs, for example, when you use the + operator to concatenate a string with an 
object or when you pass an object to a method that expects a string.

The default toString() method is not very informative

let s = { x: 1, y: 1 }.toString(); // s == "[object Object]"

Because this default method does not display much useful information, many classes
define their own versions of toString().

You might define your own toString() method like this:
*/

let point2 = {
    x: 1,
    y: 2,
    toString: function() { return `(${x}, ${y})`; }
};

String(point2) // => "(1, 2)": toString() is used for string conversions


//6.9.2 The toLocaleString() Method

/*

objects all have a toLocaleString().  
The purpose of this method is to return a localized string representation of the object.

The default toLocaleString() method defined by Object doesn’t do any localization
itself: it simply calls toString() and returns that value.

The Date and Number classes define customized versions of toLocaleString() that attempt
to format numbers, dates, and times according to local conventions.

Array defines a toLocaleString()
method that works like toString() except that it formats array elements by calling
their toLocaleString() methods instead of their toString() methods.
*/

let point3 = {
    x: 1000,
    y: 2000,
    toString: function() { 
        return `(${this.x}, ${this.y})`; 
    },
    toLocaleString: function() {
        return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`;
    }
};

point3.toString() // => "(1000, 2000)"
point3.toLocaleString() // => "(1,000, 2,000)": note thousands separators

/*
The internationalization classes can be useful when implementing
a toLocaleString() method.*/


//6.9.3 The valueOf() Method

/*
The valueOf() method is much like the toString() method, but it is called when
JavaScript needs to convert an object to some primitive type other than a string,
typically, a number.
JavaScript calls this method automatically if an object is used in a
context where a primitive value is required.
The default valueOf() method does nothing interesting, but some of the 
built-in classes define their own valueOf() method.

The Date class defines valueOf() to convert dates to numbers, and this
allows Date objects to be chronologically compared with < and >.

You could do something similar with a point object, defining a valueOf() method 
that returns the distance from the origin to the point:
*/

let point1 = {
    x: 3,
    y: 4,
    valueOf: function() { return Math.hypot(this.x, this.y); }
};

Number(point) // => 5: valueOf() is used for conversions to numbers

point > 4 // => true
point > 5 // => false
point < 6 // => true

//6.9.4 The toJSON() Method

/*
Object.prototype does not actually define a toJSON() method but the JSON.stringify() 
method looks for a toJSON() method on any object it is asked to serialize.

If this method exists on the object to be serialized, it is invoked, and the
return value is serialized, instead of the original object
*/

let point4 = {
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; },
    toJSON: function() { return this.toString(); }
};

JSON.stringify([point4]) // => '["(1, 2)"]'


//6.10 Extended Object Literal Syntax

/*
6.10.1 Shorthand Properties

Suppose you have values stored in variables x and y and want to create an object with
properties named x and y that hold those values*/

let x = 1, y = 2;
let o12 = {
    x: x,
    y: y
};

/*
You can drop the colon and one copy of the identifier and end up with much simpler code:*/

let x1 = 1, y1 = 2;
let o13 = { x1, y1 };
o13.x1 + o13.y1 // => 3

/*

6.10.2 Computed Property Names

Sometimes you need to create an object with a specific property, but the name of that
property is not a compile-time constant that you can type literally in your source
code. Instead, the property name you need is stored in a variable or is the return
value of a function that you invoke. You can’t use a basic object literal for this kind of
property. Instead, you have to create an object and then add the desired properties as
an extra step:
*/

const   PROPERTY_NAME = "p1";
let     PROPERTY_NAME_VAR = "p1";

function computePropertyName() { return "p" + 2; }

let o15 = {};

o15[PROPERTY_NAME] = 1;
o15[PROPERTY_NAME_VAR] = 3;
o15[computePropertyName()] = 2;

//It is much simpler to set up an object like this with an ES6 feature known as computed properties

let p1 = {
    [PROPERTY_NAME]: 1,
    [computePropertyName()]: 2
};
p1.p1 + p1.p2 // => 3

/*
That expression is evaluated, and the resulting value (converted to a string, if necessary)
is used as the property name*/


//6.10.3 Symbols as Property Names

/*
In ES6 and later, property names can be strings or symbols. 

If you assign a symbol to a variable or constant, then you can use that symbol 
as a property name using the computed property syntax:
*/

const extension = Symbol("my extension symbol");
let o14 = {
    [extension]: { /* extension data stored in this object */ }
};

o14[extension].x = 0; // This won't conflict with other properties of o14

/*
Symbols are opaque values. You can’t do anything with them other than use them 
as property names.Every Symbol is different from every other Symbol, however, 
which means that Symbols are good for creating unique property names.

Create a new Symbol by calling the Symbol() factory function.
(Symbols are primitive values, not objects, so Symbol() is not a constructor function 
that you invoke with new.) The value returned by Symbol() is not equal to any other Symbol 
or other value. You can pass a string to Symbol(), and this string is used when your
Symbol is converted to a string. But this is a debugging aid only: two Symbols created
with the same string argument are still different from one another.

The point of Symbols is not security, but to define a safe extension mechanism for
JavaScript objects. If you get an object from third-party code that you do not control
and need to add some of your own properties to that object but want to be sure that
your properties will not conflict with any properties that may already exist on the
object, you can safely use Symbols as your property names. If you do this, you can
also be confident that the third-party code will not accidentally alter your symbolically
named properties.*/


// 6.10.4 Spread Operator

/*
In ES2018 and later, you can copy the properties of an existing object into a new
object using the “spread operator” ... inside an object literal*/

let position = { x: 0, y: 0 };
let dimensions = { width: 100, height: 75 };

let rect = { ...position, ...dimensions };

rect.x + rect.y + rect.width + rect.height // => 175

/*
In this code, the properties of the position and dimensions objects are “spread out”
into the rect object literal as if they had been written literally inside those curly
braces. 

If the object that is spread and the object it is being spread into both have a property
with the same name, then the value of that property will be the one that comes last:*/

let k = { x: 1 };
let l = { x: 0, ...k };
l.x // => 1: the value from object k overrides the initial value

let q = { ...k, x: 2 };
q.x // => 2: the value 2 overrides the previous value from k.

/*
Also note that the spread operator only spreads the own properties of an object, not
any inherited ones:*/

let o22 = Object.create({x: 1}); // o22 inherits the property x

let p22 = { ...o221 };

p22.x // => undefined


//6.10.5 Shorthand Methods

/*
When a function is defined as a property of an object, we call that function a method. 
Prior to ES6, you would define a method in an object literal using a function definition 
expression just as you would define any other property of an object:
*/

let square = {
    area: function() { return this.side * this.side; },
    side: 10
};

square.area() // => 100

/*
In ES6, however, the object literal syntax  has been extended to allow a shortcut 
where the function keyword and  the colon are omitted, resulting in code like this:*/

square = {
    area() { return this.side * this.side; },
    side: 10
};

square.area() // => 100

/*
Both forms of the code are equivalent.

When you write a method using this shorthand syntax, the property name can take
any of the forms that are legal in an object literal. You can also use string literals 
and computed property names, which can include Symbol property names:*/

const METHOD_NAME = "m";
const symbol = Symbol();

let weirdMethods = {
    "method With Spaces"(x) { return x + 1; },
    [METHOD_NAME](x) { return x + 2; },
    [symbol](x) { return x + 3; }
};

weirdMethods["method With Spaces"](1) // => 2
weirdMethods[METHOD_NAME](1) // => 3
weirdMethods[symbol](1) // => 4


//6.10.6 Property Getters and Setters

/*
All of the object properties we’ve discussed so far in this chapter have been data
 properties with a name and an ordinary value. JavaScript also supports accessor properties,
which do not have a single value but instead have one or two accessor methods: a getter 
and/or a setter.

When a program queries the value of an accessor property, JavaScript invokes the getter
method (passing no arguments). The return value of this method becomes the
value of the property access expression. When a program sets the value of an accessor
property, JavaScript invokes the setter method, passing the value of the righthand side
of the assignment. This method is responsible for “setting,” in some sense, the property
value. The return value of the setter method is ignored.

If a property has both a getter and a setter method, it is a read/write property. If it has
only a getter method, it is a read-only property. And if it has only a setter method, it
is a write-only property (something that is not possible with data properties), and
attempts to read it always evaluate to undefined.*/

let obj = {
    // An ordinary data property
    dataProp: value,

    // An accessor property defined as a pair of functions.
    get accessorProp() { return this.dataProp; },
    set accessorProp(value) { this.dataProp = value; }
    };

/*
Accessor properties are defined as one or two methods whose name is the same as the
property name. These look like ordinary methods defined using the ES6 shorthand
except that getter and setter definitions are prefixed with get or set.

The accessor methods defined above simply get and set the value of a data property,
and there is no reason to prefer the accessor property over the data property.

But as a
more interesting example, consider the following object that represents a 2D Cartesian
point. It has ordinary data properties to represent the x and y coordinates of the
point, and it has accessor properties that give the equivalent polar coordinates of the
point:*/

let po = {
    // x and y are regular read-write data properties.
    x: 1.0,
    y: 1.0,
    // r is a read-write accessor property with getter and setter.
    // Don't forget to put a comma after accessor methods.
    get r() { return Math.hypot(this.x, this.y); },
    set r(newvalue) {
        let oldvalue = Math.hypot(this.x, this.y);
        let ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    
    // theta is a read-only accessor property with getter only.
    get theta() { return Math.atan2(this.y, this.x); }
};

/*
Accessor properties are inherited, just as data properties are, so you can use the object
po defined above as a prototype for other points. You can give the new objects their
own x and y properties, and they’ll inherit the r and theta properties*/

let q1 = Object.create(po); // A new object that inherits getters and setters
q1.x = 3; q1.y = 4; // Create q's own data properties
q1.r // => 5: the inherited accessor properties work
q1.theta // => Math.atan2(4, 3)