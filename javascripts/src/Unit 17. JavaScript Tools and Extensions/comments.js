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

In modern software development, it is common for any nontrivial program that you
write to depend on third-party software libraries. If you’re writing a web server in
Node, for example, you might be using the Express framework. And if you’re creating
a user interface to be displayed in a web browser, you might use a frontend framework
like React or LitElement or Angular. A package manager makes it easy to find
and install third-party packages like these. Just as importantly, a package manager
keeps track of what packages your code depends on and saves this information into a
file so that when someone else wants to try your program, they can download your
code and your list of dependencies, then use their own package manager to install all
the third-party packages that your code needs. 

npm is the package manager that is bundled with Node. It is just as useful for client-side 
JavaScript programming as it is for server side programming with Node, however.

If you are trying out someone else’s JavaScript project, then one of the first things you
will often do after downloading their code is to type npm install. This reads the
dependencies listed in the package.json file and downloads the third-party packages
that the project needs and saves them in a node_modules/ directory.

You can also type npm install <package-name> to install a particular package to
your project’s node_modules/ directory

$ npm install express

In addition to installing the named package, npm also makes a record of the dependency
in the package.json file for the project. Recording dependencies in this way is
what allows others to install those dependencies simply by typing npm install.

IMPORTANT: The other kind of dependency is on developer tools that are needed by developers
who want to work on your project, but aren’t actually needed to run the code.

If a
project uses Prettier, for example, to ensure that all of its code is consistently formatted,
then Prettier is a “dev dependency,” and you can install and record one of these
with --save-dev:

$ npm install --save-dev prettier

Sometimes you might want to install developer tools globally so that they are accessible
anywhere even for code that is not part of a formal project with a package.json file
and a node_modules/ directory. For that you can use the -g (for global) option:

$ npm install -g eslint jest
    /usr/local/bin/eslint -> /usr/local/lib/node_modules/eslint/bin/eslint.js
    /usr/local/bin/jest -> /usr/local/lib/node_modules/jest/bin/jest.js
    + jest@24.9.0
    + eslint@6.7.2
    added 653 packages from 414 contributors in 25.596s

$ which eslint
/usr/local/bin/eslint

$ which jest
/usr/local/bin/jest

In addition to the “install” command, npm supports “uninstall” and “update” commands,
which do what their names say. npm also has an interesting “audit” command
that you can use to find and fix security vulnerabilities in your dependencies:

$ npm audit --fix
    === npm audit security report ===
    found 0 vulnerabilities
    in 876354 scanned packages

When you install a tool like ESLint locally for a project, the eslint script winds up in ./
node_modules/.bin/eslint, which makes the command awkward to run. Fortunately,
npm is bundled with a command known as “npx,” which you can use to run locally
installed tools with commands like npx eslint or npx jest. (And if you use npx to
invoke a tool that has not been installed yet, it will install it for you.)

The company behind npm also maintains the https://npmjs.com package repository, which holds 
hundreds of thousands of open source packages. But you don’t have to
use the npm package manager to access this repository of packages. Alternatives
include yarn and pnpm.

//17.5 Code Bundling

/*
If you are writing a large JavaScript program to run in web browsers, you will probably
want to use a code-bundling tool, especially if you use external libraries that are
delivered as modules. Web developers have been using ES6 modules (§10.3) for years,
since well before the import and export keywords were supported on the web. In
order to do this, programmers use a code-bundler tool that starts at the main entry
point (or entry points) of the program and follows the tree of import directives to
find all modules that the program depends on.It then combines all of those individual
module files into a single bundle of JavaScript code and rewrites the import and
export directives to make the code work in this new form. The result is a single file of
code that can be loaded into a web browser that does not support modules. 

ES6 modules are nearly universally supported by web browsers today, but web developers
still tend to use code bundlers, at least when releasing production code. Developers
find that user experience is best when a single medium-sized bundle of code is
loaded when a user first visits a website than when many small modules are loaded.

    Web performance is a notoriously tricky topic and there are lots of
    variables to consider, including ongoing improvements by browser
    vendors, so the only way to be sure of the fastest way to load your
    code is by testing thoroughly and measuring carefully.
    Keep in mind that there is one variable that is completely under your control:
    code size. Less JavaScript code will always load and run faster than more JavaScript code!

There are a number of good JavaScript bundler tools available. Commonly used bundlers
include webpack, Rollup and Parcel. e basic features of bundlers are more or
less the same, and they are differentiated based on how configurable they are or how
easy they are to use. 

Webpack has been around for a long time, has a large ecosystem
of plug-ins, is highly configurable, and can support older nonmodule libraries. But it
can also be complex and hard to configure- At the other end of the spectrum is Parcel
which is intended as a zero-configuration alternative that simply does the right thing.

In addition to performing basic bundling, bundler tools can also provide some additional
features:

• Some programs have more than one entry point. A web application with multiple
pages, for example, could be written with a different entry point for each page.
Bundlers generally allow you to create one bundle per entry point or to create a
single bundle that supports multiple entry points.

• Programs can use import() in its functional form (§10.3.6) instead of its static
form to dynamically load modules when they are actually needed rather than
statically loading them at program startup time. Doing this is often a good way to
improve the startup time for your program. Bundler tools that support import()
may be able to produce multiple output bundles: one to load at startup time, and
one or more that are loaded dynamically when needed.

• Bundlers can generally output a source map file that defines a mapping between
the lines of code in the bundle and the corresponding lines in the original source
files. This allows browser developer tools to automatically display JavaScript
errors at their original unbundled locations.

• Sometimes when you import a module into your program, you only use a few of
its features. A good bundler tool can analyze the code to determine which parts
are unused and can be omitted from the bundles This feature goes by the whimsical
name of “tree-shaking.”

• Bundlers typically have a plug-in–based architecture and support plug-ins that
allow importing and bundling “modules” that are not actually files of JavaScript
code. Suppose that your program includes a large JSON-compatible data structure
Code bundlers can be configured to allow you to move that data structure
into a separate JSON file and then import it into your program with a declaration
like import widgets from "./big-widget-list.json

• In a language like JavaScript that does not require compilation, running a bundler
tool feels like a compilation step, and it is frustrating to have to run a bundler
after every code edit before you can run the code in your browser. Bundlers
typically support filesystem watchers that detect edits to any files in a project
directory and automatically regenerate the necessary bundles.

• Some bundlers also support a “hot module replacement” mode for developers
where each time a bundle is regenerated, it is automatically loaded into the
browser.


//17.6 Transpilation with Babel

/*
Babel is a tool that compiles JavaScript written using modern language features into
JavaScript that does not use those modern language features. Because it compiles
JavaScript to JavaScript, Babel is sometimes called a “transpiler.” Babel was created so
that web developers could use the new language features of ES6 and later while still
targeting web browsers that only supported ES5.

Language features such as the ** exponentiation operator and arrow functions can be
transformed relatively easily into Math.pow() and function expressions. Other language
features, such as the class keyword, require much more complex transformations,
and, in general, the code output by Babel is not meant to be human readable

Like bundler tools, however, Babel can produce source maps that map transformed
code locations back to their original source locations.

Browser vendors are doing a better job of keeping up with the evolution of the Java‐
Script language, and there is much less need today to compile away arrow functions
and class declarations.

Like most of the other tools described in this chapter, you can install Babel with npm
and run it with npx. Babel reads a .babelrc configuration file that tells it how you
would like your JavaScript code transformed. Babel defines “presets” that you can
choose from depending on which language extensions you want to use and how
aggressively you want to transform standard language features. 

If you use Babel and a code-bundling tool, you may be able to set up the code bundler
to automatically run Babel on your JavaScript files as it builds the bundle for you. If
so, this can be a convenient option because it simplifies the process of producing
runnable code.

Webpack, for example, supports a “babel-loader” module that you can
install and configure to run Babel on each JavaScript module as it is bundled up.

Even though there is less need to transform the core JavaScript language today, Babel
is still commonly used to support nonstandard extensions to the language.

17.7 JSX: Markup Expressions in JavaScript




