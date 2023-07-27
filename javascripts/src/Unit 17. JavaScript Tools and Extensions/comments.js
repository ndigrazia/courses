// JavaScript Tools and Extensions

/*
The tools and language extensions covered in this chapter are:

• ESLint for finding potential bugs and style problems in your code.
• Prettier for formatting your JavaScript code in a standardized way.
• Jest as an all-in-one solution for writing JavaScript unit tests.
• npm for managing and installing the software libraries that your program
    depends on.
• Code-bundling tools—like webpack, Rollup, and Parcel—that convert your modules
of JavaScript code into a single bundle for use on the web. 
• Babel for translating JavaScript code that uses brand-new language features (or
that uses language extensions) into JavaScript code that can run in current web
browsers.
• The JSX language extension (used by the React framework) that allows you to
describe user interfaces using JavaScript expressions that look like HTML
markup.
• The Flow language extension (or the similar TypeScript extension) that allows
you to annotate your JavaScript code with types and check your code for type
safety.

//17.1 Linting with ESLint

/*
In programming, the term lint refers to code that, while technically correct, is
unsightly, or a possible bug, or suboptimal in some way. A linter is a tool for detecting
lint in your code, and linting is the process of running a linter on your code. 

IMPORTANT: The most commonly used linter for JavaScript today is ESLint. If you run it and then
take the time to actually fix the issues it points out, it will make your code cleaner and
less likely to have bug. Consider the following code:
*/

var x = 'unused';

export function factorial(x) {
    if (x == 1) {
        return 1;
    } else {
        return x * factorial(x-1)
    }
}

//If you run ESLint on this code, you might get output like this:

eslint code/ch17/linty.js

/*
code/ch17/linty.js
    1:1 error Unexpected var, use let or const instead no-var
    1:5 error 'x' is assigned a value but never used no-unused-vars
    1:9 warning Strings must use doublequote quotes
    4:11 error Expected '===' and instead saw '==' eqeqeq
    5:1 error Expected indentation of 8 spaces but found 6 indent
    7:28 error Missing semicolon semi

    ✖ 6 problems (5 errors, 1 warning)
    3 errors and 1 warning potentially fixable with the `--fix` option.
    Linters

Linters can seem nitpicky sometimes.Does it really matter whether we used double
quotes or single quotes for our strings? On the other hand, getting indentation right
is important for readability and using === and let instead of == and var protects you
from subtle bugs.

ESLint defines many linting rules and has an ecosystem of plug-ins that add many
more. But ESLint is fully configurable, and you can define a configuration file that
tunes ESLint to enforce exactly the rules you want and only those rules.
*/

//17.2 JavaScript Formatting with Prettier

/*
One of the reasons that some projects use linters is to enforce a consistent coding
style so that when a team of programmers is working on a shared codebase, they use
compatible code conventions. This includes code indentation rules, but can also
include things like what kind of quotation marks are preferred and whether there
should be a space between the for keyword and the open parenthesis that follows it.

A modern alternative to enforcing code formatting rules via a linter is to adopt a tool
like Prettier to automatically parse and reformat all of your code.

Suppose you have written the following function:
*/

function factorial(x)
{
    if(x===1){return 1}
    else{return x*factorial(x-1)}
}

/*
Running Prettier on this code fixes the indentation, adds missing semicolons, adds
spaces around binary operators and inserts line breaks after { and before }, resulting
in much more conventional-looking code:*/

$ prettier factorial.js

function factorial(x) {
    if (x === 1) {
        return 1;
    } else {
        return x * factorial(x - 1);
    }
}

/*
If you invoke Prettier with the --write option, it will simply reformat the specified
file in place rather than printing a reformatted version. If you use git to manage your
source code, you can invoke Prettier with the --write option in a commit hook so
that code is automatically formatted before being checked in

Prettier is particularly powerful if you configure your code editor to run it automatically
every time you save a file. I find it liberating to write sloppy code and see it fixed
automatically for me.

Prettier is configurable, but it only has a few options. You can select the maximum
line length, the indentation amount, whether semicolons should be used, whether
strings should be single- or double-quoted, and a few other things.
In general, Prettier’s default options are quite reasonable. The idea is that you just adopt 
Prettier for your project and then never have to think about code formatting again.*/

//17.3 Unit Testing with Jest


