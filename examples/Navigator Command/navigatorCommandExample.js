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
		 * This method is only called if there is no uriTemplate service attribute
		 * 
		 * @param selection A navigator selection
		 * 
		 */
		// fixme - test this
		run: function(selection){
		    window.alert("Running code on: " + selection.Location);
		}
	};

	/**
	 * headers contains Optional metainformation displayed in Orion's settings page
	 * It can help you uniquely identify this plugin
	 */
	var headers = {
		name: "PLUGIN NAME",
		version: "0.0.0",
		description: "PLUGIN DESCRIPTION",
		
		postInstallUrl:"../plugin/list.html"
	};
	
	
	// FIXME - Trace these variables through Eclipse Orion to find out where they are going
	var serviceProperties = {
        
        /**
         * [OPTIONAL] The URL of an icon to associate with the command
         * 
         * image: "http://www.google.com/favicon.ico",
         */
	    
		/**
		 * Unique command ID identifier
		 */
		id: "navigator.command.example",
		
		/**
         * The command text show to the user
		 */
		name: "Google Search",
		
		/**
		 * A boolean attribute specifying whether the command supports only a single selected item or multiple items
		 */
		forceSingleItem: true,
        
        /**
         * [OPTIONAL] A URI Template that defines a link to another page, using variables from the selected
         *  object's metadata or validation properties. 
         * 
         * If this property is specified, then the run service method will never be called.
         * 
         * For more information on how to construct a uriTemplate, please see
         *      http://tools.ietf.org/html/rfc6570
         */
        uriTemplate: "http://www.google.com/#q=\"{Name}\"",
        
        /**
         * Tooltip text shown to the user when they hover on the command
         */
        tooltip: "Link to google search for this file name",

        /**
         * [OPTIONAL] An array of Validation Properties used to determine if the selected object should offer this command.
         * 
         * validationProperties: [
		 *			{source: "Directory", match: false}
		 *		],
         */
        
        /**
         * [OPTIONAL] defaults to false. 
         *  A boolean attribute specifying whether this command should be shown in file contexts other than the navigator.
         */
        showGlobally: true
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.navigate.command", serviceProvider, serviceProperties);
	provider.connect();
};