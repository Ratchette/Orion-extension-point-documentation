/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window document*/

window.onload = function(){
	/**
	 * No service methods need to be defined for a grammar; it is purely declarative
	 */
	var serviceImpl = {};

	/**
	 * headers contains Optional metainformation displayed in Orion's settings page
	 * It can help you uniquely identify this plugin
	 */
	var headers = {
		name: "PLUGIN NAME",
		version: "0.0.0",
		description: "PLUGIN DESCRIPTION"
	};
	
	
	// FIXME - move this bellow somehow?
	var temp = document.createElement('a');
    temp.href = "testContent.zip";
	
	/**
     * Implementations of orion.core.content may define the following attributes:
     * ===========================================================================
     * 
     * @param name {String} The user visible name of the content
     * 
     * @param id {String} The extension point id.
     * 
     * @param description {String} The user visible description which explains what the content contains.
     * 
     * 
     * Only one of the following properties will be considered:
     * ---------------------------------------------------------
     * [OPTIONAL] uriTemplate {String} A URI Template that defines a link to another page that
     *     can generate the content. 
     *     If this property is specified, then the contentURIProperty property will be ignored.
     * 
     * [OPTIONAL] contentURITemplate {String} A URI Template that defines a link to content
     *     that should be imported into a project.
     */
	var serviceProperties = {
	    id: "orion.content.test",
        name: "Another Exemplary Sample Site",
        description: "Generate a sample site from Susan's test plugin.",
        contentURITemplate: temp.href
    };
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.core.content", serviceImpl, serviceProperties);
	provider.connect();
};