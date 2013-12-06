/*******************************************************************************
 * This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *******************************************************************************/

/*global orion window*/

window.onload = function(){
	// Meta information about your plugin
	// This data is only used in Orion's settings page
	var headers = {
		name: "PLUGIN NAME",
		version: "0.0.0",
		description: "PLUGIN DESCRIPTION"
	};
		
	/**
	 * Implementations of orion.edit.outliner define the following properties:
	 * ========================================================================
	 * id {String} A unique identifier for this plugin
	 * 			This should start with orion.edit.outliner
	 * 
	 * name {String} The name of this plugin that will be displayed as a menu option
	 * 
	 * contentType {Array} An array of Content Type IDs listing the types of files
	 * 			that this outliner can provide an outline for.
	 * 			please see the file "additional_examples/content_types.html" for more informaiton 
	 */
	var serviceProperties = {
		id: "orion.edit.outliner.mediawiki.headings",
		name: "Mediawiki Headings Plugin",
        contentType: ["text/plain"]
	};
	
	var serviceProvider = {
		/**
		 * The computeOutline method contains the following parameters
		 * ============================================================
		 * @param {ObjectReference} editorContext 
		 * 				- Please see "additional_information/editor_context.html" for more information
		 * 
		 * @param {String} options.contentType the The Content Type ID of the file
		 * 				being edited. Please see the file "additional_information/content_types.html"
		 * 				for more informaiton 
		 * 
		 * 
		 * @return {Array} an array of OutlineElement objects that compose an outline
		 * 		OutlineElement.label {String} The text that will be shown in the outline
		 * 
		 * 		[OPTIONAL] OutlineElement.className {String} a space-separated list of CSS class
		 * 			names to be applied to the label
		 * 
		 * 		[OPTIONAL] OutlineElement.children {Array} An Array of nested OutlineElements
		 * 
		 * Please only use one of the following:
		 * --------------------------------------
		 * 		[OPTIONAL] OutlineElement.line {Number} The line in the file this label will link to.
		 * 		[OPTIONAL] OutlineElement.href	{String} The URL that this label will link to
		 */
		computeOutline: function(editorContext, options){
		    return editorContext.getText().then(function(contents){
			    var outline = [];
			    var lines, line;
			    var match;
			    var i, j;
			    
			    lines = contents.split(/\r?\n/);
			    
			    // Collect the properties of every heading on the page
			    for (i=0; i < lines.length; i++) {
			        line = lines[i];
			        match = /^(=+)\s*(.+?)\s*(=+)$/.exec(line);
			        
			        if (match){
			        	outline.push({
			                label: match[1] + " " + match[2],
			                line: i+1  	// lines are numbered from 1
			       	    });
			        }
			    }
			    
			    return outline;
			});
		}
	};	
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.outliner", serviceProvider, serviceProperties);
	provider.connect();
};