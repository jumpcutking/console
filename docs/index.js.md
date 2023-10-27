# index.js
<a name="module_@jumpcutking/console"></a>

## @jumpcutking/console
Used to replace Node's built in console, with one we can attach
a listerner to. This enables children to send messages to the
parent thread using console.log's known syntax.

During debug mode, a child thread will report to the console
as normal otherwise the console on the child thread will be
silenced.

Do NOT USE console.log inside this module, this will result in a loop.
Use the Logger callback for looging the orginal message or use the myConsole object.

This has not been tested to work client side.

(c) Justin K Kazmierczak, 2023. All rights reserved.
MIT License.

**Author**: @jumpcutking  
**License**: MIT  
**Example** *(See the test.js file for an example of how to use this module.)*  
```js
var jckConsole = require('./index.js');
jckConsole.startup({
    // generateStacktrace: true,
    storeLogs: true,
    // depth: 4
});

jckConsole.on('entry', function (type, nessage, args, stack) {
    // your code here
});

console.on("warn", function (message, args, stack) {
    // your code here
});

console.info("Hello World!");
```

* [@jumpcutking/console](#module_@jumpcutking/console)
    * [~procDir](#module_@jumpcutking/console..procDir)
    * [~callbacks](#module_@jumpcutking/console..callbacks) : <code>Object</code>
    * [~options](#module_@jumpcutking/console..options) : <code>Object</code>
    * [~entries](#module_@jumpcutking/console..entries) : <code>Array</code>
    * [~Console](#module_@jumpcutking/console..Console)
    * [~colorOf](#module_@jumpcutking/console..colorOf)
    * [~util](#module_@jumpcutking/console..util)
    * [~myConsole](#module_@jumpcutking/console..myConsole) : <code>Object</code>
    * [~startup(_options)](#module_@jumpcutking/console..startup)
    * [~on(type, callback)](#module_@jumpcutking/console..on)
    * [~GenerateStacktrace(stacktrace, _levelToRemove)](#module_@jumpcutking/console..GenerateStacktrace) ⇒ <code>Object</code>
    * [~parseStackTrace(stackTrace, removeLvl)](#module_@jumpcutking/console..parseStackTrace) ⇒ <code>Array</code>
    * [~getEntries()](#module_@jumpcutking/console..getEntries) ⇒ <code>Array</code>
    * [~clearEntries()](#module_@jumpcutking/console..clearEntries)
    * [~zconsole()](#module_@jumpcutking/console..zconsole) ⇒ <code>Object</code>
    * [~on(type, callback)](#module_@jumpcutking/console..on)
    * [~getEntries()](#module_@jumpcutking/console..getEntries)
    * [~clearEntries()](#module_@jumpcutking/console..clearEntries)
    * [~options()](#module_@jumpcutking/console..options)
    * [~call(callbackType, type, args, stack, from)](#module_@jumpcutking/console..call)
    * [~pLog(type, args, logger)](#module_@jumpcutking/console..pLog)
    * [~generateSafeError(err)](#module_@jumpcutking/console..generateSafeError)
    * [~sharePrettyLog(msg, logHandler)](#module_@jumpcutking/console..sharePrettyLog)
    * [~MostCallbackExample](#module_@jumpcutking/console..MostCallbackExample) : <code>function</code>
    * [~EntryCallbackExample](#module_@jumpcutking/console..EntryCallbackExample) : <code>function</code>

<a name="module_@jumpcutking/console..procDir"></a>

### @jumpcutking/console~procDir
The current working directory of the process.

**Kind**: inner property of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
<a name="module_@jumpcutking/console..callbacks"></a>

### @jumpcutking/console~callbacks : <code>Object</code>
The callback functions for each type of console message.

**Kind**: inner property of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| log | <code>Array</code> | The log event listeners. |
| info | <code>Array</code> | The info event listeners. |
| warn | <code>Array</code> | The warn event listeners. |
| error | <code>Array</code> | The error event listeners. |
| debug | <code>Array</code> | The debug event listeners. |
| entry | <code>Array</code> | Any entry will fire this event. |

<a name="module_@jumpcutking/console..options"></a>

### @jumpcutking/console~options : <code>Object</code>
The console object for the child thread to use.

**Kind**: inner property of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**Default**: <code>false</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| reportToConsole | <code>boolean</code> | Automatically report to the terminal and console. |
| generateStacktrace | <code>boolean</code> | Automatically generate a stacktrace object for each log message, will return them to the callback function only. |
| storeLogs | <code>boolean</code> | should I store logs in memory |
| depth | <code>boolean</code> | The depth to inspect objects. 0 is unlimited. |
| showFrom | <code>boolean</code> | Show where the console message originated from to the console. |

<a name="module_@jumpcutking/console..entries"></a>

### @jumpcutking/console~entries : <code>Array</code>
The log entries, if options.storeLogs is true.

**Kind**: inner property of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**See**

- [options](#module_@jumpcutking/console..options) for more information.
- [parseStackTrace](#module_@jumpcutking/console..parseStackTrace) for the stacktrace object format.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| entries[].type | <code>string</code> | The type of console message. |
| entries[].message | <code>string</code> | The message provided to the console object. |
| entries[].args | <code>\*</code> | The additional arguments provided to the console object. |
| entries[].stack | <code>Array.&lt;object&gt;</code> | The stacktrace object. |
| entries[].when | <code>Datetime</code> | The time the entry was created. |
| entries[].from | <code>object</code> | A stacktrace array item for only the orginal caller. |

<a name="module_@jumpcutking/console..Console"></a>

### @jumpcutking/console~Console
The console contrustor, for creating and working with the console.

**Kind**: inner property of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**See**: [https://nodejs.org/api/console.html](https://nodejs.org/api/console.html) for more information.  
<a name="module_@jumpcutking/console..colorOf"></a>

### @jumpcutking/console~colorOf
The colors module, used to colorize and beautify the console output.

**Kind**: inner property of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**See**: [https://www.npmjs.com/package/colors](https://www.npmjs.com/package/colors) for more information.  
<a name="module_@jumpcutking/console..util"></a>

### @jumpcutking/console~util
The util module, used to inspect objects.

**Kind**: inner property of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**See**: [https://nodejs.org/api/util.html](https://nodejs.org/api/util.html) for more information.  
<a name="module_@jumpcutking/console..myConsole"></a>

### @jumpcutking/console~myConsole : <code>Object</code>
A fresh instance of the console object.
This keeps a refrence to the console without
any loopbacks during global replacement.

**Kind**: inner property of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**See**: [https://nodejs.org/api/console.html](https://nodejs.org/api/console.html) for more information.  
<a name="module_@jumpcutking/console..startup"></a>

### @jumpcutking/console~startup(_options)
Start's the console and sets up the event listener.

**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**Access**: public  
**See**: [module:@jumpcutking/console~option](module:@jumpcutking/console~option) for a list of options  

| Param | Type | Description |
| --- | --- | --- |
| _options | <code>\*</code> | The options to set for the console. |

<a name="module_@jumpcutking/console..on"></a>

### @jumpcutking/console~on(type, callback)
Adds a callback to the specified callback type.

**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**Throws**:

- <code>Error</code> If the callback type is not supported.

**Access**: public  
**See**

- [callbacks](#module_@jumpcutking/console..callbacks) for a list of supported callback types.
- [MostCallbackExample](#module_@jumpcutking/console..MostCallbackExample) for an example for what most of the callbacks will need to look like.
- [EntryCallbackExample](#module_@jumpcutking/console..EntryCallbackExample) for an example for what the entry callback will need to look like.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The string of the supported callback type. |
| callback | <code>function</code> | The callback function to add. |

<a name="module_@jumpcutking/console..GenerateStacktrace"></a>

### @jumpcutking/console~GenerateStacktrace(stacktrace, _levelToRemove) ⇒ <code>Object</code>
Creates a new stacktrace and conforms it to a stacktrace object [parseStackTrace](#module_@jumpcutking/console..parseStackTrace) to a standard format.

**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**Returns**: <code>Object</code> - The stacktrace object.  
**Access**: public  
**See**: [parseStackTrace](#module_@jumpcutking/console..parseStackTrace) for the stacktrace object format.  

| Param | Type | Description |
| --- | --- | --- |
| stacktrace | <code>\*</code> | The error.stack string. |
| _levelToRemove | <code>\*</code> | The number of lines (or calls) to remove from the stacktrace. It will automatically remove the "Error" line, and it's own call. levlToRemove is appended to "2", removing the first 2 lines. |

<a name="module_@jumpcutking/console..parseStackTrace"></a>

### @jumpcutking/console~parseStackTrace(stackTrace, removeLvl) ⇒ <code>Array</code>
Parses a stacktrace into a standard format.
Any unknown format will be added to the stacktrace as a string. 
This is helpful for Error: top line messages.
If an object is passed in, it will asume the stacktrace is already parsed and return it.

**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**Returns**: <code>Array</code> - An array of stack objects.  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| stackTrace | <code>\*</code> |  | The error.stack string. |
| removeLvl | <code>\*</code> | <code>0</code> | The number of lines (or calls) to remove from the stacktrace. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| stack | <code>Object</code> | The stacktrace object. |
| stack.call | <code>string</code> | The function or object called. |
| stack.file | <code>string</code> | The file the message originated from. |
| stack.line | <code>number</code> | The line the message originated from. |
| stack.column | <code>number</code> | The column the message originated from. |

<a name="module_@jumpcutking/console..getEntries"></a>

### @jumpcutking/console~getEntries() ⇒ <code>Array</code>
Returns any stored entries.
Don't forget to activate the storeLogs option [options](#module_@jumpcutking/console..options).

**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**Returns**: <code>Array</code> - The log entries.  
**Throws**:

- <code>Error</code> If logs are not being stored.

**Access**: public  
**See**: [entries](#module_@jumpcutking/console..entries) for more information.  
<a name="module_@jumpcutking/console..clearEntries"></a>

### @jumpcutking/console~clearEntries()
Clears any stored entries.
Don't forget to activate the storeLogs option [options](#module_@jumpcutking/console..options).

**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**Access**: public  
**See**: [entries](#module_@jumpcutking/console..entries) for more information.  
<a name="module_@jumpcutking/console..zconsole"></a>

### @jumpcutking/console~zconsole() ⇒ <code>Object</code>
**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**Returns**: <code>Object</code> - The new console object.  
**See**: [https://github.com/jumpcutking/threads](https://github.com/jumpcutking/threads) Moved from @jumpcutking/threads
This replaces the normal console object, globally, for easy reporting to the 
developer. This is used in Threads for consisitent reporting. 

Currently supported methods:  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| log | <code>function</code> | The log function. |
| info | <code>function</code> | The info function. |
| warn | <code>function</code> | The warn function. |
| error | <code>function</code> | The error function. |
| debug | <code>function</code> | The debug function. |

<a name="module_@jumpcutking/console..on"></a>

### @jumpcutking/console~on(type, callback)
**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  

| Param | Type |
| --- | --- |
| type | <code>\*</code> | 
| callback | <code>\*</code> | 

<a name="module_@jumpcutking/console..getEntries"></a>

### @jumpcutking/console~getEntries()
**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
<a name="module_@jumpcutking/console..clearEntries"></a>

### @jumpcutking/console~clearEntries()
**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
<a name="module_@jumpcutking/console..options"></a>

### @jumpcutking/console~options()
**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
<a name="module_@jumpcutking/console..call"></a>

### @jumpcutking/console~call(callbackType, type, args, stack, from)
This function calls the specified callbacks in order of their addition.

**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**See**

- [parseStackTrace](#module_@jumpcutking/console..parseStackTrace) for the stacktrace object format.
- [callbacks](#module_@jumpcutking/console..callbacks) for a list of supported callback types.
- [MostCallbackExample](#module_@jumpcutking/console..MostCallbackExample) for an example for what most of the callbacks will need to look like.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callbackType | <code>string</code> |  | The string of the supported callback type. |
| type | <code>\*</code> |  | The type of console message. |
| args | <code>\*</code> |  | The arguments provided to the console object. |
| stack | <code>\*</code> | <code></code> | The stacktrace object. |
| from | <code>\*</code> | <code></code> | A stacktrace object for only the orginal caller. |

<a name="module_@jumpcutking/console..pLog"></a>

### @jumpcutking/console~pLog(type, args, logger)
A log event has occured.
This event will call the callback functions. 

Clones objects for each callback, so they can't modify the original.

**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**See**

- [MostCallbackExample](#module_@jumpcutking/console..MostCallbackExample) for a list of supported callback types.
- [EntryCallbackExample](#module_@jumpcutking/console..EntryCallbackExample) for an example for what the entry callback will need to look like.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>\*</code> | The type of log event that occured. |
| args | <code>\*</code> | The arguments provided to the console object. |
| logger | <code>\*</code> | The function to call to log the message. |

<a name="module_@jumpcutking/console..generateSafeError"></a>

### @jumpcutking/console~generateSafeError(err)
Generates a safe and passable error message

**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>\*</code> | The error to generate a safe error message for. |

<a name="module_@jumpcutking/console..sharePrettyLog"></a>

### @jumpcutking/console~sharePrettyLog(msg, logHandler)
Shares a Pretty Log message in the terminal

**Kind**: inner method of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | The message object containing the console.f(...args) from the child. |
| logHandler | <code>\*</code> | The function to call to log the message. Do NOT USE console.log! |

<a name="module_@jumpcutking/console..MostCallbackExample"></a>

### @jumpcutking/console~MostCallbackExample : <code>function</code>
An example callback for all events except the entry event.

**Kind**: inner typedef of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**See**

- [parseStackTrace](#module_@jumpcutking/console..parseStackTrace) for the stacktrace object format.
- [callbacks](#module_@jumpcutking/console..callbacks) for a list of supported callback types.


| Param | Type | Description |
| --- | --- | --- |
| message | <code>\*</code> | The message provided to the console object. |
| args | <code>\*</code> | The additional arguments provided to the console object. |
| stack | <code>\*</code> | The stacktrace object. |
| from | <code>\*</code> | A stacktrace object for only the orginal caller. |

<a name="module_@jumpcutking/console..EntryCallbackExample"></a>

### @jumpcutking/console~EntryCallbackExample : <code>function</code>
An example callback for only the entry events.

**Kind**: inner typedef of [<code>@jumpcutking/console</code>](#module_@jumpcutking/console)  
**See**

- [zconsole](#module_@jumpcutking/console..zconsole) for a list of supported types.
- [parseStackTrace](#module_@jumpcutking/console..parseStackTrace) for the stacktrace object format.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>\*</code> | The type of console message. |
| message | <code>\*</code> | The message provided to the console object. |
| args | <code>\*</code> | The additional arguments provided to the console object. |
| stack | <code>\*</code> | The stacktrace object. |
| from | <code>\*</code> | A stacktrace object for only the orginal caller. |


