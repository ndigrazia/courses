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

/*
Writing tests is an important part of any nontrivial programming project. Dynamic
languages like JavaScript support testing frameworks that dramatically reduce the
effort required to write tests, and almost make test writing fun! There are a lot of test
tools and libraries for JavaScript, and many are written in a modular way so that it is
possible to pick one library as your test runner, another library for assertions, and a
third for mocking. In this section, however, we’ll describe Jest, which is a popular
framework that includes everything you need in a single package.

Suppose you’ve written the following function:

*/

const getJSON = require("./getJSON.js");

/**
* getTemperature() takes the name of a city as its input, and returns
* a Promise that will resolve to the current temperature of that city,
* in degrees Fahrenheit. It relies on a (fake) web service that returns
* world temperatures in degrees Celsius.
*/
module.exports = async function getTemperature(city) {
    // Get the temperature in Celsius from the web service
    let c = await getJSON(`https://globaltemps.example.com/api/city/${city.toLowerCase()}`);
    return (c * 5 / 9) + 32; // TODO: double-check this formula
};

/*
A good set of tests for this function might verify that getTemperature() is fetching
the right URL, and that it is converting temperature scales correctly

We can do this with a Jest-based test like the following. This code defines a mock implementation of
getJSON() so that the test does not actually make a network request. And because
getTemperature() is an async function, the tests are async as well—it can be tricky to
test asynchronous functions, but Jest makes it relatively easy:*/

// Import the function we are going to test
const getTemperature = require("./getTemperature.js");

// And mock the getJSON() module that getTemperature() depends on
jest.mock("./getJSON");
const getJSON = require("./getJSON.js");

// Tell the mock getJSON() function to return an already resolved Promise
// with fulfillment value 0.
getJSON.mockResolvedValue(0);

// Our set of tests for getTemperature() begins here
describe("getTemperature()", () => {
    // This is the first test. We're ensuring that getTemperature() calls
    // getJSON() with the URL that we expect
    test("Invokes the correct API", async () => {
        let expectedURL = "https://globaltemps.example.com/api/city/vancouver";
        let t = await(getTemperature("Vancouver"));
        // Jest mocks remember how they were called, and we can check that.
        expect(getJSON).toHaveBeenCalledWith(expectedURL);
    });

    // This second test verifies that getTemperature() converts
    // Celsius to Fahrenheit correctly
    test("Converts C to F correctly", async () => {
        getJSON.mockResolvedValue(0); // If getJSON returns 0C
        expect(await getTemperature("x")).toBe(32); // We expect 32F
    
        // 100C should convert to 212F
        getJSON.mockResolvedValue(100); // If getJSON returns 100C
        expect(await getTemperature("x")).toBe(212); // We expect 212F
    });
});

/*
With the test written, we can use the jest command to run it, and we discover that
one of our tests fails:


jest getTemperature
FAIL ch17/getTemperature.test.js
getTemperature()
    ✓ Invokes the correct API (4ms)
    ✕ Converts C to F correctly (3ms)

● getTemperature() › Converts C to F correctly
    expect(received).toBe(expected) // Object.is equality
    Expected: 212
    Received: 87.55555555555556

    29 | // 100C should convert to 212F
    30 | getJSON.mockResolvedValue(100); // If getJSON returns 100C
  > 31 | expect(await getTemperature("x")).toBe(212); // Expect 212F
       |                                    ^
    32 | });
    33 | });
    34 |
    at Object.<anonymous> (ch17/getTemperature.test.js:31:43)

    Test Suites: 1 failed, 1 total
    Tests: 1 failed, 1 passed, 2 total
    Snapshots: 0 total
    Time: 1.403s
    Ran all test suites matching /getTemperature/i.

Our getTemperature() implementation is using the wrong formula for converting C
to F. It multiplies by 5 and divides by 9 rather than multiplying by 9 and dividing by
5. If we fix the code and run Jest again, we can see the tests pass.

And, as a bonus, if we add the --coverage argument when we invoke jest, it will compute and display
the code coverage for our tests:

$ jest --coverage getTemperature
PASS ch17/getTemperature.test.js
getTemperature()
✓ Invokes the correct API (3ms)
✓ Converts C to F correctly (1ms)
------------------|--------|---------|---------|---------|------------------|
File | % Stmts| % Branch| % Funcs| % Lines| Uncovered Line #s|
------------------|--------|---------|---------|---------|------------------|
        All files | 71.43| 100| 33.33| 83.33| |
       getJSON.js | 33.33| 100| 0| 50| 2|
 getTemperature.js| 100| 100| 100| 100| |
------------------|--------|---------|---------|---------|------------------|
Test Suites: 1 passed, 1 total
Tests: 2 passed, 2 total
Snapshots: 0 total
Time: 1.508s

Running our test gave us 100% code coverage for the module we were testing, which
is exactly what we wanted. It only gave us partial coverage of getJSON(), but we
mocked that module and were not trying to test it, so that is expected


//17.4 Package Management with npm