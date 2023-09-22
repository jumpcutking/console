# console
@jumpcutking/console is a pretty console reporting system created to support event listening and consistent reporting. It modifies the node.js global console to offer a consistent and stunning experience and unlimited object depth.

This module works in node.js but needs to be tested for use in the web browser. For complete documentation, please visit [the docs](https://github.com/jumpcutking/console/blob/main/docs/index.js.md).

This was created from a console module I used in [@jumpcutking/threads](https://github.com/jumpcutking/threads#threads).

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

@jumpcutking/console will not override the console global object until you have called the startup() function using the options below. @jumpcutking/console will throw an error if it's called more than once.

**options**

| Name | Type | Description |
| --- | --- | --- |
| reportToConsole | <code>boolean</code> | Automatically report to the terminal and console. |
| generateStacktrace | <code>boolean</code> | Automatically generate a stacktrace object for each log message, will return them to the callback function only. |
| storeLogs | <code>boolean</code> | should I store logs in memory |
| depth | <code>boolean</code> | The depth to inspect objects. 0 is unlimited. |

## Adding a callback or Listening to an Event
@jumpcutking/console supports (2) callbacks: one for when the console is called and another for when a specific supported console function is called.

You can add a callback using the module or global console objects.

Adding an entry callback will allow you to listen to all console calls, regardless of type. This is useful for saving the entries into a file or database.

```javascript
jckConsole.on('entry', function (type, nessage, args, stack) {
    // Your code here...
});

// or

console.on('entry', function (type, nessage, args, stack) {
    // Your code here...
});
```

```javascript
jckConsole.on("warn", function (message, args, stack) {
});

// or

console.on("warn", function (message, args, stack) {
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


**Stacktrace Object**

The stacktrace is an object, not a string, for ease of use.

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