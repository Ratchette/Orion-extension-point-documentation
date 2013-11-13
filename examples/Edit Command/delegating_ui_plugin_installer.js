///*******************************************************************************
// * @license
// * FIXME - needs a liscence
// *******************************************************************************/
//
///*global orion window*/
//window.onload = function(){	
//	// The functionality of your plugin
//	var serviceProvider = {
//		/**
//		 * Delegated UI is not presently Orion 4.0 compliant.
//		 */
//		
//		/**
//		 * Orion 3.0 Compliant
//		 * @param {String} selectedText The text that is currently selected in the editor
//		 * @param {String} text The entire buffer being edited
//		 * @param {orion.editor.Selection} The current selection in the editor
//		 * @param {String} resource The path and filename of the file open in the editor
//		 * 
//		 * @return {CommandResult} A string of replacement text or an object with the 
//		 * 				following properties
//		 * 
//		 * Each element of the CommandResult object can contain the following properties:
//		 * ===============================================================================
//		 * 
//		 * Please only use one of the following two:
//		 * -----------------------------------------
//		 * text 		= The replacement text. This string will override everything 
//		 * 					inside the selection buffer
//		 * uriTemplate	= A new UI iframe will open with this UI
//		 * 					The delegated UI must post a message back to the parent window
//		 * 					This replay is an object that identifies the iframe as a delegatedUI
//		 * 
//		 * 					it also contains a result property that describes the new selection 
//		 * 					text or the replacement text object. 
//		 * -----------------------------------------
//		 * 
//		 * [height] 	= Desired height of the delegated UI in css units such as px, em, etc.
//		 * [width]		= Desired width of the delegated UI in css units such as px, em, etc.
//		 * 
//		 * [selection] 	= A selection object containing a new selection object
//		 * 
//		 * [status] 	= A status object containing information that will be displayed in
//		 * 					the statys notification area	
//		 * [status.severity] = A string consisting of "Warning" or "Error".
//		 * [status.message]	 = The status message that will be displayed. This string will
//		 * 						be interpreted to be in markdown syntax, and as such may
//		 * 						contain hyperlinks.
//		 */
//		run: function(selectedText, text, selection, resource){
//			return{
//				uriTemplate: "http://com.example/myDelegatedUI#" + resource, 
//				width: "600px", 
//				height: "400px"
//			};
//		}
//	};
//
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
//	// FIXME - Trace these variables through Eclipse Orion to find out where they are going
//	var serviceProperties = {
//		/* Unique ID identifier
//		 *  - It should begin with orion.edit.command
//		 *  - The text that follows should uniquely identify the functionality you are adding
//		 */
//		id: "orion.edit.command.delegatedUI.example",
//		
//		/**
//		 * The name of your plugin
//		 */
//		name: "Delegated UI",
//		
//		/**
//		 * OPTIONAL: The list of file types that your plugin will work under
//		 * 		please see the file "List of Content Types.txt" for more informaiton 
//		 */
//        contentType: ["text/plain"],
//        
//        /**
//         * OPTIONAL: a tooltip describing the command
//         */
//        tooltip: "Insert tooltip here",
//        
//        /**
//         * OPTIONAL: The URL of an icon to associate with the command.
//         *  The icon may not appear in all situations.
//         * 
//         * img: "path/to/image",
//         */
//        
//        /**
//         * OPTIONAL: the key binding for the plugin
//         * Please see the constructor for orion.textview.KeyBinding for more information 
//         * @see https://orion.eclipse.org/jsdoc/symbols/orion.KeyBinding.html
//         * 
//         * This particular example will trigger at the key combination: ctrl-shift-v
//         */
//        key: ["v", true, true]
//        
//        /**
//         * OPTIONAL: An array Validation Properties that must match the editor's file
//         * 		in order for the command to appear.
//         * 
//         * Please see examples/validation_properties.html or the wiki for more inforamtion
//         * @see http://wiki.eclipse.org/Orion/Documentation/Developer_Guide/Plugging_into_Orion_pages#Validation_Properties
//         * 
//         *  validationProperties: validationProperties: [{
//		 *     source: "GitUrl", 
//		 *     match: "github\.com.*\.git", 
//		 *     variableName: "GitHubLocation", 
//		 *     variableMatchPosition: "only",
//		 *     replacements: [{pattern: ":", replacement: "/"}, {pattern: ".git$", replacement: ""}]
//		 *  }]
//         */
//	};
//	
//	
//	/**
//	 * Register the plugin with Orion
//	 */
//	var provider = new orion.PluginProvider(headers);
//	provider.registerServiceProvider("orion.edit.command", serviceProvider, serviceProperties);
//	provider.connect();
//};