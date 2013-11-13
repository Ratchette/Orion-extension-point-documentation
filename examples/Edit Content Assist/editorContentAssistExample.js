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
         *          - Please see "additional_information/editor_context.html" for more information
         * 
         * @param {String} options.delimiter The line delimiter being used in the editor
         *					(CRLF, LF, etc.)
         *
         * @param {String} options.indentation The leading whitespace at the start of the line.
         *
         * @param {String} options.line The text of the line
         * 
         * @param {Number} options.offset The offset into the document at which content assist
         *					is being requested.
         * 
         * @param {String} options.prefix String The substring extending from the first non-word
         *					character preceding the editing caret up to the editing caret.
         *
         *					This may give a clue about what the user was in the process of typing 
         *					and help narrow down the results to be returned. 
         *
         *					The prefix is just a guess; it is not appropriate for all types of 
         *					document, depending on their syntax rules.
         *
         * @param {orion.editor.Selection} options.selection The current selection from the editor
         * 
         * @param {String} options.tab The tab character being used in the editor. 
         *					Typical values are a Tab character, or a sequence of four spaces.
         * 
         * 
         * @return {Array} an array consisting of completion suggestions
         *                  Alternatively, a Deferred may be returned, which allows the 
         *					suggestions to be computed asynchronously.
         * 
         * Result elements must be "proposal" objects having the following properties:
         * =================================================================
         * {String} proposal = The text that will be placed in the editor
         *							(It will be inserted at the offset)
         * 
         * {String} description = A description of the completion to be shown in the 
         *                          content assist popup
         *
         * [{Array} position]   = An optional Array of positions within the completion proposal 
         *							that require user input. 
         *
         *							Supplying this property will cause the editor to enter linked
         *							mode, and the user can use the Tab key to iterate through the
         *							regions of the proposal that require user input. 
         *
         *							For example if the completion is a function, the positions 
         *							could indicate the function arguments that need to be supplied.
         *							Entries in this position array must be objects with two integer
         *							properties: offset, and length describing the regions requiring
         *							user input.
         *
         * [{Number} escapePosition] = The offset of the cursor once the completion is inserted.
         *								If this value is not supplied, the cursor will be 
         *								positioned at the end of the inserted text.
         *
         * [{String} style]	= Styling information for the proposal. Availabile styles:
         *						"default" = no styling, also used if this property is not present
         *						"emphasis" = proposal displayed in bold
         *						"noemphasis" = proposal is greyed out with a colored background
         *						"hr" = proposal displayed as a <hr/> and is not selectable
         */
        computeContentAssist: function(editorContext, options) {
            var keywords = ['mercury', 'venus', 'earth', 'mars', 'jupiter',
                            'saturn', 'uranus', 'neptune'];
            var proposals = [];

            for (var i = 0; i < keywords.length; i++) {
                var keyword = keywords[i];

                if (keyword.indexOf(options.prefix) === 0) {
                    proposals.push({
                        proposal: keyword.substring(options.prefix.length) + '>' +
                                    options.delimiter + options.indentation + options.tab +
                                    options.delimiter + options.indentation + '</' +
                                    keyword + '>' + options.delimiter,
                        
                        description: keyword,
                        
                        escapePosition: options.offset + (keyword.length - options.prefix.length) +
                                         1 + options.delimiter.length + options.indentation.length +
                                         options.tab.length
                    });
                }
            }

            return proposals;
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
         *  - It must begin with orion.edit.contentAssist
         *  - The text that follows should uniquely identify the functionality you are adding
         */
        id: "orion.edit.contentAssist.tagAssist",

        /**
         * The name of your plugin
         */
        name: "HTML Tag Contnet Assist",

        /**
         * The list of file types that your plugin will work under
         *      please see the file "additional_informaiton/content_types.html" for more informaiton 
         */
        contentType: ["text/html"]
    };


    /**
     * Register the plugin with Orion
     */
    var provider = new orion.PluginProvider(headers);
    provider.registerServiceProvider("orion.edit.contentAssist", serviceProvider, serviceProperties);
    provider.connect();
};