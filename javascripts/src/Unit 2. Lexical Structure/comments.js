//2.2 Comments

// This is a single-line comment.

/* This is also a comment */ // and here is another comment.
/*
* This is a multi-line comment. The extra * characters at the start of
* each line are not a required part of the syntax; they just look cool!
*/


//2.3 Literals
//A literal is a data value that appears directly in a program.

12 // The number twelve
1.2 // The number one point two
"hello world" // A string of text
'Hi' // Another string
true // A Boolean value
false // The other Boolean value
null // Absence of an object


//2.4 Identifiers and Reserved Words
/*
An identifier is simply a name. In JavaScript, identifiers are used to name constants,
variables, properties, functions, and classes and to provide labels for certain loops in
JavaScript code.

A JavaScript identifier must begin with a letter, an underscore (_), or
a dollar sign ($). Subsequent characters can be letters, digits, underscores, or dollar
signs.
*/


//2.4.1 Reserved Words

/*
The following words are part of the JavaScript language. Many of these are reserved keywords that must not be used as the names of constants,
variables, functions, or classes.
*/


//2.5 Unicode
/*JavaScript programs are written using the Unicode character set, and you can use any
Unicode characters in strings and comments.

For portability and ease of editing, it is common to use only ASCII letters and digits in identifiers
*/

//2.5.1 Unicode Escape Sequences
/*
Some computer hardware and software cannot display, input, or correctly process the
full set of Unicode characters. To support programmers and systems using older technology,
JavaScript defines escape sequences that allow us to write Unicode characters
using only ASCII characters.

These Unicode escapes begin with the characters \u and are either followed by exactly four hexadecimal digits (using uppercase or lowercase
letters A–F) or by one to six hexadecimal digits enclosed within curly braces.

The Unicode escape for the character “é,” for example, is \u00E9; here are three different ways to write a variable name that
includes this character:*/

let café = 1; // Define a variable using a Unicode character
caf\u00e9 // => 1; access the variable using an escape sequence
caf\u{E9} // => 1; another form of the same escape sequence
 console.log(caf\u{E9});
 console.log("\u{1F600}");


 //2.6 Optional Semicolons

/*
Like many programming languages, JavaScript uses the semicolon (;) to separate
statements (see Chapter 5) from one another
This is important for making the meaning of your code clear: without a separator, the end of one statement might appear to
be the beginning of the next, or vice versa

In JavaScript, you can usually omit thesemicolon between two statements if those statements are written on separate lines.

Many JavaScript programmers (and the code in
this book) use semicolons to explicitly mark the ends of statements, even where they
are not required.
*/