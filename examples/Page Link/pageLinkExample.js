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
	 * Implementations of orion.page.link must define the following attributes:
	 * -----------------------------------------------------------------------------
	 * 
	 * name {String} A human readable link name.
	 *     Typically used as an HTML anchor element body, or in a tooltip.
	 * 
	 * id {String} A symbolic id for referencing this link.
	 * 
	 * uriTemplate {String} A URI Template that defines the link.
	 *     This template may use the standard Orion URI template variables.
	 */
	var serviceProperties = {
        name: "Sites",
        id: "orion.sites",
        uriTemplate: "{+OrionHome}/sites/sites.html"
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.page.link", ServiceImpl, serviceProperties);
	provider.connect();
};