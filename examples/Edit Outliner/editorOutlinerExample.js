/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window*/

window.onload = function(){
	// transforms the flat list of headings into a nested outline
	function nestHeadings(headings){
		var root;
		var parent;
		
		var curr_level;
		var i;
		
		root = parent = [];
		curr_level = 1;
			
		for(i=0; i<headings.length; i++){
			if(headings[i].level < curr_level){
				parent = root;
				curr_level = 1;
			}
	        
			while(Number(headings[i].level) > curr_level){
			  parent = parent[parent.length-1];
	
				if(typeof parent['children'] === "undefined"){
					parent.children = [];
				}
				parent = parent.children;
				curr_level = curr_level +1;
			}
			
			if(Number(headings[i].level) === curr_level){
				parent.push({
					label: headings[i].label,
					line: headings[i].line
				});
			}
	        
		}
		
		return root;
	};
	
	
	function findHeadings(content){
		var outline = [];
	    var lines, line;
	    var match;
	    
	    lines = content.split(/\r?\n/);
	    
	    // Collect the properties of every heading on the page
	    for (var i=0; i < lines.length; i++) {
	        line = lines[i];
	        match = /^(=+)\s*(.+?)\s*(=+)$/.exec(line);
	      
	        if (match){
	        	outline.push({
	                label: match[2],
	                line: i+1,  // lines are numbered from 1
	                level: match[1].length
	       	    });
	        }
	    }
	    
	    return nestHeadings(outline);
	};

	
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
			return editorContext.getText().then(findHeadings);
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
		 * [className] 	= A space-separated list of CSS class names to be applied to tohe label
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
			return findHeadings(contents);
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
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.outliner", serviceProvider, serviceProperties);
	provider.connect();
};