/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global Tautologistics orion self esprima window*/

window.onload = function(){
	
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
		computeAST: function(astContext) {
           var ast = esprima.parse(astContext.text, {
                        loc: true,
                        range: true,
                        raw: true,
                        tokens: true,
                        comment: true,
                        tolerant: true
                     });
           if (ast.errors) {
               ast.errors = ast.errors.map(serialize.serializeError);
           }
           return ast;
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
		id: "orion.core.astprovider.javascript",
		
		/**
		 * The name of your plugin
		 */
		name: "JavaScript AST generator",
		
		/**
		 * The list of file types that your plugin will work under
		 * 		please see the file "List of Content Types.txt" for more informaiton 
		 */
        contentType: ["application/javascript"]
	};
	
	
	/**
	 * Register the plugin with Orion
	 * *** DO NOT TOUCH BELOW THIS LINE ***
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.core.astprovider", outlineService, serviceProperties);
	provider.connect();
};