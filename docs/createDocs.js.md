# createDocs.js
<a name="module_@jumpcutking/console/createDocs"></a>

## @jumpcutking/console/createDocs
Documentation Generator

This component may not be reversed engineered for hacking or abuse
of The EGT Universe, The Universe, or third-party apps.

Justin K Kazmierczak

May be subject to The Universe Terms of Service.

(c) Justin K Kazmierczak, 2023. All rights reserved.
MIT License.

**Auther**: @jumpcutking  
**License**: MIT  

* [@jumpcutking/console/createDocs](#module_@jumpcutking/console/createDocs)
    * [~jsdoc2md](#module_@jumpcutking/console/createDocs..jsdoc2md)
    * [~config](#module_@jumpcutking/console/createDocs..config)
    * [~fs](#module_@jumpcutking/console/createDocs..fs)
    * [~path](#module_@jumpcutking/console/createDocs..path)
    * [~GetDocsFor(inbound, outbound)](#module_@jumpcutking/console/createDocs..GetDocsFor)
    * [~errorToMarkdown(error)](#module_@jumpcutking/console/createDocs..errorToMarkdown) ⇒ <code>string</code>
    * [~start()](#module_@jumpcutking/console/createDocs..start)

<a name="module_@jumpcutking/console/createDocs..jsdoc2md"></a>

### @jumpcutking/console/createDocs~jsdoc2md
The jsdoc-to-markdown module, used to generate documentation from the js files.

**Kind**: inner property of [<code>@jumpcutking/console/createDocs</code>](#module_@jumpcutking/console/createDocs)  
**See**: {link https://www.npmjs.com/package/jsdoc-to-markdown} for more information.  
<a name="module_@jumpcutking/console/createDocs..config"></a>

### @jumpcutking/console/createDocs~config
The config file, used to configure the documentation generator.

**Kind**: inner property of [<code>@jumpcutking/console/createDocs</code>](#module_@jumpcutking/console/createDocs)  
**See**: {link ./docs.config.json} for more information.  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| folders[ | <code>object</code> | An array of objects. Provides information for the documentation generator to process folders. |
| folders[].inbound | <code>string</code> | The folder to read files from. |
| folders[].outbound | <code>string</code> | The folder to output the documentation to (uses the script directory + outboundPrefix + files[].outbound). |
| folders[].name | <code>string</code> | The name of the project or folder the documentation will use. |
| folders[].outboundPrefix | <code>string</code> | The prefix to prepend to the outbound folder path from the script directory. |
| intro | <code>string</code> | The default intro text to use for the documentation, if no intro is found in the file. |
| docusaurus | <code>boolean</code> | If true, the documentation will be cleaned of characters for Docusaurus. Also good for react. Universe Dcos or Universe Apps do not the file cleaned. |

<a name="module_@jumpcutking/console/createDocs..fs"></a>

### @jumpcutking/console/createDocs~fs
The fs module, used to read and write files.

**Kind**: inner constant of [<code>@jumpcutking/console/createDocs</code>](#module_@jumpcutking/console/createDocs)  
**See**: {link https://nodejs.org/api/fs.html} for more information.  
<a name="module_@jumpcutking/console/createDocs..path"></a>

### @jumpcutking/console/createDocs~path
The path module, used to resolve file paths.

**Kind**: inner constant of [<code>@jumpcutking/console/createDocs</code>](#module_@jumpcutking/console/createDocs)  
**See**: {link https://nodejs.org/api/path.html} for more information.  
<a name="module_@jumpcutking/console/createDocs..GetDocsFor"></a>

### @jumpcutking/console/createDocs~GetDocsFor(inbound, outbound)
Create md Documentation for the files in the inbound folder and output them to the doc folder.

**Kind**: inner method of [<code>@jumpcutking/console/createDocs</code>](#module_@jumpcutking/console/createDocs)  

| Param | Type | Description |
| --- | --- | --- |
| inbound | <code>string</code> | Fully qualified uri to the folder containing the files to document. |
| outbound | <code>string</code> | The name of the folder to output the docs to. |

<a name="module_@jumpcutking/console/createDocs..errorToMarkdown"></a>

### @jumpcutking/console/createDocs~errorToMarkdown(error) ⇒ <code>string</code>
Converts an error object to Markdown format.

**Kind**: inner method of [<code>@jumpcutking/console/createDocs</code>](#module_@jumpcutking/console/createDocs)  
**Returns**: <code>string</code> - - The error information in Markdown format.  
**Throws**:

- <code>Error</code> - If the input is not an Error object.


| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | The error object to convert. |

<a name="module_@jumpcutking/console/createDocs..start"></a>

### @jumpcutking/console/createDocs~start()
Start the documentation generator.

**Kind**: inner method of [<code>@jumpcutking/console/createDocs</code>](#module_@jumpcutking/console/createDocs)  

