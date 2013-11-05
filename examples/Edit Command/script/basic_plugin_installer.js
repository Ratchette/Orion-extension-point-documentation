/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window*/
window.onload = function(){
	// the functionality of the plugin
	function generateComment(text, selection){
		var comment;
		var newSelection;
		
		comment = text.substring(0, selection.start) + "/* " + 
			text.substring(selection.start,selection.end) + " */" +
			text.substring(selection.end);
			
		newSelection = {
			start: selection.start,
			end: selection.end + 6
		};
		
		return {
			text: comment,
			selection: newSelection
		};
	}
	
	// more functionality of the plugin
	function removeComment(text, selection){
		var originalText;
		var newSelection;
		
		originalText = text.substring(0, selection.start) +
			text.substring(selection.start + 3, selection.end - 3) +
			text.substring(selection.end);
			
		newSelection = {
			start: selection.start,
			end: selection.end - 6
		};
		
		return {
			text: originalText,
			selection: newSelection
		};
	}
	
	
	// The functionality of your plugin
	var outlineService = {
		/**
		 * Orion 4.0 Compliant
		 * @param {ObjectReference} editorContext 
		 * 				- Please see "examples/editor_context.html" for more information
		 * 
		 * @param {String} options.contentType the The Content Type ID of the file
		 * 				being edited. Please see the file "List of Content Types.txt"
		 * 				for more informaiton 
		 * 
		 * @param {String} options.input The Path and the filename of the file open
		 * 				in the editor
		 * 
		 * When the execute method has completed its execution it must call a command action
		 * using the editor context object. 	
		 * eg. by using setText() or setSelection()
		 */
		
		// FIXME - Make 4.0 compliant
		execute: function(editorContext, options){
			return editorContext.getText().then(function(text){
					 return editorContext.getSelection().then(function(selection){
						if((text.substring(selection.start, selection.start + 3) === "/* ") && (text.substring(selection.end - 3, selection.end) === " */"))
							return removeComment(text, selection);
						else
							return generateComment(text, selection);
					});
				});
		},
		
		/**
		 * Orion 3.0 Compliant
		 * @param {String} selectedText The text that is currently selected in the editor
		 * @param {String} text The entire buffer being edited
		 * @param {orion.editor.Selection} The current selection in the editor
		 * @param {String} resource The path and filename of the file open in the editor
		 * 
		 * @return {CommandResult} A string of replacement text or an object with the 
		 * 				following properties
		 * 
		 * Each element of the CommandResult object can contain the following properties:
		 * ===============================================================================
		 * 
		 * You may only use one of the following at a time:
		 * ------------------------------------------------
		 * text 		= The replacement text. This string will override everything 
		 * 					inside the selection buffer
		 * uriTemplate	= A new UI iframe will open with this UI
		 * 					Please see delegating_ui_plugin_installer.js for more information
		 */
		run: function(selectedText, text, selection, resource){
			if((text.substring(selection.start, selection.start + 3) === "/* ") && (text.substring(selection.end - 3, selection.end) === " */"))
				return removeComment(text, selection);
			else
				return generateComment(text, selection);
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
	var serviceProperties = {
		/* Unique ID identifier
		 *  - It should begin with orion.edit.command
		 *  - The text that follows should uniquely identify the functionality you are adding
		 */
		id: "orion.edit.command.cstyle.comment",
		
		/**
		 * The name of your plugin
		 */
		name: "C style comment generator",
		
		/**
		 * OPTIONAL: The list of file types that your plugin will work under
		 * 		please see the file "List of Content Types.txt" for more informaiton 
		 */
        contentType: ["application/javascript"],
        
        /**
         * OPTIONAL: a tooltip describing the command
         */
        tooltip: "Generate important comments",
        
        /**
         * OPTIONAL: The URL of an icon to associate with the command.
         *  The icon may not appear in all situations.
         * 
         * img: "path/to/image",
         */
        
        /**
         * OPTIONAL: the key binding for the plugin
         * Please see the constructor for orion.textview.KeyBinding for more information 
         * @see https://orion.eclipse.org/jsdoc/symbols/orion.KeyBinding.html
         * 
         * This particular example will trigger at the key combination: ctrl-shift-v
         */
        key: ["v", true, true]
        
        /**
         * OPTIONAL: An array Validation Properties that must match the editor's file
         * 		in order for the command to appear.
         * 
         * Please see the wiki for more inforamtion
         * @see http://wiki.eclipse.org/Orion/Documentation/Developer_Guide/Plugging_into_Orion_pages#Validation_Properties
         * 
         *  validationProperties: validationProperties: [{
		 *     source: "GitUrl", 
		 *     match: "github\.com.*\.git", 
		 *     variableName: "GitHubLocation", 
		 *     variableMatchPosition: "only",
		 *     replacements: [{pattern: ":", replacement: "/"}, {pattern: ".git$", replacement: ""}]
		 *  }]
         */
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.command", outlineService, serviceProperties);
	provider.connect();
};