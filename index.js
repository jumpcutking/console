/**
 * Used to replace Node's built in console, with one we can attach
 * a listerner to. This enables children to send messages to the
 * parent thread using console.log's known syntax.
 * 
 * During debug mode, a child thread will report to the console
 * as normal otherwise the console on the child thread will be
 * silenced.
 * 
 * Do NOT USE console.log inside this module, this will result in a loop.
 * Use the Logger callback for looging the orginal message or use the myConsole object.
 * 
 * This has not been tested to work client side.
 * 
 * (c) Justin K Kazmierczak, 2023. All rights reserved.
 * MIT License.
 * 
 *
 * @module @jumpcutking/console
 * @license MIT
 * @author @jumpcutking
 * @example <caption>See the test.js file for an example of how to use this module.</caption>
 * var jckConsole = require('./index.js');
 * jckConsole.startup({
 *     // generateStacktrace: true,
 *     storeLogs: true,
 *     // depth: 4
 * });
 * 
 * jckConsole.on('entry', function (type, nessage, args, stack) {
 *     // your code here
 * });
 * 
 * console.on("warn", function (message, args, stack) {
 *     // your code here
 * });
 * 
 * console.info("Hello World!");
 */

/**
 * Start's the console and sets up the event listener.
 * @param {*} _options The options to set for the console. 
 * @see {@link module:@jumpcutking/console~option} for a list of options
 * @public
 */
function startup(_options = {}) {

    // for each options in _options set it or report the option isn't valid
    for (const option in _options) {
        if (Object.hasOwnProperty.call(_options, option)) {
            const value = _options[option];
            if (option in options) {
                options[option] = value;
            } else {
                console.warn(`The option '${option}' is not a valid option for the @jumpcutking/console.`);
            }
        }
    }

    // console.log("Console is ready.")
    console = zconsole();
}; module.exports.startup = startup;
module.exports.init = startup;

/**
 * Adds a callback to the specified callback type.
 * @param {string} type The string of the supported callback type.
 * @param {function} callback The callback function to add.
 * @see {@link module:@jumpcutking/console~callbacks} for a list of supported callback types.
 * @see {@link module:@jumpcutking/console~MostCallbackExample} for an example for what most of the callbacks will need to look like.
 * @see {@link module:@jumpcutking/console~EntryCallbackExample} for an example for what the entry callback will need to look like.
 * @throws {Error} If the callback type is not supported.
 * @public
 */
function on(type, callback) {
    
    if (type in callbacks) {
        callbacks[type].push(callback);
    } else {
        throw new Error(`Unsupported callback type: ${type}`);
    }
    
} module.exports.on = on;


/**
 * An example callback for all events except the entry event.
 * @param {*} message The message provided to the console object.
 * @param {*} args The additional arguments provided to the console object.
 * @param {*} stack The stacktrace object.
 * @see {@link module:@jumpcutking/console~parseStackTrace} for the stacktrace object format.
 * @see {@link module:@jumpcutking/console~callbacks} for a list of supported callback types.
 * @callback MostCallbackExample
 */
var MostCallbackExample = function (message, args, stack) {
};

/**
 * An example callback for only the entry events.
 * @param {*} type The type of console message.
 * @see {@link module:@jumpcutking/console~zconsole} for a list of supported types.
 * @param {*} message The message provided to the console object.
 * @param {*} args The additional arguments provided to the console object.
 * @param {*} stack The stacktrace object.
 * @see {@link module:@jumpcutking/console~parseStackTrace} for the stacktrace object format.
 * @callback EntryCallbackExample
 */
var EntryCallbackExample = function (type, nessage, args, stack) {
};

/**
 * The callback functions for each type of console message.
 * @type {Object} The callback object.
 * @property {Array} log The log event listeners.
 * @property {Array} info The info event listeners.
 * @property {Array} warn The warn event listeners.
 * @property {Array} error The error event listeners.
 * @property {Array} debug The debug event listeners.
 * @property {Array} entry Any entry will fire this event.
 */
var callbacks = {
    log: [],
    info: [],
    warn: [],
    error: [],
    debug: [],
    entry: []
}

/**
 * The console object for the child thread to use.
 * @type {Object} The console object.
 * @property {boolean} reportToConsole Automatically report to the terminal and console. 
 * @default true
 * @property {boolean} generateStacktrace Automatically generate a stacktrace object for each log message, will return them to the callback function only.
 * @default false
 * @property {boolean} storeLogs should I store logs in memory
 * @default false
 * @property {boolean} depth The depth to inspect objects. 0 is unlimited.
 * @default 0
 */
var options = {
    reportToConsole: true,
    generateStacktrace: false,
    storeLogs: false,
    depth: 0
}

/**
 * Creates a new stacktrace and conforms it to a stacktrace object {@link module:@jumpcutking/console~parseStackTrace} to a standard format.
 * @param {*} stacktrace The error.stack string.
 * @param {*} _levelToRemove The number of lines (or calls) to remove from the stacktrace. It will automatically remove the "Error" line, and it's own call. levlToRemove is appended to "2", removing the first 2 lines.
 * @returns {Object} The stacktrace object.
 * @see {@link module:@jumpcutking/console~parseStackTrace} for the stacktrace object format.
 * @public
 */
function GenerateStacktrace(_levelToRemove = 0) {

    return parseStackTrace((new Error()).stack, 2 + _levelToRemove);

} module.exports.GenerateStacktrace = GenerateStacktrace;

/**
 * Parses a stacktrace into a standard format.
 * Any unknown format will be added to the stacktrace as a string. 
 * This is helpful for Error: top line messages.
 * @param {*} stackTrace The error.stack string.
 * @param {*} removeLvl The number of lines (or calls) to remove from the stacktrace.
 * @returns {Array} An array of stack objects.
 * @property {Object} stack The stacktrace object.
 * @property {string} stack.call The function or object called.
 * @property {string} stack.file The file the message originated from.
 * @property {number} stack.line The line the message originated from.
 * @property {number} stack.column The column the message originated from.
 * @public
 */
function parseStackTrace(stackTrace, removeLvl = 0) {
    var lines = stackTrace.split('\n');

    //remove the lines from the top of the stacktrace
    if (removeLvl > 0) lines.splice(0, removeLvl);

    var newStack = [];

    var patternWithCall = /at (.*) (.+):(\d+):(\d+)/;
    var patternWithoutCall = /at (.+):(\d+):(\d+)/;
  
    for (var line of lines) {
        var match = line.trim();

        if (match == "") {
            continue;
        }

        match = match.match(patternWithCall);

        if (!match) {
        match = line.match(patternWithoutCall);
        }


        if (match) {
        
          var [, call, file, lineNum, columnNum] = match;

          //remove only frist instance of ( from file
          if (file[0] == "(") {
            // remove first character
            file = file.substring(1);
          }


          var newObj = {
            call: call || false, // Set call to empty string if it doesn't exist
            file: file,
            line: parseInt(lineNum, 10),
            column: parseInt(columnNum, 10),
          }

          if (columnNum == undefined) {
            newObj.call = null;
            newObj.file = call;
            newObj.line = parseInt(file, 10);
            newObj.column = parseInt(lineNum, 10);
          }

            newStack.push(newObj);

        } else {

            newStack.push(line);

        }
    
    }
  
    return newStack;
} module.exports.parseStackTrace = parseStackTrace;

/**
 * The log entries, if options.storeLogs is true.
 * @type {Array} The log entries.
 * @see {@link module:@jumpcutking/console~options} for more information.
 * @property {string} entries[].type The type of console message.
 * @property {string} entries[].message The message provided to the console object.
 * @property {*} entries[].args The additional arguments provided to the console object.
 * @property {object[]} entries[].stack The stacktrace object.
 * @property {Datetime} entries[].when The time the entry was created.
 * @see {@link module:@jumpcutking/console~parseStackTrace} for the stacktrace object format.
 */
var entries = [];

/**
 * Returns any stored entries.
 * Don't forget to activate the storeLogs option {@link module:@jumpcutking/console~options}.
 * @returns {Array} The log entries.
 * @see {@link module:@jumpcutking/console~entries} for more information.
 * @throws {Error} If logs are not being stored.
 * @public
 */
function getEntries() {

    if (!options.storeLogs) {
        throw new Error("Logs are not being stored.");
    }

    return entries;
} module.exports.getEntries = getEntries;

/**
 * Clears any stored entries.
 * Don't forget to activate the storeLogs option {@link module:@jumpcutking/console~options}.
 * @see {@link module:@jumpcutking/console~entries} for more information.
 * @public
 */
function clearEntries() {
    entries = [];
} module.exports.clearEntries = clearEntries;


/**
 * @see {@link https://github.com/jumpcutking/threads} Moved from @jumpcutking/threads
 * This replaces the normal console object, globally, for easy reporting to the 
 * developer. This is used in Threads for consisitent reporting. 
 * 
 * Currently supported methods:
 * @property {function} log The log function.
 * @property {function} info The info function.
 * @property {function} warn The warn function.
 * @property {function} error The error function.
 * @property {function} debug The debug function.
 * @returns {Object} The new console object.
 */
var zconsole = () => {
    return {
        log: function (...args) {
            pLog("log", args, myConsole.log);
        },
        info: function (...args) {
            pLog("info", args, myConsole.info);
        },
        warn: function (...args) {
            pLog("warn", args, myConsole.warn);
        },
        error: function (...args) {
            pLog("error", args, myConsole.error); 
        },
        debug: function (...args) {
            pLog("debug", args, myConsole.debug);
        },
        /**
         * @alias module:@jumpcutking/console~on
         * @param {*} type 
         * @param {*} callback 
         */
        on: function (type, callback) {
            on(type, callback);
        },
        /**
         * @alias module:@jumpcutking/console~getEntries
         */
        getEntries: function () {
            return getEntries();
        },
        /**
         * @alias module:@jumpcutking/console~clearEntries
         */
        clearEntries: function () {
            return clearEntries();
        },
        /**
         * @alias module:@jumpcutking/console~options
         */
        options: function () {
            return options;
        }
    };
};

/**
 * This function calls the specified callbacks in order of their addition.
 * @param {string} callbackType The string of the supported callback type.
 * @param {*} type The type of console message.
 * @param {*} args The arguments provided to the console object.
 * @param {*} stack The stacktrace object.
 * @see {@link module:@jumpcutking/console~parseStackTrace} for the stacktrace object format.
 * @see {@link module:@jumpcutking/console~callbacks} for a list of supported callback types.
 * @see {@link module:@jumpcutking/console~MostCallbackExample} for an example for what most of the callbacks will need to look like.
 */
function call(callbackType, type, args, stack = null) {
    
    // myConsole.info("Calling Callbacks", callbackType, type, args, stack);

    var message = args[0];
    // if message is not a string don't use it
    if (typeof message !== "string") {
        message = "";
    } else {
        //remove the message from the args
        args.shift();
    }

    if (callbackType in callbacks) {

        if (callbackType == "entry") {
            for (var callback of callbacks[callbackType]) {
                callback(type, message, args, stack)
            }
        } else {
            for (var callback of callbacks[callbackType]) {
                callback(message, args, stack)
            }
        }

    } else {
        throw new Error(`Unsupported callback type: ${callbackType}`);
    }
} //module.exports.call = call;

/**
 * A log event has occured.
 * This event will call the callback functions. 
 * 
 * Clones objects for each callback, so they can't modify the original.
 * 
 * @see {@link module:@jumpcutking/console~MostCallbackExample} for a list of supported callback types.
 * @see {@link module:@jumpcutking/console~EntryCallbackExample} for an example for what the entry callback will need to look like.
 * @param {*} type The type of log event that occured.
 * @param {*} args The arguments provided to the console object.
 * @param {*} logger The function to call to log the message.
 */
function pLog(type, args, logger) {
    
    var stack = null;

    if (options.generateStacktrace) {
        stack = GenerateStacktrace(2)
    }

    //store the entry
    if (options.storeLogs) {
        if (!stack) {
            //why record a stacktrace if we don't have one?
            entries.push({
                type: type,
                message: args[0],
                args: args,
                when: new Date()
            });
        } else {
            entries.push({
                type: type,
                message: args[0],
                args: args,
                stack: stack,
                when: new Date()
            });
        }
    }

    if (!stack) {
        call("entry", type + "", [...args]);
        call(type + "", type + "", [...args]);
    } else {
        call("entry", type + "", [...args], [...stack]);
        call(type + "", type + "", [...args], [...stack]);
    }

    // myConsole.log("Example Stack Trace: ", stacktrace)
    if (options.reportToConsole) {
        sharePrettyLog({
            message: type,
            objects: args
        }, logger);
    }



} //module.exports.pLog = pLog;

/**
 * Shares a Pretty Log message in the terminal
 * @param {*} msg The message object containing the console.f(...args) from the child.
 * @param {*} logHandler The function to call to log the message. Do NOT USE console.log!
 */
function sharePrettyLog(msg, logHandler) {

    // console.log(msg);

    var logHandler = logHandler;
    var color = false;

    switch (msg.message) {
        case "log":
            //this is default
            break;
        case "info":
            color = colorOf.blue;
            // logHandler = console.info; 
            break;
        case "warn":
            color = colorOf.yellow;
            // logHandler = console.warn;
            break;
        case "error":
            color = colorOf.red;
            // logHandler = console.error;
            break;
        case "debug":
            color = colorOf.green;
            // logHandler = console.debug;
            break;
        default:
            console.warn(`Threads received an unknown log message type (${msg.message}) from a child thread.`);
            break;
    }

    var firstObj = msg.objects[0];

    if (color) {
        firstObj = color(firstObj);
    }

    //remove first object if it's a string
    if (typeof firstObj === "string") {
        msg.objects.shift();

        //if I have only one data object (second arg), don't wrap it in an array.
        if (msg.objects.length == 1) {
            msg.objects = msg.objects[0];
        }

        //Util.inspect produces a string not an object, so we append it at such.

        //check to see if objects is now an empty array
        if (msg.objects.length == 0) {
            logHandler(`${firstObj}`);
        } else {
            //insert a tab
            // var tab = "\t";

            if (options.depth == 0) {
                logHandler(`${firstObj} `
                + colorOf.white(util.inspect(msg.objects, {showHidden: false, depth: null, colors: true})));
            } else {
                logHandler(`${firstObj} `
                + colorOf.white(util.inspect(msg.objects, {showHidden: false, depth: options.depth, colors: true})));
            }
        }

    } else {
        logHandler(
        util.inspect(msg.objects, {showHidden: false, depth: null, colors: true}));
    }

} //module.exports.sharePrettyLog = sharePrettyLog;

/**
 * The console contrustor, for creating and working with the console.
 * @see {@link https://nodejs.org/api/console.html} for more information.
 */
var Console = require("node:console").Console;

/**
 * The colors module, used to colorize and beautify the console output.
 * @see {@link https://www.npmjs.com/package/colors} for more information.
 */
var colorOf = require("colors");

/**
 * The util module, used to inspect objects.
 * @see {@link https://nodejs.org/api/util.html} for more information.
 */
var util = require("util");

/**
 * A fresh instance of the console object.
 * This keeps a refrence to the console without
 * any loopbacks during global replacement.
 * @type {Object} The console object.
 * @see {@link https://nodejs.org/api/console.html} for more information.
 */
var myConsole = Console({ stdout: process.stdout, stderr: process.stderr }); 
