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
	 * Implementations of orion.page.link.related must define the following attributes:
	 * =================================================================================
	 * 
	 * id {String} A symbolic id for referencing this link.
	 * 
	 * name {String} A human readable link name, used in the "Related pages" menu.
	 * 
	 * tooltip {String} A tooltip that is used to describe the link
	 * 
	 * uriTemplate {String} A URI Template that defines the link.
	 *     This template may use page object metadata, declared variable names, or
	 *     standard Orion URI template variables.
	 * 
	 * [OPTIONAL] contentType {orion.core.ContentType}
	 *     An array of Content Type IDs for which this link is applicable.
	 * 
	 * [OPTIONAL] validationProperties An array of Validation Properties describing
	 *     whether the link is applicable, and optionally declaring variables to be used 
	 *     in the URI template.
	 */ 
	var serviceProperties = {
        id: "orion.git.gotoGithub",
        name: "Show in GitHub",
        tooltip: "Show this repository at GitHub",
        uriTemplate: "https://{GitHubLocation}",
        
    /** 
	 * The validation properties object has the following properties:
	 * ---------------------------------------------------------------
	 * source {String} The name of a property to look for in the target object. 
	 *     The ":" character represents nested properties, and the "|" character represents 
	 *     OR'ed properties. 
	 * 
	 *     For example, the source Location specifies that the page object must have a 
	 *     "Location" property, such as myObject.Location. The source Git:ContentLocation
	 *     specifies that the page object must have a sub-object and property such as 
	 *     myObject.Git.ContentLocation. 
	 * 
	 *     The source ChildrenLocation|ContentLocation means that the page object must have 
	 *     either a property such as myObject.ChildrenLocation or a property such as 
	 *     myObject.ContentLocation. The first property found will be used.
	 * 
	 * match {Object} A value used to validate the source property. 
	 *     In general, the value of the page object's property will be compared against 
	 *     this value. However, if this value is a string, the string is assumed to 
	 *     specify a regular expression that will be passed to the RegExp constructor.
	 *         
	 * [OPTIONAL] variableName {String} The name of a variable that represents the value 
	 *     of the source property. If specified, then an associated URI template may use a
	 *     variable of this name, and it will contain the value of the matched source property.
	 * 
	 * [OPTIONAL] variableMatchPosition {String} A string that specifies what part of a
	 *     matching string is used in the variable value when a regular expression was used 
	 *     to match the property.
	 *         "all" (default) means the entire property value should be substituted for
	 *             the variable.
	 *         "only" means only the matching part of the property value should be substituted
	 *             in the URI template.
	 *         "before" means the part before the match is substituted in the URI template.
	 *         "after" means the part after the match is substituted in the URI template.
	 * 
	 * [OPTIONAL] replacements {Array} Specifies an array of replacements (pattern and 
	 *     replace strings) that can be used to further modify a variable value used in 
	 *     a URI template.
	 */
		validationProperties: [{
	        source: "GitUrl", 
	        match: "github\.com.*\.git", 
	        variableName: "GitHubLocation", 
	        variableMatchPosition: "only",
	        replacements: [
	            {pattern: ":", replacement: "/"},
	            {pattern: ".git$", replacement: ""}
	        ]
	    }]
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.page.link.related", ServiceImpl, serviceProperties);
	provider.connect();
};