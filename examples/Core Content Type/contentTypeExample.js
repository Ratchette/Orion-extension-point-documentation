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
	     * contentTypes {ContentType[]} An array of one or more content types to register. 
	     *     Each element of the array defines a new content type.
	     * 
	     * contentTypes.id {String} The unique identifier of the content type. 
	     *     This is a simple hierarchical name and should start with a category like "text" or "image".
	     * 
	     * contentTypes.name {String} The user-readable name of the content type. 
	     * 
	     * [OPTIONAL] contentTypes.extension {String[]} Array of file extensions characterizing this content type. 
	     *     (Extensions are given without the leading "." character). 
	     *     NOTE: extensions are unique. if two content types both register against the same extension, 
	     *         one content type will be chosen arbitrarily over the other.
	     * 
	     * [OPTIONAL] contentTypes.filename {String[]} Array of filenames characterizing this content type. 
	     *     Use this when a type does not have a characteristic file extension, but rather a
	     *     filename. (For example, "Makefile", "README", "passwd").
	     * 
	     * [OPTIONAL] contentTypes.extends {String}
	     *     If this content type is a subtype of another, this gives the parent content type's ID.
	     * 
	     * [OPTIONAL] contentTypes.image {String}
	     *     URL of an image to display beside files of this type (for example, in the Orion navigator)
	     */
	    contentTypes:
            [{
                id: "image/pxd",
                name: "PXD",
                extension: ["pxd"]
            }]
        };
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.navigate.openWith", {}, serviceProperties);
	provider.connect();
};