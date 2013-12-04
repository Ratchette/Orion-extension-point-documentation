/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window*/

window.onload = function(){
	// The functionality of your plugin
	var serviceProvider = {
	    /**
		 * Takes the user-supplied command-line arguments and optionally returns a response value.
		 * ----------------------------------------------------------------------------------------
		 * @param args {Object} An object with the user-supplied command-line arguments (if any)
		 * @param context {Object}
		 *        context.cwd {String} indicating the user's current working directory
		 *                             in the Shell page
		 * 
		 * 
		 * The basic return value types of callback() are:
		 * ------------------------------------------------
		 * Implementations of callback() can return either a value with one of these basic types, 
		 * or an orion.Deferred. 
		 *
	     * to use a delegated UI, invoke Deferred.progress({uriTemplate: url, width: string, height: string})
		 *    uriTemplate = the url of the content to show in the provided frame (example). 
		 * 
		 * Then return the command's result by using:
		 *    window.parent.postMessage(JSON.stringify({pageService: "orion.page.delegatedUI", 
		 *            source: theCommandName, result: theResultValue}), "*");
	     * 
	     * The only context where a contributed command would NOT define this service method is to 
	     * assist with the contribution of sub-commands. For example, to contribute commands 
	     * "tar create" and "tar extract", a parent command "tar" without a service method must 
	     * first be contributed.
	     */
        callback: function(args, context) {
             var result = new orion.Deferred();
             var url = window.location.href;
             
             url = url.substring(0, url.lastIndexOf('/'));
             
             setTimeout(function() {
               result.progress({uriTemplate: url + "/delegatedUI.html", width: "400px", height: "100px"});
             });
             
             return result;
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
	/**
	 * Implementations of orion.shell.command define the following attributes:
	 * ========================================================================
	 * 
	 * name {String} The name that is typed at the command line to invoke the command
	 * 
	 * [OPTIONAL] description {String} A brief description of the command
	 * [OPTIONAL] manual {String} A longer description of the command
	 * 
	 * [OPTIONAL] parameters {String} An array of the parameters that the 
	 *             command accepts
	 * 
	 * The Shell page currently uses GCLI as its underlying shell widget, and consequently
	 * has adopted its syntax for parameter specification. More information can be found at
	 * https://wiki.mozilla.org/DevTools/Features/GCLI
	 * 
	 * 
	 * The basic parameter object attributes are:
	 * -------------------------------------------
	 * name {String} the parameter's identifier
	 * 
	 * type {string | boolean | number | array | selection 
	 *        | file | blob | a custom orion.shell.type}
	 * 
	 * [OPTIONAL] description {String} A brief description of the parameter
	 * 
	 * [OPTIONAL] defaultValue {String} The value assumed by the parameter if the user does
	 *     not supply a value for it. 
	 * 
	 *     Specifying this makes the parameter optional.
	 */
	var serviceProperties = {
		name: "authExample",
        description: "An example of the delegated UI shell command service"
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.shell.command", serviceProvider, serviceProperties);
	provider.connect();
};