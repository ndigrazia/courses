//CHAPTER 16 - Server-Side JavaScript with Node

/* 
Node is JavaScript with bindings to the underlying operating system, making it possible
to write JavaScript programs that read and write files, execute child processes, and
communicate over the network.

General-purpose programming language for running trusted programs, not subject
to the security constraints imposed by web browsers on untrusted code.

Modern alternative to shell scripts

Popular environment for writing efficient and highly concurrent web servers.

The defining feature of Node is its single-threaded event-based concurrency enabled
by an asynchronous-by-default API.
*/

//16.1 Node Programming Basics

/*
16.1.1 Console Output

If you are used to JavaScript programming for web browsers, one of the minor surprises
about Node is that console.log() is not just for debugging, but is Node’s easiest
way to display a message to the user, or, more generally, to send output to the
stdout stream.*/

console.log("Hello World!");

/*
There are lower-level ways to write to stdout, but no fancier or more official way than
simply calling console.log().

In web browsers, console.log(), console.warn(), and console.error() typically
display little icons next to their output in the developer console to indicate the variety
of the log message. Node does not do this, but output displayed with con
sole.error() is distinguished from output displayed with console.log() because
console.error() writes to the stderr stream. If you’re using Node to write a program
that is designed to have stdout redirected to a file or a pipe, you can use con
sole.error() to display text to the console where the user will see it, even though
text printed with console.log() is hidden.

16.1.2 Command-Line Arguments and Environment Variables

If you have previously written Unix-style programs designed to be invoked from a
terminal or other command-line interface, you know that these programs typically
get their input primarily from command-line arguments and secondarily from environment
variables.

Node follows these Unix conventions. A Node program can read its command-line
arguments from the array of strings process.argv. The first element of this array is
always the path to the Node executable. The second argument is the path to the file of
JavaScript code that Node is executing. Any remaining elements in this array are the
space-separated arguments that you passed on the command-line when you invoked
Node.

For example, suppose you save this very short Node program to the file argv.js:

console.log(process.argv);

You can then execute the program and see output like this:


$ node --trace-uncaught argv.js --arg1 --arg2 filename
[
    '/usr/local/bin/node',
    '/private/tmp/argv.js',
    '--arg1',
    '--arg2',
    'filename'
]

There are a couple of things to note here:

The first and second elements of process.argv will be fully qualified filesystem
paths to the Node executable and the file of javascripts.

Command-line arguments that are intended for and interpreted by the Node executable
itself are consumed by the Node executable and do not appear in pro
cess.argv. (The --trace-uncaught command-line argument isn’t actually doing
anything useful in the previous example; it is just there to demonstrate that it
does not appear in the output.) Any arguments (such as --arg1 and filename)
that appear after the name of the JavaScript file will appear in process.argv.

Node programs can also take input from Unix-style environment variables. Node
makes these available though the process.env object. The property names of this
object are environment variable names, and the property values (always strings) are
the values of those variables.

Here is a partial list of environment variables on my system:

$ node -p -e 'process.env'

{
    SHELL: '/bin/bash',
    USER: 'david',
    PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
    PWD: '/tmp',
    LANG: 'en_US.UTF-8',
    HOME: '/Users/david',
}

*/

//16.1.3 Program Life Cycle

/*
The node command expects a command-line argument that specifies the file of Java‐
Script code to be run. This initial file typically imports other modules of JavaScript
code, and may also define its own classes and functions. Fundamentally, however,
Node executes the JavaScript code in the specified file from top to bottom
Some Node programs exit when they are done executing the last line of code in the file.
Often, however, a Node program will keep running long after the initial file has been
executed.As we’ll discuss in the following sections, Node programs are often asynchronous
and based on callbacks and event handlers. 

IMPORTANT: Node programs do not exit
until they are done running the initial file and until all callbacks have been called and
there are no more pending events. A Node-based server program that listens for
incoming network connections will theoretically run forever because it will always be
waiting for more events.

A program can force itself to exit by calling process.exit(). Users can usually terminate
a Node program by typing Ctrl-C in the terminal window where the program is
running. A program can ignore Ctrl-C by registering a signal handler function with
process.on("SIGINT", ()=>{}).

If code in your program throws an exception and no catch clause catches it, the program
will print a stack trace and exit. Because of Node’s asynchronous nature, exceptions
that occur in callbacks or event handlers must be handled locally or not handled
at all, which means that handling exceptions that occur in the asynchronous parts of
your program can be a difficult problem. If you don’t want these exceptions to cause
your program to completely crash, register a global handler function that will be
invoked instead of crashing.
*/

process.setUncaughtExceptionCaptureCallback(e => {
    console.error("Uncaught exception:", e);
});

/*
A similar situation arises if a Promise created by your program is rejected and there is
no .catch() invocation to handle it. As of Node 13, this is not a fatal error that
causes your program to exit, but it does print a verbose error message to the console.
In some future version of Node, unhandled Promise rejections are expected to
become fatal errors. If you do not want unhandled rejections, to print error messages
or terminate your program, register a global handler function:
*/

process.on("unhandledRejection", (reason, promise) => {
    // reason is whatever value would have been passed to a .catch() function
    // promise is the Promise object that rejected
});

//16.1.4 Node Modules

/*
Because Node was created before JavaScript had a module system, Node had to create its own. Node’s module
system uses the require() function to import values into a module and the exports object or the module.exports property
to export values from a module.

Node 13 adds support for standard ES6 modules as well as require-based modules (which Node calls “CommonJS modules”). The
two module systems are not fully compatible, so this is somewhat tricky to do.

IMPORTANT: Node needs to know—before it loads a module—whether that module will be using require() and module.exports or if it
will be using import and export. When Node loads a file of JavaScript code as a
CommonJS module, it automatically defines the require() function along with identifiers
exports and module, and it does not enable the import and export keywords.

On the other hand, when Node loads a file of code as an ES6 module, it must enable
the import and export declarations, and it must not define extra identifiers like
require, module, and exports.

The simplest way to tell Node what kind of module it is loading is to encode this
information in the file extension. If you save your JavaScript code in a file that ends
with .mjs, then Node will always load it as an ES6 module, will expect it to use import
and export, and will not provide a require() function. And if you save your code in
a file that ends with .cjs, then Node will always treat it as a CommonJS module, will
provide a require() function, and will throw a SyntaxError if you use import or
export declarations.

For files that do not have an explicit .mjs or .cjs extension, Node looks for a file
named package.json in the same directory as the file and then in each of the containing
directories. Once the nearest package.json file is found, Node checks for a toplevel
type property in the JSON object. If the value of the type property is “module”,
then Node loads the file as an ES6 module. If the value of that property is
“commonjs”, then Node loads the file as a CommonJS module. Note that you do not
need to have a package.json file to run Node programs: when no such file is found (or
when the file is found but it does not have a type property), Node defaults to using
CommonJS modules.This package.json trick only becomes necessary if you want to
use ES6 modules with Node and do not want to use the .mjs file extension

IMPORTANT: Because there is an enormous amount of existing Node code written using CommonJS
module format, Node allows ES6 modules to load CommonJS modules using
the import keyword. The reverse is not true.-
*/

// 16.1.5 The Node Package Manager

/*
When you install Node, you typically get a program named npm as well. This is the
Node Package Manager, and it helps you download and manage libraries that your
program depends on. npm keeps track of those dependencies (as well as other information
about your program) in a file named package.json in the root directory of
your project. This package.json file created by npm is where you would add
"type":"module" if you wanted to use ES6 modules for your project

To get started, you might create a directory for your project, and then, in that directory 
type npm init. npm will ask you for your project name, version number, etc., and will then 
create an initial package.json file based on your responses. 

Now to start using Express, you’d type "npm install express". This tells npm to
download the Express library along with all of its dependencies and install all the
packages in a local node_modules/ directory. 

$ npm install express
    npm notice created a lockfile as package-lock.json. You should commit this file.
    npm WARN my-server@1.0.0 No description
    npm WARN my-server@1.0.0 No repository field.
    + express@4.17.1
    added 50 packages from 37 contributors and audited 126 packages in 3.058s
    found 0 vulnerabilities

When you install a package with npm, npm records this dependency—that your
project depends on Express—in the package.json file. With this dependency recorded
in package.json, you could give another programmer a copy of your code and your
package.json, and they could simply type "npm install" to automatically download and
install all of the libraries that your program needs in order to run.

16.2 Node Is Asynchronous by Default

JavaScript is a general-purpose programming language, so it is perfectly possible to
write CPU-intensive programs that multiply large matrices or perform complicated
statistical analyses. But Node was designed and optimized for programs—like network
servers—that are I/O intensive.And in particular, Node was designed to make it
possible to easily implement highly concurrent servers that can handle many requests
at the same time.

Unlike many programming languages, however, Node does not achieve concurrency
with threads. Multithreaded programming is notoriously hard to do correctly, and
difficult to debug. Also, threads are a relatively heavyweight abstraction and if you
want to write a server that can handle hundreds of concurrent requests, using hundreds
of threads may require a prohibitive amount of memory. So Node adopts the
single-threaded JavaScript programming model that the web uses.

    //True Parallelism with Node

    Node programs can run multiple operating system processes,and Node 10 and later
    support Worker objects, which are a kind of thread borrowed from web
    browsers. If you use multiple processes or create one or more Worker threads and run
    your program on a system with more than one CPU, then your program will no
    longer be single-threaded and your program will truly be executing multiple streams
    of code in parallel. These techniques can be valuable for CPU-intensive operations
    but are not commonly used for I/O-intensive programs like servers.

    Node’s processes and Workers avoid the typical complexity of multithreaded programming.

Node achieves high levels of concurrency while maintaining a single-threaded programming
model by making its API asynchronous and non-blocking by default. Node was created before
JavaScript had a Promise class, so asynchronous Node APIs are callback-based. Generally, the 
last argument you pass to an asynchronous Node function is a callback. Node uses error-first callbacks, 
which are typically invoked with two arguments. The first argument to an error-first callback is normally null in the
case where no error occurred, and the second argument is whatever data or response
was produced by the original asynchronous function you called. The reason for
putting the error argument first is to make it impossible for you to omit it, and you
should always check for a non-null value in this argument. If it is an Error object, or
even an integer error code or string error message, then something went wrong. In
this case, the second argument to your callback function is likely to be null.

The following code demonstrates how to use the nonblocking readFile() function
to read a configuration file, parse it as JSON, and then pass the parsed configuration
object to another callback: */

const fs = require("fs"); // Require the filesystem module

// Read a config file, parse its contents as JSON, and pass the
// resulting value to the callback. If anything goes wrong,
// print an error message to stderr and invoke the callback with null
function readConfigFile(path, callback) {
    fs.readFile(path, "utf8", (err, text) => {
        if (err) { // Something went wrong reading the file
            console.error(err);
            callback(null);
            return;
        }
        let data = null;
        try {
            data = JSON.parse(text);
        } catch(e) { // Something went wrong parsing the file contents
            console.error(e);
            callback(null);
            return;
        }
        callback(data);
    });
}

/*
Node predates standardized promises, but because it is fairly consistent about its
error-first callbacks, it is easy to create Promise-based variants of its callback-based
APIs using the util.promisify() wrapper. Here’s how we could rewrite the readConfigFile() 
function to return a Promise:
*/

const util = require("util");
const fs = require("fs"); // Require the filesystem module

const pfs = { // Promise-based variants of some fs functions
    readFile: util.promisify(fs.readFile)
};

function readConfigFile(path) {
    return pfs.readFile(path, "utf-8").then(text => {
        return JSON.parse(text);
    });
}

//We can also simpify the preceding Promise-based function using async and await

async function readConfigFile(path) {
    let text = await pfs.readFile(path, "utf-8");
    return JSON.parse(text);
}

/*
The util.promisify() wrapper can produce a Promise-based version of many Node
functions. In Node 10 and later, the fs.promises object has a number of predefined
Promise-based functions for working with the filesystem. We’ll discuss them later in
this chapter, but note that in the preceding code, we could replace pfs.readFile()
with fs.promises.readFile().

We had said that Node’s programming model is async-by-default. But for programmer
convenience, Node does define blocking, synchronous variants of many of its
functions, especially in the filesystem module. These functions typically have names
that are clearly labeled with Sync at the end.

When a server is first starting up and is reading its configuration files, it is not handling
network requests yet, and little or no concurrency is actually possible. So in this
situation, there is really no need to avoid blocking, and we can safely use blocking
functions like fs.readFileSync(). We can drop the async and await from this code
and write a purely synchronous version of our readConfigFile() function. Instead
of invoking a callback or returning a Promise, this function simply returns the parsed
JSON value or throws an exception:
*/

const fs = require("fs");

function readConfigFileSync(path) {
    let text = fs.readFileSync(path, "utf-8");
    return JSON.parse(text);
}

/*
In addition to its error-first two-argument callbacks, Node also has a number of APIs
that use event-based asynchrony, typically for handling streaming data.

Node’s built-in non-blocking functions work using the operating
system’s version of callbacks and event handlers. When you call one of these functions,
Node takes action to get the operation started, then registers some kind of
event handler with the operating system so that it will be notified when the operation
is complete. The callback you passed to the Node function gets stored internally so
that Node can invoke your callback when the operating system sends the appropriate
event to Node.

This kind of concurrency is often called event-based concurrency. At its core, Node
has a single thread that runs an “event loop.” When a Node program starts, it runs
whatever code you’ve told it to run. This code presumably calls at least one non-blocking
function causing a callback or event handler to be registered with the operating
system. (If not, then you’ve written a synchronous Node program, and Node simply
exits when it reaches the end.) When Node reaches the end of your program, it blocks
until an event happens, at which time the OS starts it running again. Node maps the
OS event to the JavaScript callback you registered and then invokes that function.
Your callback function may invoke more non-blocking Node functions, causing more
OS event handlers to be registered. Once your callback function is done running,
Node goes back to sleep again and the cycle repeats.

For web servers and other I/O-intensive applications that spend most of their time
waiting for input and output, this style of event-based concurrency is efficient and
effective.*/

//16.3 Buffers

/*
One of the datatypes you’re likely to use frequently in Node—especially when reading
data from files or from the network—is the Buffer class. A Buffer is a lot like a string,
except that it is a sequence of bytes instead of a sequence of characters. Node was created
before core JavaScript supported typed arrays and there was no Uint8Array to represent an 
array of unsigned bytes. Node defined the Buffer class to
fill that need. Now that Uint8Array is part of the JavaScript language, Node’s Buffer
class is a subclass of Uint8Array.

IMPORTANT: What distinguishes Buffer from its Uint8Array superclass is that it is designed to
interoperate with JavaScript strings: the bytes in a buffer can be initialized from character
strings or converted to character strings. A character encoding maps each character
in some set of characters to an integer. Given a string of text and a character
encoding, we can encode the characters in the string into a sequence of bytes. And
given a (properly encoded) sequence of bytes and a character encoding, we can
decode those bytes into a sequence of characters. Node’s Buffer class has methods that perform 
both encoding and decoding, and you can recognize these methods because
they expect an encoding argument that specifies the encoding to be used

Encodings in Node are specified by name, as strings. The supported encodings are:

"utf8"
    This is the default when no encoding is specified, and is the Unicode encoding
    you are most likely to use.

"utf16le"
    Two-byte Unicode characters, with little-endian ordering. Codepoints above
    \uffff are encoded as a pair of two-byte sequences. Encoding "ucs2" is an alias.

"latin1"
    The one-byte-per-character ISO-8859-1 encoding that defines a character set
    suitable for many Western European languages. Because there is a one-to-one
    mapping between bytes and latin-1 characters, this encoding is also known as
    "binary".

"ascii"
    The 7-bit English-only ASCII encoding, a strict subset of the "utf8" encoding.

"hex"
    This encoding converts each byte to a pair of ASCII hexadecimal digits.

"base64"
    This encoding converts each sequence of three bytes into a sequence of four ascii
    characters.
*/

let b = Buffer.from([0x41, 0x42, 0x43]); // <Buffer 41 42 43>

b.toString() // => "ABC"; default "utf8"
b.toString("hex") // => "414243"

let computer = Buffer.from("IBM3111", "ascii"); // Convert string to Buffer
for(let i = 0; i < computer.length; i++) { // Use Buffer as byte array
computer[i]--; // Buffers are mutable
}
computer.toString("ascii")

computer.subarray(0,3).map(x=>x+1).toString() // => "IBM"

// Create new "empty" buffers with Buffer.alloc()
let zeros = Buffer.alloc(1024); // 1024 zeros
let ones = Buffer.alloc(128, 1); // 128 ones
let dead = Buffer.alloc(1024, "DEADBEEF", "hex"); // Repeating pattern of bytes

// Buffers have methods for reading and writing multi-byte values
// from and to a buffer at any specified offset.
dead.readUInt32BE(0) // => 0xDEADBEEF
dead.readUInt32BE(1) // => 0xADBEEFDE
dead.readBigUInt64BE(6) // => 0xBEEFDEADBEEFDEADn
dead.readUInt32LE(1020) // => 0xEFBEADDE

/*
If you write a Node program that actually manipulates binary data, you may find
yourself using the Buffer class extensively. On the other hand, if you are just working
with text that is read from or written to a file or the network, then you may only
encounter Buffer as an intermediate representation of your data. A number of Node
APIs can take input or return output as either strings or Buffer objects. Typically, if
you pass a string, or expect a string to be returned, from one of these APIs, you’ll
need to specify the name of the text encoding you want to use. And if you do this,
then you may not need to use a Buffer object at all.
*/

//16.4 Events and EventEmitter

/*
All of Node’s APIs are asynchronous by default. For many of them, this asynchrony 
takes the form of two-argument error-first callbacks that are invoked
when the requested operation is complete. But some of the more complicated APIs
are event-based instead. This is typically the case when the API is designed around an
object rather than a function, or when a callback function needs to be invoked multiple
times, or when there are multiple types of callback functions that may be
required. Consider the net.Server class, for example: an object of this type is a server
socket that is used to accept incoming connections from clients. It emits a “listening”
event when it first starts listening for connections, a “connection” event every time a
client connects, and a “close” event when it has been closed and is no longer listening.

In Node, objects that emit events are instances of EventEmitter or a subclass of
EventEmitter:
*/

const EventEmitter = require("events"); // Module name does not match class name
const net = require("net");

let server = new net.Server(); // create a Server object
server instanceof EventEmitter // => true: Servers are EventEmitters

/*
The main feature of EventEmitters is that they allow you to register event handler
functions with the on() method. EventEmitters can emit multiple types of events, and
event types are identified by name. To register an event handler, call the on() method,
passing the name of the event type and the function that should be invoked when an
event of that type occurs. EventEmitters can invoke handler functions with any number
of arguments, and you need to read the documentation for a specific kind of
event from a specific EventEmitter to know what arguments you should expect to be
passed:*/

const net = require("net");
let server = new net.Server(); // create a Server object

server.on("connection", socket => { // Listen for "connection" events
    // Server "connection" events are passed a socket object
    // for the client that just connected. Here we send some data
    // to the client and disconnect.
    socket.end("Hello World", "utf8");
});

/*
If you prefer more explicit method names for registering event listeners, you can also
use addListener(). And you can remove a previously registered event listener with
off() or removeListener(). As a special case, you can register an event listener that
will be automatically removed after it is triggered for the first time by calling once()
instead of on().

When an event of a particular type occurs for a particular EventEmitter object, Node
invokes all of the handler functions that are currently registered on that EventEmitter
for events of that type. They are invoked in order from the first registered to the last
registered. If there is more than one handler function, they are invoked sequentially
on a single thread: IMPORTANT: there is no parallelism in Node, remember. And, importantly,
event handling functions are invoked synchronously, not asynchronously. What this
means is that the emit() method does not queue up event handlers to be invoked at
some later time. emit() invokes all the registered handlers, one after the other, and
does not return until the last event handler has returned.

What this means, in effect, is that when one of the built-in Node APIs emits an event,
that API is basically blocking on your event handlers. If you write an event handler
that calls a blocking function like fs.readFileSync(), no further event handling will
happen until your synchronous file read is complete.

IMPORTANT: If your program is one—like a network server—that needs to be responsive, 
then it is important that you keep your event handler functions non-blocking and fast.

If you need to do a lot of computation when an event occurs, it is often best to use the 
handler to schedule that computation asynchronously using setTimeout(). Node also defines 
setImmediate(), which schedules a function to be invoked immediately after all pending 
callbacks and events have been handled. 

The EventEmitter class also defines an emit() method that causes the registered
event handler functions to be invoked. This is useful if you are defining your own
event-based API, but is not commonly used when you’re just programming with
existing APIs. emit() must be invoked with the name of the event type as its first 
argument.  Any additional arguments that are passed to emit() become arguments to
the registered event handler functions. The handler functions are also invoked with
the this value set to the EventEmitter object itself, which is often convenient.
(Remember, though, that arrow functions always use the this value of the context in
which they are defined, and they cannot be invoked with any other this value. Nevertheless,
arrow functions are often the most convenient way to write event handlers.)

Any value returned by an event handler function is ignored. If an event handler function
throws an exception, however, it propagates out from the emit() call and prevents
the execution of any handler functions that were registered after the one that
threw the exception.

Recall that Node’s callback-based APIs use error-first callbacks, and it is important
that you always check the first callback argument to see if an error occurred. With
event-based APIs, the equivalent is “error” events. Since event-based APIs are often
used for networking and other forms of streaming I/O, they are vulnerable to unpredictable
asynchronous errors, and most EventEmitters define an “error” event that
they emit when an error occurs.

IMPORTANT: Whenever you use an event-based API, you should make it a habit to register 
a handler for “error” events. “Error” events get special treatment by the EventEmitter class. 
If emit() is called to emit an “error” event, and if there are no handlers registered for that 
event type, then an exception will be thrown. Since this occurs asynchronously, there is no way 
for you to handle the exception in a catch block, so this kind of error typically causes your 
program to exit.*/


//16.5 Streams

/*
When implementing an algorithm to process data, it is almost always easiest to read
all the data into memory, do the processing, and then write the data out.*/

const fs = require("fs");

// An asynchronous but nonstreaming (and therefore inefficient) function.
function copyFile(sourceFilename, destinationFilename, callback) {
    fs.readFile(sourceFilename, (err, buffer) => {
        if (err) {
            callback(err);
        } else {
            fs.writeFile(destinationFilename, buffer, callback);
        }
    });
}

/*
This copyFile() function uses asynchronous functions and callbacks, so it does not
block and is suitable for use in concurrent programs like servers. But notice that it
must allocate enough memory to hold the entire contents of the file in memory at
once. This may be fine in some use cases, but it starts to fail if the files to be copied
are very large, or if your program is highly concurrent and there may be many files
being copied at the same time. Another shortcoming of this copyFile() implementation
is that it cannot start writing the new file until it has finished reading the old file.

The solution to these problems is to use streaming algorithms where data “flows” into
your program, is processed, and then flows out of your program.The idea is that
your algorithm processes the data in small chunks and the full dataset is never held in
memory at once. When streaming solutions are possible, they are more memory efficient
and can also be faster. Node’s networking APIs are stream-based and Node’s filesystem
module defines streaming APIs for reading and writing files, so you are likely
to use a streaming API in many of the Node programs that you write.

Node supports four basic stream types:

Readable
Readable streams are sources of data. The stream returned by fs.createRead
Stream(), for example, is a stream from which the content of a specified file can
be read. process.stdin is another Readable stream that returns data from standard
input.

Writable
Writable streams are sinks or destinations for data. The return value of fs.crea
teWriteStream(), for example, is a Writable stream: it allows data to be written
to it in chunks, and outputs all of that data to a specified file.

Duplex
Duplex streams combine a Readable stream and a Writable stream into one
object. The Socket objects returned by net.connect() and other Node networking
APIs, for example, are Duplex streams. If you write to a socket, your data is
sent across the network to whatever computer the socket is connected to. And if
you read from a socket, you access the data written by that other computer.

Transform
Transform streams are also readable and writable, but they differ from Duplex
streams in an important way: data written to a Transform stream becomes readable—
usually in some transformed form—from the same stream. The zlib.crea
teGzip() function, for example, returns a Transform stream that compresses
(with the gzip algorithm) the data written to it. In a similar way, the
crypto.createCipheriv() function returns a Transform stream that encrypts or
decrypts data that is written to it.

By default, streams read and write buffers.

Readable streams have to read their data from somewhere, and Writable streams have
to write their data to somewhere, so every stream has two ends: an input and an output
or a source and a destination. The tricky thing about stream-based APIs is that
the two ends of the stream will almost always flow at different speeds. Perhaps the
code that reads from a stream wants to read and process data more quickly than the
data is actually being written into the stream.Or the reverse: perhaps data is written
to a stream more quickly than it can be read and pulled out of the stream on the other
end. Stream implementations almost always include an internal buffer to hold data
that has been written but not yet read. Buffering helps to ensure that there is data
available to read when it’s requested, and that there is space to hold data when it is
written.But neither of these things can ever be guaranteed, and it is the nature of
stream-based programming that readers will sometimes have to wait for data to be
written (because the stream buffer is empty), and writers will sometimes have to wait
for data to be read (because the stream buffer is full).

In programming environments that use thread-based concurrency, stream APIs typically
have blocking calls: a call to read data does not return until data arrives in the
stream and a call to write data blocks until there is enough room in the stream’s internal
buffer to accommodate the new data. With an event-based concurrency model,
however, blocking calls do not make sense, and Node’s stream APIs are event- and
callback-based.

The need to coordinate stream readability (buffer not empty) and writability (buffer
not full) via events makes Node’s stream APIs somewhat complicated.

16.5.1 Pipes

Sometimes, you need to read data from a stream simply to turn around and write that
same data to another stream. Imagine, for example, that you are writing a simple HTTP 
server that serves a directory of static files. In this case, you will need to read
data from a file input stream and write it out to a network socket. But instead of writing
your own code to handle the reading and writing, you can instead simply connect
the two sockets together as a “pipe” and let Node handle the complexities for you.

Simply pass the Writable stream to the pipe() method of the Readable stream:*/

const fs = require("fs");

function pipeFileToSocket(filename, socket) {
    fs.createReadStream(filename).pipe(socket);
}

/*
The following utility function pipes one stream to another and invokes a callback
when done or when an error occurs:
*/

function pipe(readable, writable, callback) {
    // First, set up error handling
    function handleError(err) {
        readable.close();
        writable.close();
        callback(err);
    }

    // Next define the pipe and handle the normal termination case
    readable
    .on("error", handleError)
    .pipe(writable)
    .on("error", handleError)
    .on("finish", callback);
}

/*
Transform streams are particularly useful with pipes, and create pipelines that involve
more than two streams. Here’s an example function that compresses a file:
*/

const fs = require("fs");
const zlib = require("zlib");

function gzip(filename, callback) {
    // Create the streams
    let source = fs.createReadStream(filename);
    let destination = fs.createWriteStream(filename + ".gz");
   
    let gzipper = zlib.createGzip();
   
    // Set up the pipeline
    source
    .on("error", callback) // call callback on read error
    .pipe(gzipper)
    .pipe(destination)
    .on("error", callback) // call callback on write error
    .on("finish", callback); // call callback when writing is complete
}

/*
Using the pipe() method to copy data from a Readable stream to a Writable stream is
easy, but in practice, you often need to process the data somehow as it streams
through your program. One way to do this is to implement your own Transform
stream to do that processing, and this approach allows you to avoid manually reading
and writing the streams. Here, for example, is a function that works like the Unix
grep utility: it reads lines of text from an input stream, but writes only the lines that
match a specified regular expression:*/

const stream = require("stream");

class GrepStream extends stream.Transform {
    constructor(pattern) {
        super({decodeStrings: false});// Don't convert strings back to buffers
        this.pattern = pattern; // The regular expression we want to match
        this.incompleteLine = ""; // Any remnant of the last chunk of data
    }

    // This method is invoked when there is a string ready to be
    // transformed. It should pass transformed data to the specified
    // callback function. We expect string input so this stream should
    // only be connected to readable streams that have had
    //setEncoding() called on them.
    _transform(chunk, encoding, callback) {
        if (typeof chunk !== "string") {
            callback(new Error("Expected a string but got a buffer"));
            return;
        }

        // Add the chunk to any previously incomplete line and break
        // everything into lines
        let lines = (this.incompleteLine + chunk).split("\n");
    
        // The last element of the array is the new incomplete line
        this.incompleteLine = lines.pop();

        // Find all matching lines
        let output = lines // Start with all complete lines,
            .filter(l => this.pattern.test(l)) // filter them for matches,
            .join("\n"); // and join them back up.
    
        // If anything matched, add a final newline
        if (output) {
            output += "\n";
        }
    
        // Always call the callback even if there is no output
        callback(null, output);
    }   

    // This is called right before the stream is closed.
    // It is our chance to write out any last data.
    _flush(callback) {
        // If we still have an incomplete line, and it matches
        // pass it to the callback
        if (this.pattern.test(this.incompleteLine)) {
            callback(null, this.incompleteLine + "\n");
        }
    }
}  

// Now we can write a program like 'grep' with this class.
let pattern = new RegExp(process.argv[2]); // Get a RegExp from command line.

process.stdin // Start with standard input,
.setEncoding("utf8") // read it as Unicode strings,
.pipe(new GrepStream(pattern)) // pipe it to our GrepStream,
.pipe(process.stdout) // and pipe that to standard out.
.on("error", () => process.exit()); // Exit gracefully if stdout closes.

//16.5.2 Asynchronous Iteration

/*
In Node 12 and later, Readable streams are asynchronous iterators, which means that
within an async function you can use a for/await loop to read string or Buffer
chunks from a stream using code that is structured like synchronous code would be.

Using an asynchronous iterator is almost as easy as using the pipe() method, and is
probably easier when you need to process each chunk you read in some way. Here’s
how we could rewrite the grep program in the previous section using an async function
and a for/await loop*/

// Read lines of text from the source stream, and write any lines
// that match the specified pattern to the destination stream.
async function grep(source, destination, pattern, encoding="utf8") {
    // Set up the source stream for reading strings, not Buffers
    source.setEncoding(encoding);

    // Set an error handler on the destination stream in case standard
    // output closes unexpectedly (when piping output to `head`, e.g.)
    destination.on("error", err => process.exit());

    // The chunks we read are unlikely to end with a newline, so each will
    // probably have a partial line at the end. Track that here
    let incompleteLine = "";

    // Use a for/await loop to asynchronously read chunks from the input stream
    for await (let chunk of source) {
        // Split the end of the last chunk plus this one into lines
        let lines = (incompleteLine + chunk).split("\n");

        // The last line is incomplete
        incompleteLine = lines.pop();

        // Now loop through the lines and write any matches to the destination
        for(let line of lines) {
            if (pattern.test(line)) {
                destination.write(line + "\n", encoding);
            }
        }
    }
    
    // Finally, check for a match on any trailing text.
    if (pattern.test(incompleteLine)) {
        destination.write(incompleteLine + "\n", encoding);
    }
}

let pattern1 = new RegExp(process.argv[2]); // Get a RegExp from command line.

grep(process.stdin, process.stdout, pattern1) // Call the async grep() function.
    .catch(err => { // Handle asynchronous exceptions.
        console.error(err);
        process.exit();
    });

//16.5.3 Writing to Streams and Handling Backpressure

/*
The async grep() function in the preceding code example demonstrated how to use a
Readable stream as an asynchronous iterator, but it also demonstrated that you can
write data to a Writable stream simply by passing it to the write() method.

The write() method takes a buffer or string as the first argument. If you pass a buffer,
the bytes of that buffer will be written directly. If you pass a string, it will be encoded
to a buffer of bytes before being written. Writable streams have a default encoding
that is used when you pass a string as the only argument to write(). The default
encoding is typically “utf8,” but you can set it explicitly by calling setDefaultEncod
ing() on the Writable stream. Alternatively, when you pass a string as the first argument
to write() you can pass an encoding name as the second argument.

write() optionally takes a callback function as its third argument. This will be
invoked when the data has actually been written and is no longer in the Writable
stream’s internal buffer. (This callback may also be invoked if an error occurs, but this
is not guaranteed. You should register an “error” event handler on the Writable
stream to detect errors.)

The write() method has a very important return value. When you call write() on a
stream, it will always accept and buffer the chunk of data you have passed. It then
returns true if the internal buffer is not yet full. Or, if the buffer is now full or
overfull, it returns false. This return value is advisory, and you can ignore it—ritable
streams will enlarge their internal buffer as much as needed if you keep calling
write(). But remember that the reason to use a streaming API in the first place is to
avoid the cost of keeping lots of data in memory at once.

A return value of false from the write() method is a form of backpressure: a message
from the stream that you have written data more quickly than it can be handled.The proper response to this kind of backpressure is to stop calling write() until the
stream emits a “drain” event, signaling that there is once again room in the buffer

Here, for example, is a function that writes to a stream, and then invokes a callback
when it is OK to write more data to the stream:*/

function write(stream, chunk, callback) {
    // Write the specified chunk to the specified stream
    let hasMoreRoom = stream.write(chunk);
 
    // Check the return value of the write() method:
    if (hasMoreRoom) { // If it returned true, then
       setImmediate(callback); // invoke callback asynchronously.
    } else { // If it returned false, then
        stream.once("drain", callback); // invoke callback on drain event.
    }
}

/*
The fact that it is sometimes OK to call write() multiple times in a row and sometimes
you have to wait for an event between writes makes for awkward algorithms.This is one of 
the reasons that using the pipe() method is so appealing: when you use
pipe(), Node handles backpressure for you automatically.

If you are using await and async in your program, and are treating Readable streams
as asynchronous iterators, it is straightforward to implement a Promise-based version
of the write() utility function above to properly handle backpressure. In the async
grep() function we just looked at, we did not handle backpressure. The async copy()
function in the following example demonstrates how it can be done correctly. Note
that this function just copies chunks from a source stream to a destination stream and
calling copy(source, destination) is much like calling source.pipe(destination):*/

// This function writes the specified chunk to the specified stream and
// returns a Promise that will be fulfilled when it is OK to write again.
// Because it returns a Promise, it can be used with await.
function write(stream, chunk) {
    // Write the specified chunk to the specified stream
    let hasMoreRoom = stream.write(chunk);
    if (hasMoreRoom) { // If buffer is not full, return
        return Promise.resolve(null); // an already resolved Promise object
    } else {
        return new Promise(resolve => { // Otherwise, return a Promise that
            stream.once("drain", resolve); // resolves on the drain event.
        });
    }
}

// Copy data from the source stream to the destination stream
// respecting backpressure from the destination stream.
// This is much like calling source.pipe(destination).
async function copy(source, destination) {
    // Set an error handler on the destination stream in case standard
    // output closes unexpectedly (when piping output to `head`, e.g.)
    destination.on("error", err => process.exit());
    // Use a for/await loop to asynchronously read chunks from the input stream
    for await (let chunk of source) {
        // Write the chunk and wait until there is more room in the buffer.
        await write(destination, chunk);
    }
}

// Copy standard input to standard output
copy(process.stdin, process.stdout);

/*
Before we conclude this discussion of writing to streams, note again that failing to
respond to backpressure can cause your program to use more memory than it should
when the internal buffer of a Writable stream overflows and grows larger and larger.
If you are writing a network server, this can be a remotely exploitable security issue.
Suppose you write an HTTP server that delivers files over the network, but you didn’t
use pipe() and you didn’t take the time to handle backpressure from the write()
method. An attacker could write an HTTP client that initiates requests for large files
(such as images) but never actually reads the body of the request. Since the client is
not reading the data over the network, and the server isn’t responding to backpressure,
buffers on the server are going to overflow. With enough concurrent connections
from the attacker, this can turn into a denial-of-service attack that slows your
server down or even crashes it.
*/

//16.5.4 Reading Streams with Events

/*
Node’s readable streams have two modes, each of which has its own API for reading.
If you can’t use pipes or asynchronous iteration in your program, you will need to
pick one of these two event-based APIs for handling streams.


Flowing mode

In flowing mode, when readable data arrives, it is immediately emitted in the form of
a “data” event. To read from a stream in this mode, simply register an event handler
for “data” events, and the stream will push chunks of data (buffers or strings) to you
as soon as they becomes available.Note that there is no need to call the read()
method in flowing mode: you only need to handle “data” events. Note that newly
created streams do not start off in flowing mode. Registering a “data” event handler
switches a stream into flowing mode. Conveniently, this means that a stream does not
emit “data” events until you register the first “data” event handler.

If you are using flowing mode to read data from a Readable stream, process it, then
write it to a Writable stream, then you may need to handle backpressure from the
Writable stream. If the write() method returns false to indicate that the write
buffer is full, you can call pause() on the Readable stream to temporarily stop data
events. Then, when you get a “drain” event from the Writable stream, you can call
resume() on the Readable stream to start the “data” events flowing again.

A stream in flowing mode emits an “end” event when the end of the stream is
reached. This event indicates that no more “data” events will ever be emitted. And, as
with all streams, an “error” event is emitted if an error occurs.

The following code shows how to
implement a streaming copyFile() function that uses the flowing mode API and
handles backpressure. This would have been easier to implement with a pipe() call,
but it serves here as a useful demonstration of the multiple event handlers that are
used to coordinate data flow from one stream to the other.
*/

const fs = require("fs");

// A streaming file copy function, using "flowing mode".
// Copies the contents of the named source file to the named destination file.
// On success, invokes the callback with a null argument. On error,
// invokes the callback with an Error object.
function copyFile(sourceFilename, destinationFilename, callback) {
    let input = fs.createReadStream(sourceFilename);
    let output = fs.createWriteStream(destinationFilename);

    input.on("data", (chunk) => { // When we get new data,
        let hasRoom = output.write(chunk); // write it to the output stream.
        if (!hasRoom) { // If the output stream is full
            input.pause(); // then pause the input stream.
        }
    });

    input.on("end", () => { // When we reach the end of input,
        output.end(); // tell the output stream to end.
    });
    
    input.on("error", err => { // If we get an error on the input,
        callback(err); // call the callback with the error
        process.exit(); // and quit.
    });
    
    output.on("drain", () => { // When the output is no longer full,
        input.resume(); // resume data events on the input
    });
    
    output.on("error", err => { // If we get an error on the output,
        callback(err); // call the callback with the error
        process.exit(); // and quit.
    });

    output.on("finish", () => { // When output is fully written
        callback(null); // call the callback with no error.
    });
}

let from = process.argv[2], to = process.argv[3];

console.log(`Copying file ${from} to ${to}...`);

copyFile(from, to, err => {
    if (err) {
    console.error(err);
    } else {
    console.log("done.");
    }
});

//Paused mode

/*
The other mode for Readable streams is “paused mode.” This is the mode that streams
start in. If you never register a “data” event handler and never call the pipe() method,
then a Readable stream remains in paused mode. In paused mode, the stream does
not push data to you in the form of “data” events. Instead, you pull data from the
stream by explicitly calling its read() method. This is not a blocking call, and if there
is no data available to read on the stream, it will return null. Since there is not a 
synchronous API to wait for data, the paused mode API is also event-based.Readable
stream in paused mode emits “readable” events when data becomes available to read
on the stream. In response, your code should call the read() method to read that
data. You must do this in a loop, calling read() repeatedly until it returns null. It is
necessary to completely drain the stream’s buffer like this in order to trigger a new
“readable” event in the future.If you stop calling read() while there is still readable
data, you will not get another “readable” event and your program is likely to hang.

IMPORTANT: Streams in paused mode emit “end” and “error” events just like flowing mode 
streams do. If you are writing a program that reads data from a Readable stream and writes it
to a Writable stream, then paused mode may not be a good choice. In order to properly
handle backpressure, you only want to read when the input stream is readable
and the output stream is not backed up. In paused mode, that means reading and
writing until read() returns null or write() returns false, and then starting reading
or writing again on a readable or drain event. This is inelegant, and you may
find that flowing mode (or pipes) is easier in this case.

The following code demonstrates how you can compute a SHA256 hash for the contents
of a specified file. It uses a Readable stream in paused mode to read the contents
of a file in chunks, then passes each chunk to the object that computes the hash.*/

const fs = require("fs");
const crypto = require("crypto");

// Compute a sha256 hash of the contents of the named file and pass the
// hash (as a string) to the specified error-first callback function.
function sha256(filename, callback) {
    let input = fs.createReadStream(filename); // The data stream.
    let hasher = crypto.createHash("sha256"); // For computing the hash.

    input.on("readable", () => { // When there is data ready to read
        let chunk;
        
        while(chunk = input.read()) { // Read a chunk, and if non-null,
            hasher.update(chunk); // pass it to the hasher,
        } // and keep looping until not readable
    });

    input.on("end", () => { // At the end of the stream,
        let hash = hasher.digest("hex"); // compute the hash,
        callback(null, hash); // and pass it to the callback.
    });
    
    input.on("error", callback); // On error, call callback
}

// Here's a simple command-line utility to compute the hash of a file
sha256(process.argv[2], (err, hash) => { // Pass filename from command line.
    if (err) { // If we get an error
        console.error(err.toString()); // print it as an error.
    } else { // Otherwise,
        console.log(hash); // print the hash string.
    }
});

//16.6 Process, CPU, and Operating System Details

/*
The global Process object has a number of useful properties and functions that generally
relate to the state of the currently running Node process. Consult the Node documentation
for complete details, but here are some properties and functions you should be aware of:

process.argv // An array of command-line arguments.
process.arch // The CPU architecture: "x64", for example.
process.cwd() // Returns the current working directory.
process.chdir() // Sets the current working directory.
process.cpuUsage() // Reports CPU usage.
process.env // An object of environment variables.
process.execPath // The absolute filesystem path to the node executable.
process.exit() // Terminates the program.
process.exitCode // An integer code to be reported when the program exits.
process.getuid() // Return the Unix user id of the current user.
process.hrtime.bigint() // Return a "high-resolution" nanosecond timestamp.
process.kill() // Send a signal to another process.
process.memoryUsage() // Return an object with memory usage details.
process.nextTick() // Like setImmediate(), invoke a function soon.
process.pid // The process id of the current process.
process.ppid // The parent process id.
process.platform // The OS: "linux", "darwin", or "win32", for example.
process.resourceUsage() // Return an object with resource usage details.
process.setuid() // Sets the current user, by id or name.
process.title // The process name that appears in `ps` listings.
process.umask() // Set or return the default permissions for new files.
process.uptime() // Return Node's uptime in seconds.
process.version // Node's version string.
process.versions // Version strings for the libraries Node depends on.

The “os” module (which, unlike process, needs to be explicitly loaded with
require()) provides access to similarly low-level details about the computer and
operating system that Node is running on. You may never need to use any of these
features, but it is worth knowing that Node makes them available:

const os = require("os");

os.arch() // Returns CPU architecture. "x64" or "arm", for example.
os.constants // Useful constants such as os.constants.signals.SIGINT.
os.cpus() // Data about system CPU cores, including usage times.
os.endianness() // The CPU's native endianness "BE" or "LE".
os.EOL // The OS native line terminator: "\n" or "\r\n".
os.freemem() // Returns the amount of free RAM in bytes.
os.getPriority() // Returns the OS scheduling priority of a process.
os.homedir() // Returns the current user's home directory.
os.hostname() // Returns the hostname of the computer.
os.loadavg() // Returns the 1, 5, and 15-minute load averages.
os.networkInterfaces() // Returns details about available network. connections.
os.platform() // Returns OS: "linux", "darwin", or "win32", for example.
os.release() // Returns the version number of the OS.
os.setPriority() // Attempts to set the scheduling priority for a process.
os.tmpdir() // Returns the default temporary directory.
os.totalmem() // Returns the total amount of RAM in bytes.
os.type() // Returns OS: "Linux", "Darwin", or "Windows_NT", e.g.
os.uptime() // Returns the system uptime in seconds.
os.userInfo() // Returns uid, username, home, and shell of current user.

//16.7 Working with Files

