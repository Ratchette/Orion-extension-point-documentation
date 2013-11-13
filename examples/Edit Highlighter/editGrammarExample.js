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
	 * Headers contains Optional metainformation displayed in Orion's settings page
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
		 * 		please see the file "additional_examples/content_types.html" for more informaiton 
		 */
        contentType: ["text/plain"],
        
        /**
         * What kind of highlight provider you are using. Possible values
         *      "grammar"
         *      "highlighter"
         */
        type: "grammar",
        
        /**
         * [OPTIONAL] when type === "grammar", this is the grammer used to assign style classes
         *      The syntax of this element can be found here: 
         *      http://manual.macromates.com/en/language_grammars.html
         */
        grammar: {
           patterns: [
               {
                  begin: "<\s*bold\s*>",
                  end: "<\s*\\s*bold\s*>",
                  captures: { "0": "punctuation.definition.comment.html" },
                  contentName: "comment.block.html"
               }
           ]
       }
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.highlighter", {}, serviceProperties);
	provider.connect();
};