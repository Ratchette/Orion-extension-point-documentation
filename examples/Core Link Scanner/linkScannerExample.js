/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window*/

window.onload = function(){
    /**
	 * No service methods need to be defined for a grammar; it is purely declarative
	 */
	var ServiceImpl = {};


	/**
	 * headers contains Optional metainformation displayed in Orion's settings page
	 * It can help you uniquely identify this plugin
	 */
	var headers = {
		name: "PLUGIN NAME",
		version: "0.0.0",
		description: "PLUGIN DESCRIPTION"
	};
	
	
	/**
	 * Implementations of orion.core.linkScanner must define the following attributes:
	 * --------------------------------------------------------------------------------
	 * 
	 * pattern {String} A regular expression string to locate links in the source text
	 * 
	 * words {Number} The number of white-space delimited words in each match
	 * 
	 * anchor {String}  template of the URL for each match. 
	 *     The template may contain variables of the form %1, %2, etc, which are 
	 *     substituted by each of the words in the match.
	 */
	var serviceProperties = {
        pattern: "bug\\s\\d{4,7}",
        words: 2,
        anchor: "https://bugs.eclipse.org/%2"
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.core.linkScanner", ServiceImpl, serviceProperties);
	provider.connect();
};