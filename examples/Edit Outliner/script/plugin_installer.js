/*******************************************************************************
 * @license
 * Copyright (c) 2011 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *	   Jennifer Winer - Extension to HTML5 Outlining
 *******************************************************************************/

/*global Tautologistics eclipse self window*/

//This is a copy of the HTML outline plugin coded as a web worker plugin

window.onload = function(){
	
	var outlineService = {
		setContentType: function(contentTypeId){
				
			}
	};

	/**
	 * Optional metainformation displayed in Orion's settings page
	 */
	var headers = {
		name: "PLUGIN NAME",
		version: "0.0.0",
		description: "PLUGIN DESCRIPTION"
	};
	
	
	/**
	 * FIXME - Do these varaibles do anything other than sit in the carosel?
	 */
	var serviceProperties = {
		pid: "orion.edit.hilighter.html.comments",
		name: "Hilighter and Grammar example",
		
		// For a grammar use the following
		
		type : "grammar",
    	contentType: ["text/html"],	// The list of file types that your plugin will work under
    	grammar:
		
		// For a hilighter use the following
		
		
	};
	
	
	/*
	 * Register the plugin with Orion *******
	 */
	var provider = new eclipse.PluginProvider(headers);
	provider.registerServiceProvider("orion.edit.highlighter", outlineService, serviceProperties);
	provider.connect();
};