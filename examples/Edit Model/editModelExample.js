/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window*/

// FIXME - This example is incomplete
// change all of the text in the editor to be bright pink?

window.onload = function(){
	// The functionality of your plugin
	var serviceProvider = {
	    /**
	     * You may define zero or more functions depending on what event types 
	     *     are provided in the types attribute bellow. 
	     * 
	     * For every event type in types, the function with the name "on" + eventType will be invoked. 
	     * 
	     * The current list of supported methods are:
	     * ============================================
	     * onBlur(blurEvent)
	     *     This event is sent when the text view goes out of focus.
	     * 
	     * onContextMenu(contextMenuEvent)
	     *     This event is sent when the user invokes the view context menu.
	     * 
	     * onDestroy(destroyEvent)
	     *     This event is sent when the text view has been destroyed.
	     * 
	     * onFocus(focusEvent
	     *     This event is sent when the text view is focused.
	     * 
	     * onKeyDown(keyEvent)
	     *     This event is sent for key down events.
	     * 
	     * onKeyPress(keyEvent)
	     *     This event is sent for key press events.
	     * 
	     * onKeyUp(keyEvent)
	     *     This event is sent for key up events.
	     * 
	     * onLineStyle(lineStyleEvent)
	     *     This event is sent when the text view needs the style information for a line.
	     * 
	     * onModelChanged(modelChangedEvent)
	     *     This event is sent when the text in the model has changed.
	     * 
	     * onModelChanging(modelChangingEvent)
	     *     This event is sent when the text in the model is about to change.
	     * 
	     * onModify(modifyEvent)
	     *     This event is sent when the text view has changed text in the model.
	     * 
	     * onScroll(scrollEvent)
	     *     This event is sent when the text view scrolls vertically or horizontally.
	     * 
	     * onSelection(selectionEvent)
	     *     This event is sent when the text view selection has changed.
	     * 
	     * onVerify(verifyEvent)
	     *     This event is sent when the text view is about to change text in the model.
	     */
		onKeyDown: function(modelChangingEvent){
            model.onTargetModelChanging(modelChangingEvent);
        },
        
        onKeyUp: function(scrollEvent) {
            highlighter.setViewportIndex(scrollEvent.topIndex);
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
	    /**
	     * An array of TextView event types that this provider will listen for.
	     *     When one of these actions occur, this plugin's function will be invoked.
	     * 
	     * The current list of supported types are:
	     * ============================================
         * Blur
         * ContextMenu
         * Destroy
         * Focus
         * KeyDown
         * KeyPress
         * KeyUp
         * LineStyle
         * ModelChanged
         * ModelChanging
         * Modify
         * Scroll
         * Selection
         * Verify
	     */
	    types: ["KeyDown", "KeyUp"],
	    
		/**
		 * The list of file types (content type IDs) that this provider will listen for changes in.
		 * 		please see the file "additional_examples/content_types.html" for more informaiton 
		 */
        contentType: ["text/plain"]
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.model", serviceProvider, serviceProperties);
	provider.connect();
};