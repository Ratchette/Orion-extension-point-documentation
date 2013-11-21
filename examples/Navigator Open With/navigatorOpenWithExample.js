/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window*/

window.onload = function(){
	/**
	 * No service methods need to be defined for a grammar; it is purely declarative
	 */

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
	     * editor {String} The ID of the editor we want to associate. 
	     *     This must match exactly the editor's ID as given in orion.edit.editor.
	     */
        editor: "orion.pixlr",
        
        /**
         * contentType {String[]} An array of one or more content type IDs that will be associated with the editor.
         *  NOTE: All of the contnet types except for pxd are pre-defined in Orion.
         */
        contentType: ["image/pxd", "image/jpeg", "image/png", "image/pxd"]
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.navigate.openWith", {}, serviceProperties);
	provider.connect();
};