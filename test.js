/**
 * Attach to a copy of the @jumpcloud/console module.
 * Do so at the top of your script, only do so once.
 */
var jckConsole = require('./index.js');
jckConsole.startup({
    // generateStacktrace: true,
    storeLogs: true,
    // depth: 1
});

/**
 * You can attach to the console object to listen for events.
 * You can attach to jckConsole module or the console global.
 * They will do the same thing.
 */

var recievedEntries = [];
jckConsole.on('entry', function (type, nessage, args, stack) {
    recievedEntries.push({
        type: type,
        nessage: nessage,
        args: args,
        stack: stack
    });
});

var recievedWarnings = [];
console.on("warn", function (message, args, stack) {
    recievedWarnings.push({
        message: message,
        args: args,
        stack: stack
    });
});

console.info("Hello World!");
console.warn("Danger Will Robinson!");
console.log("I should have 3 entries and 1 warning.", {
    recievedEntries: recievedEntries,
    recievedWarnings: recievedWarnings
});

if (recievedEntries.length != 3) {
    throw new Error("Test failed! Expected 3 entries, got " + recievedEntries.length);
}

if (recievedWarnings.length != 1) {
    throw new Error("Test failed! Expected 1 warning, got " + recievedWarnings.length);
}

console.log("Let's take a look at the entries!", console.getEntries());

if (console.getEntries().length != 4) {
    throw new Error("Test failed! Getting Entries failed Expected 4 entries, got " + console.getEntries().length);
}

console.clearEntries();

console.log("Hello again!");

console.log("Let's make sure we are clearing them!", console.getEntries());

if (console.getEntries().length != 2) {
    throw new Error("Test failed! Clearing entries didn't work! Expected 2 entry, got " + console.getEntries().length);
}