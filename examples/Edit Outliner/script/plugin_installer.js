/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global Tautologistics orion self window*/

window.onload = function(){
	function parseHeadings(content){
		var outline = [];
	    var lines, line;
	    var match;
	    
	    lines = content.split(/\r?\n/);
	    for (var i=0; i < lines.length; i++) {
	        line = lines[i];
	        match = /^=\s*(.+?)\s*=$/.exec(line);
	      
	        if (match) {
	        	// remove the = tags from the header
	        	
	        	// FIXME - change so that it only grabs the name of the header (without the ==)
	        	// FIXME - modify to accomidate nesting of headers (to give an example of the header tags)
	            outline.push({
	                label: match[1],
	                line: i+1  // lines are numbered from 1
	       	    });
	        }
	    }
		return outline;
	}
	
	// The functionality of your plugin
	var outlineService = {
		/**
		 * Orion 4.0 Compliant
		 * @param {ObjectReference} editorContext allows two way communication 
		 * 				between the plugin and the Orion Editor
		 * 				- Please see "Editor Context Informaiton.txt" for more 
		 * 
		 * @param {String} options.contentType the The Content Type ID of the file
		 * 				being edited. Please see the file "List of Content Types.txt"
		 * 				for more informaiton 
		 * 
		 * @return {Array} an array consisting of the elements that compose an outline
		 * 
		 * Each element of the Array can contain the following properties:
		 * =================================================================
		 * label 		= The text that will be shown in the outline
		 * 
		 * [className] 	= A space-separated list of CSS class names to be applied to the label
		 * [children] 	= An Array of nested elements
		 * 
		 * 
		 * Please only use one of the following:
		 * --------------------------------------
		 * [line] 		= The line in the file this label will link to. For finer control 
		 * 					please see the variables column, start, end, text inside the
		 * 					 orion.util.hashFromPosition() documentation on orion wiki.
		 * [href]		= The URL that this label will link to
		 */
		computeOutline: function(editorContext, options){
			// FIXME - make this work
		//return editorContext.getText().then(parseHeadings);
		
			return [{label:"4.0 Compliance: The method editorContext.getText() does not appear to be working yet ..."}];
		//	return parseHeadings("===Heading===\n more infor\n== Heading 2 ===");
		},
		
		
		/**
		 * Orion 3.0 Compliant
		 * @param {String} contents The contents of the file being edited
		 * @param {String} title The path and the filename of the file being edited
		 * @return {Array} an array consisting of the elements that compose an outline
		 * 
		 * Each element of the Array can contain the following properties:
		 * =================================================================
		 * label 		= The text that will be shown in the outline
		 * 
		 * [className] 	= A space-separated list of CSS class names to be applied to the label
		 * [children] 	= An Array of nested elements
		 * 
		 * 
		 * Please only use one of the following:
		 * --------------------------------------
		 * [line] 		= The line in the file this label will link to. For finer control 
		 * 					please see the variables column, start, end, text inside the
		 * 					 orion.util.hashFromPosition() documentation on orion wiki.
		 * [href]		= The URL that this label will link to
		 */
		getOutline: function(contents, title){
			return parseHeadings(contents);
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
		id: "orion.edit.outliner.mediawiki headings",
		
		/**
		 * The name of your plugin
		 */
		name: "Mediawiki Headings Plugin",
		
		/**
		 * The list of file types that your plugin will work under
		 * 		please see the file "List of Content Types.txt" for more informaiton 
		 */
        contentType: ["text/plain"]
	};
	
	
	/**
	 * Register the plugin with Orion
	 * *** DO NOT TOUCH BELOW THIS LINE ***
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.outliner", outlineService, serviceProperties);
	provider.connect();
};