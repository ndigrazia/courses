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

JSX is an extension to core JavaScript that uses HTML-style syntax to define a tree of
elements. JSX is most closely associated with the React framework for user interfaces
on the web. In React, the trees of elements defined with JSX are ultimately rendered
into a web browser as HTML. Even if you have no plans to use React yourself, its
popularity means that you are likely to see code that uses JSX. This section explains
what you need to know to make sense of of it.

You can think of a JSX element as a new type of JavaScript expression syntax. Java‐
Script string literals are delimited with quotation marks, and regular expression literals
are delimited with slashes.In the same way, JSX expression literals are delimited
with angle brackets. Here is a very simple one:

let line = <hr/>;

If you use JSX, you will need to use Babel (or a similar tool) to compile JSX expressions
into regular JavaScript. The transformation is simple enough that some developers
choose to use React without using JSX. Babel transforms the JSX expression in
this assignment statement into a simple function call:

let line = React.createElement("hr", null);

JSX syntax is HTML-like, and like HTML elements, React elements can have
attributes like these:

let image = <img src="logo.png" alt="The JSX logo" hidden/>;

When an element has one or more attributes, they become properties of an object
passed as the second argument to createElement():

let image = React.createElement("img", {
    src: "logo.png",
    alt: "The JSX logo",
    hidden: true
});

Like HTML elements, JSX elements can have strings and other elements as children.
Just as JavaScript’s arithmetic operators can be used to write arithmetic expressions of
arbitrary complexity, JSX elements can also be nested arbitrarily deeply to create trees
of elements:

let sidebar = (
    <div className="sidebar">
        <h1>Title</h1>
        <hr/>
        <p>This is the sidebar content</p>
    </div>
);

Regular JavaScript function call expressions can also be nested arbitrarily deeply, and
these nested JSX expressions translate into a set of nested createElement() calls.
When an JSX element has children, those children (which are typically strings and
other JSX elements) are passed as the third and subsequent arguments:

let sidebar = React.createElement(
    "div", { className: "sidebar"}, // This outer call creates a <div>
    React.createElement("h1", null, // This is the first child of the <div/>
         "Title"), // and its own first child.
    React.createElement("hr", null), // The second child of the <div/>.
    React.createElement("p", null, // And the third child.
        "This is the sidebar content")
);

The value returned by React.createElement() is an ordinary JavaScript object that
is used by React to render output in a browser window. 

It is worth noting that you can configure Babel to compile JSX elements to invocations 
of a different function, so if you think that JSX syntax would be a useful way to express 
other kinds of nested data structures, you can adopt it for your own non-React uses.

An important feature of JSX syntax is that you can embed regular JavaScript expressions
within JSX expressions. Within a JSX expression, text within curly braces is
interpreted as plain JavaScript. These nested expressions are allowed as attribute values
and as child elements. For example:

function sidebar(className, title, content, drawLine=true) {
    return (
            <div className={className}>
                <h1>{title}</h1>
                { drawLine && <hr/> }
                <p>{content}</p>
            </div>
        );
}

The sidebar() function returns a JSX element. It takes four arguments that it uses
within the JSX element. The curly brace syntax may remind you of template literals
that use ${} to include JavaScript expressions within strings. Since we know that JSX
expressions compile into function invocations, it should not be surprising that arbitrary
JavaScript expressions can be included because function invocations can be
written with arbitrary expressions as well.

function sidebar(className, title, content, drawLine=true) {
    return React.createElement("div", 
        { className: className },
        React.createElement("h1", null, title),
        drawLine && React.createElement("hr", null),
        React.createElement("p", null, content)
    );
}

This code is easy to read and understand: the curly braces are gone and the resulting
code passes the incoming function parameters to React.createElement() in a natural
way. Note the neat trick that we’ve done here with the drawLine parameter and the
short-circuiting && operator. If you call sidebar() with only three arguments, then
drawLine defaults to true, and the fourth argument to the outer createElement()
call is the <hr/> element. But if you pass false as the fourth argument to sidebar(),
then the fourth argument to the outer createElement() call evaluates to false, and
no <hr/> element is ever created. 

IMPORTANT: This use of the && operator is a common idiom in JSX to conditionally include 
or exclude a child element depending on the value of some other expression.(This idiom works 
with React because React simply ignores children that are false or null and does not produce 
any output for them.)

When you use JavaScript expressions within JSX expressions, you are not limited to
simple values like the string and boolean values in the preceding example. Any Java‐
Script value is allowed. In fact, it is quite common in React programming to use
objects, arrays, and functions. Consider the following function, for example:

// Given an array of strings and a callback function return a JSX element
// representing an HTML <ul> list with an array of <li> elements as its child.
function list(items, callback) {
    return (
        <ul style={ {padding:10, border:"solid red 4px"} }>
            {items.map((item,index) => 
                {
                    <li onClick={() => callback(index)} key={index}>{item}</li>
                }
            )}
        </ul>
    );
}

This function uses an object literal as the value of the style attribute on the <ul>
element. (Note that double curly braces are required here.). The <ul> element has a
single child, but the value of that child is an array. The <ul> element has a
single child, but the value of that child is an array. The child array is the array
created by using the map() function on the input array to create an array of <li> elements.

Finally, note that each of the nested <li> elements has an onClick event handler attribute 
whose value is an arrow function. The JSX code compiles to the following pure JavaScript 
code (which I have formatted with Prettier):

function list(items, callback) {
    return React.createElement(
        "ul",
        { style: { padding: 10, border: "solid red 4px" } },
        items.map((item, index) =>
            React.createElement(
                "li",
                { onClick: () => callback(index), key: index },
                item
            )
        )
    );
}

One other use of object expressions in JSX is with the object spread operator (§6.10.4)
to specify multiple attributes at once. Suppose that you find yourself writing a lot of
JSX expressions that repeat a common set of attributes. You can simplify your expressions
by defining the attributes as properties of an object and “spreading them into”
your JSX elements:

let hebrew = { lang: "he", dir: "rtl" }; // Specify language and direction
let shalom = <span className="emphasis" {...hebrew}> שלום </span>;

Babel compiles this to use an _extends() function (omitted here) that combines that
className attribute with the attributes contained in the hebrew object:

let shalom = React.createElement("span", _extends({className: "emphasis"}, hebrew),
    "\u05E9\u05DC\u05D5\u05DD");

Finally, there is one more important feature of JSX that we have not covered yet.
As you’ve seen, all JSX elements begin with an identifier immediately after the opening
angle bracket. If the first letter of this identifier is lowercase (as it has been in all of
the examples here), then the identifier is passed to createElement() as a string. But if
the first letter of the identifier is uppercase, then it is treated as an actual identifer,
and it is the JavaScript value of that identifier that is passed as the first argument to
createElement(). This means that the JSX expression <Math/> compiles to JavaScript
code that passes the global Math object to React.createElement().

For React, this ability to pass non-string values as the first argument to createElement() 
enables the creation of components. A component is a way of writing a simple JSX expression 
(with an uppercase component name) that represents a more complex
expression (using lowercase HTML tag names).

The simplest way to define a new component in React is to write a function that takes
a “props object” as its argument and returns a JSX expression. A props object is simply
a JavaScript object that represents attribute values, like the objects that are passed as
the second argument to createElement(). Here, for example, is another take on our
sidebar() function:

function Sidebar(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            { props.drawLine && <hr/> }
            <p>{props.content}</p>
        </div>
    );
}

This new Sidebar() function is a lot like the earlier sidebar() function. But this one
has a name that begins with a capital letter and takes a single object argument instead
of separate arguments. This makes it a React component and means that it can be
used in place of an HTML tag name in JSX expressions.

let sidebar = <Sidebar title="Something snappy" content="Something wise"/>;

This <Sidebar/> element compiles like this:

let sidebar = React.createElement(Sidebar, {
    title: "Something snappy",
    content: "Something wise"
});

It is a simple JSX expression, but when React renders it, it will pass the second argument
(the Props object) to the first argument (the Sidebar() function) and will use
the JSX expression returned by that function in place of the <Sidebar> expression.

17.8 Type Checking with Flow

Flow is a language extension that allows you to annotate your JavaScript code with
type information, and a tool for checking your JavaScript code (both annotated and
unannotated) for type errors. To use Flow, you start writing code using the Flow language
extension to add type annotations. Then you run the Flow tool to analyze your
code and report type errors. Once you have fixed the errors and are ready to run the
code, you use Babel (perhaps automatically as part of the code-bundling process) to
strip the Flow type annotations out of your code. One of the nice things about the
Flow language extension is that there isn’t any new syntax that Flow has to compile or
transform. You use the Flow language extension to add annotations to the code and 
all Babel has to do is to strip those annotations out to return your code to standard
JavaScript.)

    TypeScript Versus Flow

    TypeScript is a very popular alternative to Flow. TypeScript is an extension of Java‐
    Script that adds types as well as other language features. The TypeScript compiler
    “tsc” compiles TypeScript programs into JavaScript programs and in the process analyzes
    them and reports type errors in much the same the way that Flow does. tsc is not
    a Babel plugin: it is its own standalone compiler.

    Simple type annotations in TypeScript are usually written identically to the same
    annotations in Flow. For more advanced typing, the syntax of the two extensions
    diverges, but the intent and value of the two extensions is the same.

    Flow is a narrow language extension that adds type annotations to JavaScript and 
    nothing else. TypeScript, by contrast, was very much designed as a new language. As 
    its name implies, adding types to JavaScript is the primary purpose of TypeScript, 
    and it is the reason that people use it today. But types are not the only feature that 
    TypeScript adds to JavaScript: the TypeScript language has enum and namespace keywords 
    that simply do not exist in JavaScript. In 2020, TypeScript has better integration with 
    IDEs and code editors (particularly VSCode, which, like TypeScript, is from Microsoft)
    than Flow does.

    But everything you learn here about adding types to JavaScript will be helpful to you 
    if you decide to adopt TypeScript for your projects.

Using Flow requires commitment, but I have found that for medium and large
projects, the extra effort is worth it. It takes extra time to add type annotations to
your code, to run Flow every time you edit the code, and to fix the type errors it
reports. But in return Flow will enforce good coding discipline and will not allow you
to cut corners that can lead to bugs. When I have worked on projects that use Flow, I
have been impressed by the number of errors it found in my own code. Being able to
fix those issues before they became bugs is a great feeling and gives me extra confidence
that my code is correct.

When I first started using Flow, I found that it was sometimes difficult to understand
why it was complaining about my code. With some practice, though, I came to
understand its error messages and found that it was usually easy to make minor changes 
to my code to make it safer and to satisfy Flow. But once you are confident
with the language, adding Flow to your JavaScript projects will push you to take your
programming skills to the next level. And this, really, is why I’m dedicating the last
section of this book to a Flow tutorial: because learning about JavaScript type systems
offers a glimpse of another level, or another style, of programming.


17.8.1 Installing and Running Flow

You can install the Flow type-checking tool using a package manager, with a command like
npm install -g flow-bin or npm install --save-dev flow-bin. If you install the tool globally 
with -g, then you can run it with flow. And if you install it locally in your project with
--save-dev, then you can run it with npx flow. Before using Flow to do type checking, the first
time run it as flow --init in the root directory of your project to create a .flowconfig 
configuration file. You may never need to add anything to this file, but Flow
needs it to know where your project root is.

When you run Flow, it will find all the JavaScript source code in your project, but it
will only report type errors for the files that have “opted in” to type checking by
adding a // @flow comment at the top of the file. This opt-in behavior is important
because it means that you can adopt Flow for existing projects and then begin to convert
your code one file at a time, without being bothered by errors and warnings on
files that have not yet been converted.

Flow may be able to find errors in your code even if all you do is opt in with a //
@flow comment. Even if you do not use the Flow language extension and add no type
annotations to your code, the Flow type checker tool can still make inferences about
the values in your program and alert you when you use them inconsistently.

17.8.2 Using Type Annotations

When you declare a JavaScript variable, you can add a Flow type annotation to it by
following the variable name with a colon and the type:

let message: string = "Hello world";
let flag: boolean = false;
let n: number = 42;

Flow would know the types of these variables even if you did not annotate them: it
can see what values you assign to each variable, and it keeps track of that. If you add
type annotations, however, Flow knows both the type of the variable and that you
have expressed the intent that the variable should always be of that type. So if you use
the type annotation, Flow will flag an error if you ever assign a value of a different
type to that variable. Type annotations for variables are also particularly useful if you
tend to declare all your variables up at the top of a function before they are used.

Type annotations for function arguments are like annotations for variables: follow the
name of the function argument with a colon and the type name. When annotating a
function, you typically also add an annotation for the return type of the function

This goes between the close parenthesis and the open curly brace of the function
body. Functions that return nothing use the Flow type void.

In the preceding example we defined a size() function that expected an argument
with a length property. Here’s how we could change that function to explicitly specify
that it expects a string argument and returns a number. Note, Flow now flags an error
if we pass an array to the function, even though the function would work in that case:

Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ size2.js:5:18
Cannot call size with array literal bound to s because array literal [1]
is incompatible with string [2].
[2] 2│ function size(s: string): number {
3│ return s.length;
4│ }
[1] 5│ console.log(size([1,2,3]));

Using type annotations with arrow functions is also possible, though it can turn this
normally succinct syntax into something more verbose:

const size = (s: string): number => s.length;

An important thing to understand about Flow is that the JavaScript value null has
the Flow type null and the JavaScript value undefined has the Flow type void. But
neither of these values is a member of any other type (unless you explicitly add it).
If you declare a function parameter to be a string, then it must be a string, and it is an
error to pass null or to pass undefined or to omit the argument (which is basically
the same thing as passing undefined):

Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ size3.js:3:18
Cannot call size with null bound to s because null [1] is incompatible
with string [2].
    1│ // @flow
    [2] 2│ const size = (s: string): number => s.length;
    [1] 3│ console.log(size(null));

If you want to allow null and undefined as legal values for a variable or function
argument, simply prefix the type with a question mark. For example, use ?string
or ?number instead of string or number. If we change our size() function to expect
an argument of type ?string, then Flow doesn’t complain when we pass null to the
function. But it now has something else to complain about:

Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ size4.js:3:14
Cannot get s.length because property length is missing in null or
undefined [1].

1│ // @flow

[1] 2│ function size(s: ?string): number {
3│  return s.length;
4│ }
5│ console.log(size(null));

What Flow is telling us here is that it is not safe to write s.length because, at this
place in our code, s might be null or undefined, and those values do not have
length properties. This is where Flow makes sure we do not cut any corners. If a
value might be null, Flow will insist that we check for that case before we do anything
that depends on the value not being null.

In this case, we can fix the issue by changing the body of the function as follows:

function size(s: ?string): number {
    // At this point in the code, s could be a string or null or undefined.
    if (s === null || s === undefined) {
        // In this block, Flow knows that s is null or undefined.
        return -1;
    } else {
        // And in this block, Flow knows that s is a string.
        return s.length;
    }
}

Note that Flow does not require you to write verbose code like
this. Flow would also be satisfied if we just replaced the body of the size() function
with return s ? s.length : -1;.

IMPORTANT: Flow syntax allows a question mark before any type specification to indicate that, in
addition to the specified type, null and undefined are allowed as well

Question marks can also appear after a parameter name to indicate that the parameter itself is
optional. So if we changed the declaration of the parameter s from s: ?string to
s? : string, that would mean it is OK to call size() with no arguments.  (or with the
value undefined, which is the same as omitting it), but that if we do call it with a
parameter other than undefined, then that parameter must be a string. In this case,
null is not a legal value.

So far, we’ve discussed primitive types string, number, boolean, null, and void and
have demonstrated how you can use use them with variable declarations, function
parameters, and function return values. The subsections that follow describe some
more complex types supported by Flow.

//17.8.3 Class Types

In addition to the primitive types that Flow knows about, it also knows about all of
JavaScript’s built-in classes and allows you to use class name as types.The following
function, for example, uses type annotations to indicate that it should be invoked
with one Date object and one RegExp object:

// @flow
// Return true if the ISO representation of the specified date
// matches the specified pattern, or false otherwise.
// E.g: const isTodayChristmas = dateMatches(new Date(), /^\d{4}-12-25T/);
export function dateMatches(d: Date, p: RegExp): boolean {
    return p.test(d.toISOString());
}

IMPORTANT: If you define your own classes with the class keyword, those classes automatically
become valid Flow types. In order to make this work, however, Flow does require you
to use type annotations in the class. In particular, each property of the class must have
its type declared. Here is a simple complex number class that demonstrates this:

// @flow
export default class Complex {
    // Flow requires an extended class syntax that includes type annotations
    // for each of the properties used by the class.
    i: number;
    r: number;
    
    static i: Complex;

    constructor(r: number, i:number) {
        // Any properties initialized by the constructor must have Flow type
        // annotations above.
        this.r = r;
        this.i = i;
    }

    add(that: Complex) {
        return new Complex(this.r + that.r, this.i + that.i);
    }
}

// This assignment would not be allowed by Flow if there was not a
// type annotation for i inside the class.
Complex.i = new Complex(0,1);


17.8.4 Object Types


