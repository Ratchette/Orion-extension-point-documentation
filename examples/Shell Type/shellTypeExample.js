/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window setTimeout*/

window.onload = function(){
	// The functionality of your plugin
	var serviceProvider = {
	    
	    // FIXME - incomplete
        /**
         * Takes the currently-typed user string and returns an object with completion suggestions.
         * 
         * @param arg {Object} contains the user's currently-typed string for an 
         *  instance of this parameter
         *      arg.prefix {String}
         *      arg.suffix {String}
         *      arg.text   {String} 
         * 
         * @param typeSpec {Object} the parameter's typeSpec as defined by the command 
         *  that is using it
         * 
         * @param context {Object} It can aid in determining when the completion suggestions
         *  being returned should be recomputed
         *      context.lastParseTimestamp {number}
         * 
         * ----------------------------------------------------------------------------
         * 
         * @return The return value for this method must be either an orion.Deferred 
         *  (if computation of the result object has to be done asynchronously), 
         *  or an object with the following properties:
         * 
         * return.status {number}
         *  0: (MATCH) the currently-typed string matches a valid value 
         *      (ie.- the typing of this parameter value can now be considered complete)
         *  1: (PARTIAL) the currently-typed string partially matches a valid value 
         *      (ie.- the typing of a valid value in progress) 
         *  2: (ERROR) the currently-typed string does not match a subset of the initial
         *      characters of any valid values
         * 
         * return.predictions {Array} Valid completions for the currently-typed string (name is the string to 
         *  display in the suggestions list)
         *      return.predictions.name {String}
         *      return.predictions.value {Object}
         * 
         * return.value {Object} If the currently-typed string is a match for a valid value then set 
         *  this property to that value, otherwise set its value to undefined
         *      return.value.name {String}
         *      return.value.value {Object} 
         * 
         * [OPTIONAL] return.message {String} An error message to display in the Shell page
         */

        parse: function(arg, typeSpec, context){
            /*
             * Compute all potential prediction objects
             */
            
            // possible predictions
            var venus = {
                name: 'Venus',
                colour: 'yellow',
                diameter: 12103.6
            };
            var earth = {
                name: 'Earth',
                colour: 'blue',
                diameter: 12756.3
            };
            var mars = {
                name: 'Mars',
                colour: 'red',
                diameter: 6794
            };
            
            // matching what the user types (name) to an object above
            var potentialPredictions = [
                {
                    name: 'Venus',
                    value: venus
                },
                {
                    name: 'Earth',
                    value: earth
                },
                {
                    name: 'Mars',
                    value: mars
                }
            ];
        
        
            var CompletionStatus = {
               MATCH: 0,
               PARTIAL: 1,
               ERROR: 2
            };
            var value; /* undefined until a valid value is fully typed */
            var status; 
            var predictions = []; /* an array of potential predictions*/
        
            
            for (var i = 0; i < potentialPredictions.length; i++) {
                
                if (potentialPredictions[i].name.indexOf(arg.text) === 0) {
                    predictions.push(potentialPredictions[i]);
                
                    if (potentialPredictions[i].name === arg.text) {
                        value = potentialPredictions[i].value;
                    }
                }
            }
        
            // Determine if the type is a partial or complete match 
            status = CompletionStatus.ERROR;
            if (predictions.length > 0) {
                status = value ? CompletionStatus.MATCH : CompletionStatus.PARTIAL;
            }
             
            var result = {
                value: value,
                message: (status === CompletionStatus.ERROR ? ("'" + arg.text + "' is not valid") : undefined),
                status: status,
                predictions: predictions
            };
        
            /*
             * If all of the above can be computed synchronously then just return result directly.
             * If the above cannot be done synchronously (eg.- waiting on an XHR) then return
             * a promise as demonstrated below and resolve it when the result becomes ready.
             */
            var promise = new orion.Deferred();
            setTimeout(function() {
                    promise.resolve(result); /* result has become ready some time later */
                });
            return promise;
        }

        // FIXME - I cannot get this to work yet ...
//        /**
//         * [OPTIONAL METHOD]
//         * 
//         * Returns an object's string representation that is appropriate for display in the Shell
//         *  page's output area. 
//         * 
//         * An example case where this string may not be the same as the "name" that was provided
//         *  for it by the parse service is if a typed relative path should be resolved to an 
//         *  absolute path. If this service is not implemented then the object's "name" that was 
//         *  provided for it by the parse service implementation is used as its display string.
//         * 
//         * @param object {Object} The object to stringify
//         * @param typeSpec This parameter's typeSpec as defined by the command that is using it
//         * 
//         */
//        stringify: function(object, typeSpec){
//            return "Other planet";
//        }
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
	/**
	 * Implementations of orion.shell.type define the following attribute:
	 * ========================================================================
	 * 
	 * name {String} The name of the parameter type
	 *     This is used in the plug-in definition of contributed commands
	 */
	var serviceProperties = {
		name: "planet"
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.shell.type", serviceProvider, serviceProperties);
	
	/**
	 * NOT RELEVANT TO PLUGIN - FOR DISPLAY PURPOSES ONLY
	 * For more information, please see the shell command extension point
	 */
	var printPlanetImpl = {
        callback: function(args) {
            var displayString;
            
            displayString = "Name: " + args.planet.name + ",  ";
            displayString = displayString + "Colour: " + args.planet.colour + ", ";
            displayString = displayString + "Diameter: " + args.planet.diameter;
            
            return displayString;
        }
    };
	
    var printPlanetProperties = {
        name: "displayPlanet",
        description: "Print informaiton about a planet",
        parameters: [{
            name: "planet",
            type: {name: "planet"},
            description: "The name of the planet you wish to visualize"
        }],
        returnType: "string"
    };

    provider.registerServiceProvider("orion.shell.command", printPlanetImpl, printPlanetProperties);
	provider.connect();
};