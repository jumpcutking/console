# console
@jumpcutking/console is a pretty console reporting system created to support event listening and consistent reporting. It modifies the node.js global console to offer a consistent, stunning experience and unlimited object depth.

This module works on server node.js but may not be in the web browser. Future updates may provide a web version. For complete documentation, please visit [the docs](https://github.com/jumpcutking/console/blob/main/docs/index.js.md).

This open-source project was created from a console module I used in [@jumpcutking/threads](https://github.com/jumpcutking/threads#threads) and as part of [The Universe](https://egtuniverse.com) platform.

## What's New

### v1.5.0
jckConsole now provides generateSafeError and will automatically generate a safe communicatable error object. While JCKConsole doesn't override your error objects, it will convert error objects passed into it. I added a string variable to match the original stack trace item for easier debugging. Clicking on the line and column in VSCode's console will go to that line and column, making it easy to debug and develop.

### v1.2.0
jckConsole is happy to help developers know where a log entry has occurred. It's a new object, and It identifies the caller, the file, the line, and the column of the call.

This update is a breaking change to entry and log callbacks. A new "from" object will be passed to every one of the log callbacks. It will look very similar to a parsedStackTrace() line item.

This update also includes other bug fixes.

### v1.1.0 

Minor bug fixes, including a fix for the stacktrace object.

### v1.0 - First Release

This release includes fixes for objects passed into the console. To debug your console event handlers, create a private console attachment and use it to debug your code; otherwise, you will receive a maximum call stack error (caused by recursion).

```javascript
/**
 * A fresh instance of the console object.
 * This keeps a reference to the console without
 * any loopbacks during global replacement.
 * @type {Object} The console object.
 * @see {@link https://nodejs.org/api/console.html} for more information.
 */
var myConsole = Console({ stdout: process.stdout, stderr: process.stderr }); 
```


## Installation
Using NPM, install the module with the following command:
```bash
npm install @jumpcutking/console
```

## Usage
Using @jumpcutking/console is easy; add the following code at the top of your script.

```javascript
var jckConsole = require('@jumpcutking/console');
jckConsole.startup({ ...options });
```

@jumpcutking/console will not override the console global object until you have called the startup() function using the options below. @jumpcutking/console will throw an error if the startup() function is called more than once.

**options**

| Name | Type | Description |
| --- | --- | --- |
| reportToConsole | <code>boolean</code> | Automatically report to the terminal and console. |
| generateStacktrace | <code>boolean</code> | Automatically generate a stacktrace object for each log message, returning them to the callback function only. |
| storeLogs | <code>boolean</code> | should I store logs in memory |
| depth | <code>boolean</code> | The depth to inspect objects. 0 is unlimited. |

## Adding a callback or Listening to an Event
@jumpcutking/console supports (2) callbacks: one for when the console is called and another for when a specific supported console function is called.

You can add a callback using the module or global console objects.

Adding an entry callback will allow you to listen to all console calls, regardless of type. This is useful for saving the entries into a file or database.

```javascript
jckConsole.on('entry', function (type, message, args, stack, from) {
    // Your code here...
});

// or

console.on('entry', function (type, message, args, stack, from) {
    // Your code here...
});
```

```javascript
jckConsole.on("warn", function (message, args, stack, from) {
});

// or

console.on("warn", function (message, args, stack, from) {
});
```

Currently supported methods:  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| log | <code>function</code> | The log function. |
| info | <code>function</code> | The info function. |
| warn | <code>function</code> | The warn function. |
| error | <code>function</code> | The error function. |
| debug | <code>function</code> | The debug function. |

## Logging Entries
@jumpcutking/console can store logs in memory for later use. This is useful if you want to use them later. They are each stamped with a DateTime, and if you have generateStacktrace enabled, they will also include a stacktrace object.

```javascript
jckConsole.getEntries();
console.getEntries();

//clear entries
jckConsole.clearEntries();
console.clearEntries();
```

**Log Entry object**
getEntries() will return an array of log entry objects.

| Name | Type | Description |
| --- | --- | --- |
| entry.type | <code>string</code> | The type of console message. |
| entry.message | <code>string</code> | The message provided to the console object. |
| entry.args | <code>\*</code> | The additional arguments provided to the console object. |
| entry.stack | <code>Array.&lt;object&gt;</code> | An array of a stacktrace object. |
| entry.when | <code>Datetime</code> | The time the entry was created. |
| entry.from | <code>object</code> | A stacktrace object for only the orginal caller. |


**Stacktrace Object**

The stack trace is an object, not a string, for ease of use.

| Name | Type | Description |
| --- | --- | --- |
| stack.call | <code>string</code> | The function or object called. |
| stack.file | <code>string</code> | The file the message originated from. |
| stack.line | <code>number</code> | The line the message originated from. |
| stack.column | <code>number</code> | The column the message originated from. |

## Building Docs
To build the docs, run the following command:
```bash
npm run docs
```

Note: you'll have to install the jsdoc-to-markdown module to build the docs.

```bash
npm install jsdoc-to-markdown
```