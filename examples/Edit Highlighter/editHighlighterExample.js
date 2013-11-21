///*******************************************************************************
// * @license
// * FIXME - needs a liscence
// *******************************************************************************/
//
///*global orion window*/
//
//window.onload = function(){    
//	// The functionality of your plugin
//	var serviceProvider = {
//        /**
//         * Hilighters must define the following method: setContentType(contentTypeId)
//         * @param {String} contentTypeId The Content Type ID of the file that is being edited.
//         * 
//         * No service methods need to be defined for a grammar; they are purely declarative
//         */
//        setContentType: function(contentType) {
//            var mime = getMimeForContentTypeId(contentType.id);
//            if (mime) {
//                highlighter.setMode(mime);
//            } else {
//                console.log("Missing MIME in content type " + contentType.id);
//            }
//        }
//        
//        // Turn the service implementation into an event emitter
//        EventTarget.attach(highlighterServiceImpl);
//        provider.registerService("orion.edit.highlighter",
//                highlighterServiceImpl,
//                { type: "highlighter",
//                  contentType: contentTypes
//                });
//        highlighter.addEventListener("StyleReady", function(styleReadyEvent) {
//                styleReadyEvent.type = "orion.edit.highlighter.styleReady";
//                highlighterServiceImpl.dispatchEvent(styleReadyEvent);
//        });
//	};
//
//	/**
//	 * headers contains Optional metainformation displayed in Orion's settings page
//	 * It can help you uniquely identify this plugin
//	 */
//	var headers = {
//		name: "PLUGIN NAME",
//		version: "0.0.0",
//		description: "PLUGIN DESCRIPTION"
//	};
//	
//	
//	/**
//	 * Highlighters must define the following attributes:
//grammar
//Object Optional. When the type of this provider is "grammar", this attribute holds an object giving the grammar to be used to assign style classes. This object is a JavaScript equivalent of the format described here.
//	 */
//	
//	// FIXME - Trace these variables through Eclipse Orion to find out where they are going
//	var serviceProperties = {
//		/**
//		 * The list of file types that your plugin will work under
//		 * 		please see the file "additional_examples/content_types.html" for more informaiton 
//		 */
//        contentType: ["text/plain"],
//        
//        /**
//         * What kind of highlight provider you are using. Possible values
//         *      "grammar"
//         *      "highlighter"
//         */
//        type: "highligher",
//        
//        /**
//         * [OPTIONAL] when type === "grammar", this is the grammer used to assign style classes
//         *      The syntax of this element can be found here: 
//         *      http://manual.macromates.com/en/language_grammars.html
//         */
//	};
//	
//	
//	/**
//	 * Register the plugin with Orion
//	 */
//	
//	EventTarget.attach(highlighterServiceImpl);
//	var provider = new orion.PluginProvider(headers);
//	provider.registerServiceProvider("orion.edit.highlighter", serviceProvider, serviceProperties);
//	provider.connect();
//};