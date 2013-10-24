/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global Tautologistics eclipse self window*/

window.onload = function(){

	// The functionality of your plugin
	var outlineService = {
		/**
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
			var outline = [];
		    var lines, line;
		    var match;
		    
		    lines = contents.split(/\r?\n/);
		    for (var i=0; i < lines.length; i++) {
		        line = lines[i];
		        match = /^=\s*(.+?)\s*=$/.exec(line);
		      
		        if (match) {
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
	};


	// headers contains Optional metainformation displayed in Orion's settings page
	var headers = {
		name: "PLUGIN NAME",
		version: "0.0.0",
		description: "PLUGIN DESCRIPTION"
	};
	
	
	 // FIXME - Do these varaibles do anything other than sit in the carosel?
	var serviceProperties = {
		// Unique ID identifier
		id: "orion.edit.outliner.mediawiki headings",
		
		// The name of your plugin
		name: "Mediawiki Headings Plugin",
		
		// The list of file types that your plugin will work under
    	contentType: ["text/plain"]
	};
	
	
	// Register your plugin with Orion
	var provider = new eclipse.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.outliner", outlineService, serviceProperties);
	provider.connect();
};