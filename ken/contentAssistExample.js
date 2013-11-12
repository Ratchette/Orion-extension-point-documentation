/*******************************************************************************
 * @license
 * Copyright (c) 2013 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html).
 *******************************************************************************/

/*global define orion window document */
window.onload = function() {
    // create the plugin
    var headers = {
        name: 'Simple Content Assist for JavaScript files',
        version: '0.1',
        description: 'uses orion.edit.contentAssist to add content assist for JavaScript files'
    };

    // Create the provider basedon the headers
    var provider = new orion.PluginProvider(headers);

    // Create the service implementation for getting selected text
    var serviceImpl = {
        computeProposals: function(buffer, offset, context) {
            var keywords = ["break", "case", "catch", "continue", "debugger", "default", "delete", "do", "else",
                "finally", "for", "function", "if", "in", "instanceof", "new", "return", "switch",
                "this", "throw", "try", "typeof", "var", "void", "while", "with"];
            var proposals = [];
            for (var i = 0; i < keywords.length; i++) {
                var keyword = keywords[i];
                if (keyword.indexOf(context.prefix) === 0) {
                    proposals.push({
                        proposal: keyword.substring(context.prefix.length),
                        description: keyword
                    });
                }
            }
            return proposals;
        }
    };
    // String - Name for the content assist provider.
    var name = "JavaScript NEW content assist";

    // Array An array of Content Type IDs that this provider can provide content assist for.
    // The provider's computeProposals function will be called only for files having one of these content types.
    var contentType = ["application/javascript"];

    // Define the service properties according to the documentation, name and contentType for orion.edit.contentAssist
    var serviceProperties = {
        name: name,
        contentType: contentType
    };

    // Register the service settings with the orion.edit.contentAssist service
    provider.registerServiceProvider("orion.edit.contentAssist", serviceImpl, serviceProperties);
    provider.connect();
};