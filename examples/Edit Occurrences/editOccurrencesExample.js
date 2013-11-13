/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window*/

window.onload = function(){
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
		 * @return {Array} I don't know ...
		 */
		computeOccurrences: function(editorContext, context) {
           return [];
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
		/**
		 * The list of file types that your plugin will work under
		 * 		please see the file "additional_informaiton/content_types.html" for more informaiton 
		 */
        contentType: ["text/x-markdown"]
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.occurrences", serviceProvider, serviceProperties);
	provider.connect();
};