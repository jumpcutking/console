/**
 * Documentation Generator
 * 
 * This component may not be reversed engineered for hacking or abuse
 * of The EGT Universe, The Universe, or third-party apps.
 * 
 * Justin K Kazmierczak
 * 
 * May be subject to The Universe Terms of Service.
 * 
 * (c) Justin K Kazmierczak, 2023. All rights reserved.
 * MIT License.
 * 
 * @module @jumpcutking/console/createDocs
 * @auther @jumpcutking
 * @license MIT
 */

/**
 * The fs module, used to read and write files.
 * @see {link https://nodejs.org/api/fs.html} for more information.
 */
const fs = require('fs');

/**
 * The path module, used to resolve file paths.
 * @see {link https://nodejs.org/api/path.html} for more information.
 */
const path = require('path');

/**
 * The jsdoc-to-markdown module, used to generate documentation from the js files.
 * @see {link https://www.npmjs.com/package/jsdoc-to-markdown} for more information.
 */
var jsdoc2md = require('jsdoc-to-markdown');

/**
 * The config file, used to configure the documentation generator.
 * @property {object} folders[] An array of objects. Provides information for the documentation generator to process folders.
 * @property {string} folders[].inbound The folder to read files from.
 * @property {string} folders[].outbound The folder to output the documentation to (uses the script directory + outboundPrefix + files[].outbound).
 * @property {string} folders[].name The name of the project or folder the documentation will use.
 * @property {string} folders[].outboundPrefix The prefix to prepend to the outbound folder path from the script directory.
 * @property {string} intro The default intro text to use for the documentation, if no intro is found in the file.
 * @property {boolean} docusaurus If true, the documentation will be cleaned of characters for Docusaurus. Also good for react. Universe Dcos or Universe Apps do not the file cleaned.
 * @see {link ./docs.config.json} for more information.
 */
var config = "";

try {
    config = require("./docs.config.json");
} catch (error) {
    throw new Error("Failed to load docs.config.json. Check that the file exists and is valid JSON. For more information, see the createDocs.md file in the documentation.");
}

/**
 * Create md Documentation for the files in the inbound folder and output them to the doc folder.
 * @param {string} inbound Fully qualified uri to the folder containing the files to document.
 * @param {string} outbound The name of the folder to output the docs to.
 */
async function GetDocsFor(inbound, outbound) {

    console.log("Starting docs generation for...", {
        inbound: inbound,
        outbound: outbound
    });

    const files = fs.readdirSync(inbound);


    //if the folder doesn't exist, create it.
    if (!fs.existsSync(outbound)) {
        fs.mkdirSync(outbound);
    }

    for (const file of files) {
        if (file.endsWith('.js')) {

                try {

                console.log(`Working on ${file}...`)

                var fullpath = path.resolve(inbound, `${file}`);
                var fileData = fs.readFileSync(fullpath, 'utf8');
                var intro, docs = "";
                docs += `# ${file}
`;

                console.log("Documenting", await jsdoc2md.getNamepaths({
                    files: [fullpath]
                }));

                //append the docs generated by jsdoc2md
                var code = jsdoc2md.renderSync({ 
                    files: [fullpath]
                }) + "\n";

                docs += code;

                if (config.docusaurus) {
                    // Docuusaurus and React compoents don't like special characters
                    // Typical documentation may not use these but more advanced documentation may.
                    // Use at your own risk.
                    docs = cleanDocString(docs);
                }

                // console.log("changes", docs);

                // process.exit(0);

                fs.writeFileSync(path.resolve(outbound, `${file}.md`), docs);

            } catch (error) {

                // if an issue was cuased becasue the file is not valid
                // jsdoc documented code, then we'll output the error in it's file for you.
                console.log(`Failed to generate docs for ${file}`, error);
                var docs = `# ${file} (err)

    Failed to generate docs for ${file}.

` + errorToMarkdown(error);

                docs = cleanDocString(docs);
    
                fs.writeFileSync(path.resolve(outbound, `${file}.md`), docs);

            }
        }
    }
}

/**
 * Converts an error object to Markdown format.
 * @param {Error} error - The error object to convert.
 * @returns {string} - The error information in Markdown format.
 * @throws {Error} - If the input is not an Error object.
 */
function errorToMarkdown(error) {
    if (!(error instanceof Error)) {
      throw new Error('Input must be an Error object');
    }
  
    const stackLines = error.stack.split('\n').map(line => `  ${line}`).join('\n\n');
  
    const markdown = `
  ### Error Details
  
  **${error.name}** ${error.message}

  **Stack Trace**:
  \`\`\`
${stackLines}
  \`\`\`
  `;
  
    return markdown;
}

function cleanDocString(doc) {
    return doc
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/\[/g, '&#91;')
    .replace(/\]/g, '&#93;') //<anonymous> Replace to 
    .replace(/<anonymous>/g, '&lt;anonymous&gt;')
    // .replace(/</g, '&lt;')
    // .replace(/>/g, '&gt;')
    ;
}

/**
 * Start the documentation generator.
 */
async function start() {

    //for each object in the array config
    for (var index = 0; index < config.folders.length; index++) {
        const doc = config.folders[index];
        
        doc.inbound = path.resolve(__dirname, doc.inbound);
        doc.outbound = path.resolve(__dirname, config.outboundPrefix, doc.outbound);

        // console.log("Full paths", {
        //     inbound: doc.inbound,
        //     outbound: doc.outbound
        // })

        await GetDocsFor(doc.inbound, doc.outbound);

    }

} start();