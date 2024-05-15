
# @jumpcutking/console

@jumpcutking/console is a sophisticated console reporting system designed to provide developers with enhanced feedback, including line traces of events, multi-object reporting, event listening, and consistent logging. This module modifies the Node.js global console to deliver a seamless and informative debugging experience with unlimited object depth.

Although currently optimized for server-side Node.js, future updates may include support for web browsers. For comprehensive documentation, please visit [the docs](https://github.com/jumpcutking/console/blob/main/docs/index.js.md).

This open-source project originates from a console module used in [@jumpcutking/threads](https://github.com/jumpcutking/threads#threads) and is a key component of [The Universe](https://egtuniverse.com) platform.

## Features

- **Enhanced Feedback:** Provides line traces of events, multi-object reporting, and event listening.
- **Consistent Logging:** Modifies the global console for a uniform logging experience.
- **Unlimited Depth:** Allows unlimited object depth for detailed inspection.
- **Error Handling:** Improved handling of undefined objects and safe error generation.

## What's New

### v1.7.0
- Added improved undefined object handling when passing objects to console.function("String", $obj).

### v1.6.0
- Additional bug fixes.
- Introduced `jckConsole.TruncateTopLevel` for reporting top-level object properties, useful for large objects without removing nested arrays and attached objects.

### v1.5.0
- `jckConsole` now provides `generateSafeError` for automatically generating safe, communicable error objects.
- Added a string variable to match the original stack trace item for easier debugging in VSCode.

## Installation

Install the module using NPM:

\`\`\`bash
npm install @jumpcutking/console
\`\`\`

## Usage

Integrating @jumpcutking/console is straightforward. Add the following code at the top of your script:

\`\`\`javascript
const jckConsole = require('@jumpcutking/console');
jckConsole.startup({ ...options });
\`\`\`

@jumpcutking/console will not override the global console object until \`startup()\` is called with the specified options.

### Options

| Name               | Type       | Description                                      |
|--------------------|------------|--------------------------------------------------|
| reportToConsole    | boolean    | Automatically report to the terminal and console.|
| generateStacktrace | boolean    | Generate a stacktrace object for each log message.|
| storeLogs          | boolean    | Store logs in memory.                            |
| depth              | number     | Depth to inspect objects (0 for unlimited).      |

## Adding a Callback or Listening to an Event

@jumpcutking/console supports two types of callbacks: one for all console calls and another for specific console functions.

### Example

\`\`\`javascript
jckConsole.on('entry', (type, message, args, stack, from) => {
    // Your code here...
});

// or

console.on('entry', (type, message, args, stack, from) => {
    // Your code here...
});
\`\`\`

\`\`\`javascript
jckConsole.on('warn', (message, args, stack, from) => {
    // Your code here...
});

// or

console.on('warn', (message, args, stack, from) => {
    // Your code here...
});
\`\`\`

### Supported Methods

| Name  | Type     | Description           |
|-------|----------|-----------------------|
| log   | function | The log function.     |
| info  | function | The info function.    |
| warn  | function | The warn function.    |
| error | function | The error function.   |
| debug | function | The debug function.   |

## Logging Entries

@jumpcutking/console can store logs in memory for later retrieval, each stamped with DateTime and, if enabled, a stacktrace object.

### Example

\`\`\`javascript
const entries = jckConsole.getEntries();
console.getEntries();

// Clear entries
jckConsole.clearEntries();
console.clearEntries();
\`\`\`

### Log Entry Object

| Name      | Type                | Description                                 |
|-----------|---------------------|---------------------------------------------|
| type      | string              | The type of console message.                |
| message   | string              | The message provided to the console object. |
| args      | *                   | Additional arguments provided.              |
| stack     | Array<object>       | Stacktrace object array.                    |
| when      | DateTime            | Entry creation time.                        |
| from      | object              | Stacktrace object for the original caller.  |

## Building Documentation

To build the documentation, run the following command:

\`\`\`bash
npm run docs
\`\`\`

Ensure you have the \`jsdoc-to-markdown\` module installed:

\`\`\`bash
npm install jsdoc-to-markdown
\`\`\`

## Using Node's Console Object

You can still use the original console object by creating a new instance after overriding the global console object.

\`\`\`javascript
const { Console } = require('node:console');
const myConsole = new Console({ stdout: process.stdout, stderr: process.stderr });
\`\`\`

### Code Overview

This module replaces Node's built-in console with one that supports event listeners, enabling child threads to communicate using console.log syntax. It is designed for server-side use and has not been tested for client-side applications.

For detailed implementation, refer to the source code and examples provided in the repository.

## Notes from the Project Creator

**Rewritten:** I've asked ChatGPT 4o to help me rewrite the README.md file for the @jumpcutking/console module. It's based on the one I've written and provides a deep indepth view of the code. If you have any questions, or prefer the older style, please let me know. Thank you!