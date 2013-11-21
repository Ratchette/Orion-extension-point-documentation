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
	
	
	/**
	 * Implementations of orion.page.content must define the following attributes:
	 * -----------------------------------------------------------------------------
	 * 
	 * name {String} The name of the content
	 *     This is shown as the title of the page in the Orion banner
	 * 
	 * id {String} A symbolic id for referencing this extension point.
	 * 
	 * uriTemplate {String} a URI Template that defines the href for the iframe content.
	 *     When content is opened, it might be targeted against a particular file or folder. In 
	 *     this case, the template variables can refer to file or folder metadata from the target file.
	 *     In addition to the standard variables used in Orion and the file/folder metadata,
	 *     some special variables are used:
	 *         SaveURL refers to a URL that can be used to save content back to Orion.
	 *         ExitURL refers to a URL that can be used if the user chooses to exit the embedded application.
	 * 
	 *     for more informaiton, please see: 
	 *         http://wiki.eclipse.org/Orion/Documentation/Developer_Guide/Plugging_into_Orion_pages#URI_Templates
	 * 
	 * [OPTIONAL] saveToken {Object[]} An Array of objects describing token(s) that appear in the URL of
	 *     the page that saves the content. 
	 *     The saveToken is used to find the location of any content stored by the plugin.
	 */
	var serviceProperties = {
	   id: "orion.pixlr.content",
	   
       name: "Pixlr",
       
       saveToken: [{token: "imgapi?image=", terminator: "&"}],
       
       uriTemplate: "http://pixlr.com/editor/?image={+OrionHome}{+Location}&referrer=Orion&title={Name}&locktype=true&exit={+ExitURL}&target={+SaveURL}imgapi&locktitle=true,contentProvider=orion.pixlr.content"
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.page.content", {}, serviceProperties);
	provider.connect();
};