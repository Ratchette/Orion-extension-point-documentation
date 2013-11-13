/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window*/

window.onload = function() {
    // The functionality of your plugin
    var serviceProvider = {
        /**
         * Orion 4.0 Compliant
         * @param {ObjectReference} editorContext 
         * 				- Please see "additional_information/editor_context.html" for more information
         * 
         * @param {String} options.contentType the The Content Type ID of the file
         * 				being edited. Please see the file "additional_information/content_types.html"
         * 				for more informaiton 
         * 
         * @param {String} options.title The path and filename of the file being edited
         * 
         * 
         * @return {Object} Returns (or fulfills to) an Object giving the validation result
         *              The returned object must have a problems property giving an 
         *              Array of problems found in the file.
         * 
         * A Problem object has the following properties:
         * =================================================================
         * {String} description = a description of the problem
         * 
         * [{String} severity]  = The severity of the problem found
         *          This effects how the problem is displayed in the User Interface
         *          Allowed values are:
         *              "error" (default)
         *              "warning"
         * 
         * 
         * For a line-based problem, you provide a line number and columns:
         * -----------------------------------------------------------------
         * {Number} line = the line where the problem was found
         *              NOTE: line numbers begin counting from 1
         * 
         * {Number} start = The colum within the line where the problem begins
         *              NOTE: columns begin counting from 1
         * 
         * [{Number} end] = The column within the line where the problem ends
         *              If this is ommited, the end is assumed to be at start + 1
         * 
         * 
         * For a document-based problem, you provide character offsets:
         * -------------------------------------------------------------
         * {Number} start = The offset where the problem begins
         *              0 = the first character in the document
         * 
         * [{Number} end] = The column within the line where the problem ends
         *              If this is ommited, the end is assumed to be at start + 1
         * 
         * NOTE: A document-based problem can span several lines.
         * 
         */
        computeProblems: function(editorContext, options) {
            return editorContext.getText().then(function(contents) {
                var problems = [];
                var lines, line;
                var match;

                lines = contents.split(/\r?\n/);
                for (var i = 0; i < lines.length; i++) {
                    line = lines[i];
                    
                    // check to see if there is any inline CSS
                    match = /(<.*)(style=[\'|\"].*[\'|\"])/.exec(line);
                    if (match) {
                        problems.push({
                            description: "Inline CSS",
                            line: i + 1,
                            start: match.index + match[1].length + 1,
                            end: match.index + match[1].length + match[2].length,
                            severity: "error"
                        });
                    }
                    
                    // check to see if the user used tables
                    match = /<\s*table/.exec(line);
                    if (match) {
                        problems.push({
                            description: "Using tables with a CSS stylesheet",
                            line: i + 1,
                            start: match.index + 1,
                            end: match.index + match[0].length + 1,
                            severity: "warning"
                        });
                    }
                }
                
                    
                var result = {
                    problems: problems
                };

                return result;
            });
        }
    };


    /**
     * headers contains Optional metainformation displayed in Orion's settings page
     * It can help you uniquely identify this plugin
     */
    var headers = {
        name: "PLUGIN NAME",
        version: "0.0.0",
        description: "PLUGIN DESCRIPTION"
    };


    // FIXME - Trace these variables through Eclipse Orion to find out where they are going
    var serviceProperties = {
        /* Unique ID identifier
         *  - It must begin with orion.edit.outliner
         *  - The text that follows should uniquely identify the functionality you are adding
         */
        id: "orion.edit.validator.cssChecker",

        /**
         * The name of your plugin
         */
        name: "CSS validator",

        /**
         * The list of file types that your plugin will work under
         *      please see the file "List of Content Types.txt" for more informaiton 
         */
        contentType: ["text/html"]
    };


    /**
     * Register the plugin with Orion
     */
    var provider = new orion.PluginProvider(headers);
    provider.registerServiceProvider("orion.edit.validator", serviceProvider, serviceProperties);
    provider.connect();
};