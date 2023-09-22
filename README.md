# console
@jumpcutking/console is a pretty console reporting system created to support event listening and consistent reporting. It modifies the node.js global console to offer a consistent and stunning experience, as well as unlimited object depth.

This was forked from a console module used in @jumpcutking/threads.

## Installation
```bash
npm install @jumpcutking/console
```

## Usage
```javascript
var jckConsole = require('@jumpcutking/console');
jckConsole.startup({ options });
```

**options**

| Name | Type | Description |
| --- | --- | --- |
| reportToConsole | <code>boolean</code> | Automatically report to the terminal and console. |
| generateStacktrace | <code>boolean</code> | Automatically generate a stacktrace object for each log message, will return them to the callback function only. |
| storeLogs | <code>boolean</code> | should I store logs in memory |