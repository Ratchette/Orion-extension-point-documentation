/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion esprima window*/

window.onload = function(){
	
	// The functionality of your plugin
	var outlineService = {
		/**
		 * Orion 4.0 Compliant
		 * @param {Object} astContext contains all of the information needed to 
		 * 					compute the AST.
		 * 
		 * @param {String} astContext.text Contains all of the text inside 
		 * 					the file currently open in the editor
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
               ast.errors = ast.errors.map(orion.serialize.serializeError);
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