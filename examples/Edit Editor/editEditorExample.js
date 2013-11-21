/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window*/

window.onload = function() {
    // The functionality of your plugin

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
         *  - It should begin with orion.edit.contentAssist
         *  - The text that follows should uniquely identify the functionality you are adding
         */
        id: "orion.edit.editor.pixlr.example",

        /**
         * The name of your plugin
         */
        name: "An example Image editor",


        /**********************************************************************************************
         * If both of the following fileds are provided, orionTemplate takes priority over uriTemplate
         **********************************************************************************************/

        /**
         * Gives a URI template for constructing a URL that can be followed to drive this editor to a particular file.
         *      The parameter Location is substituted with the URL of the file being edited. 
         * 
         *      The template is specified using the URI Template syntax found here: 
         *      http://tools.ietf.org/html/draft-gregorio-uritemplate-08
         */
        uriTemplate: "{OrionHome}/content/content.html#{Location},contentProvider=orion.pixlr.content",
        
        /**
         * [Optional] Gives an Orion template for constructing the editor URL. 
         *      This serves the same purpose as the uriTemplate field, however an 
         *      Orion template allows a more human-readable parameter encoding scheme
         *      than a URI Template.
         */
        orionTemplate: "../edit/exampleEditor.html#{,Location,params*}"
    };


    /**
     * Register the plugin with Orion
     *  NOTE: this extension point has no service provider (it is purely declarative)
     */
    var provider = new orion.PluginProvider(headers);
    provider.registerServiceProvider("orion.edit.editor", {}, serviceProperties);
    provider.connect();
};