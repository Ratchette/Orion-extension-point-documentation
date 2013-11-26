/*******************************************************************************
 * @license
 * FIXME - needs a liscence
 *******************************************************************************/

/*global orion window Deferred*/

window.onload = function(){
	function removeUserInformation(gitUrl){
			if(gitUrl.indexOf("@")>0 && gitUrl.indexOf("ssh://")>=0){
				return gitUrl.substring(0, gitUrl.indexOf("ssh://") + 6) + gitUrl.substring(gitUrl.indexOf("@")+1);
			}
			return gitUrl;
		}
	
	var serviceProvider = {
		// FIXME - the parameter descriptions here are incomplete
		/**
		 * getDependencyDescription (item)
		 * 		This function is used to find dependency in users workspace. 
		 * 		This function is only invoked when validationProperties are matched with item
		 * 
		 * @return DependencyDescription {Object}
		 * 		DependencyDescription.Type
		 * 		DependencyDescription.Name
		 * 		DependencyDescription.Location
		 */
		getDependencyDescription: function(item){
			if(!item.Git){
				return null;
			}
			var deferred = new Deferred();
			gitClient.getGitClone(item.Git.CloneLocation).then(
				function(clone){
					if(clone.Children){
						clone = clone.Children[0];
					}
					if(clone.GitUrl){
						var gitInfo = parseGitUrl(clone.GitUrl);
						deferred.resolve({Type: "git", Location: removeUserInformation(clone.GitUrl), Name: (gitInfo.repoName || clone.Name) + " at " + gitInfo.serverName});
					}
				},deferred.reject, deferred.progress
			);
			return deferred;
		},
		
		
		/**
		 * paramsToDependencyDescription (params)
		 * 		This function is used to check if the dependency that should be created based
		 * 		on parameters inputted by the user already exists in this workspace.
		 * 
		 * @return DependencyDescription {Object}
		 * 		DependencyDescription.Type
		 * 		DependencyDescription.Name
		 * 		DependencyDescription.Location
		 */
		paramsToDependencyDescription: function(params){
			return {
				Type: "git",
				Location: removeUserInformation(params.url)
			};
		},
		
		
		/**
		 * [OPTIONAL] initProject (params, projectMetadata)
		 * 		If this method is implemented, users will able to add projects of given type.
		 * 		The function should initialize project in the workspace (including adding project.json
		 * 		to it) and return the project description containing at least ContentLocation
		 * 
		 * @param params {Object} an object of parameters collected from the user based on description
		 * 		in addParamethers attribute. If the list of parameters is not complete, rejecting the 
		 * 		returned deferred with additional addParamethers attribute will invoke asking user
		 * 		for additional parameters.
		 * 
		 * @param projectMetadata {Object} contains an object with some extra potential project 
		 * 		metadata, in particular this object contains WorkspaceLocation.
		 * 
		 * Afterwords all collected parameters will be resent, so there is no need to remember 
		 * 		previously sent params.
		 */
		initProject: function(params, projectMetadata){
			var gitUrl = removeUserInformation(params.url);
			return this._cloneRepository(gitUrl, params, projectMetadata.WorkspaceLocation, true);
		},
		
		
		/**
		 * [OPTIONAL] initDependency (dependency, params, projectMetadata)
		 * 		if this method is implemented, users will be able to add associated content of the 
		 * 		given type. This function should initialize the dependency in user's workspace and 
		 * 		return the DependencyDescription
		 * 
		 * @param dependency {DependencyDescription} if the invocation of this method contains
		 * 		dependency, it means that user had the dependency defined and used Connect action
		 * 		to initialize its content in his workspace.
		 * 
		 * 		dependency.Type
		 * 		dependency.Name
		 * 		dependency.Location should describe the dependency in a way it allows to recreate
		 * 			it in the user's workspace. 
		 * 
		 * @param params parameters inputted by the user while requesting to create a new dependency.
		 * 		User is at first not prompted for parameters if he chooses to connect to an exiting dependency.
		 * 		Then, DependencyDescription is passed as dependency.
		 * 		This function may request for extra parameters in the same way initProject does.
		 * 
		 * @param projectmetadata {Object} An object with project metadata, in particular this object
		 * 		contains WorkspaceLocation.
		 */
		initDependency: function(dependency, params, projectMetadata){
			var gitUrl = removeUserInformation(dependency.Location || params.url);
			return this._cloneRepository(gitUrl, params, projectMetadata.WorkspaceLocation);
		},


		/**
		 * [OPTIONAL] returns ProjectPageSectionDescription[] 
		 * 		Implementing this function allows to add extra information to project page.
		 * 		It will result in rendering the additional section on the project page
		 */
		// FIX (incomplete)
		getAdditionalProjectProperties: function(item, projectMetadata){
			if(!item.Git){
				return null;
			}
			
			var deferred = new Deferred();
			gitClient.getGitClone(item.Git.CloneLocation).then(
			function(clone){
				if(clone.Children){
					clone = clone.Children[0];
				}
				deferred.resolve([
					{
						name: "Git",
						children: [
							{
								name: "Git Url",
								value: clone.GitUrl
							},
							{
								name: "Git Status",
								value: "Git Status",
								href: "{+OrionHome}/git/git-status.html#" + item.Git.StatusLocation
							}
						]
					}
				]);
			},deferred.reject, deferred.progress
			);
			return deferred;
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
	
	
	/**
	 * Implementations of orion.project.handler define the following attributes:
	 * ==========================================================================
	 * 
	 * id {String} A unique ID identifier
	 * 
	 * type {String} the unique identifier of the project type (for instance git or jazz)
	 * 
	 * addParamethers {ParameterDefinition[]} Array of objects containing id String, 
	 * 		type String describing one of the html5 input types or "textarea" and
	 * 		name being a display String for the parameter. 
	 * 
	 * 		Those parameters will be used to generate an input form when user tries init a new 
	 * 		project or dependency.
	 * 
	 * addDependancyName {String} Name of the action for adding dependancy
	 * 
	 * addDependencyTooltop {String} Tooltip of the action for adding dependency
	 * 
	 * addProjectName {String} Name of the action for adding project
	 * 
	 * addProjectTooltop {String} Tooltip of the action for adding project
	 * 
	 * [OPTIONAL] actionComment {String} comment displayed when project or dependency 
	 * 		is being initialized
	 * 
	 * [OPTIONAL] validationProperties {ValidationProperties[]}
	 * 		define if given item can be handled by this project handler
	 * 
	 * The validation properties object has the following properties:
	 * ---------------------------------------------------------------
	 * source {String} The name of a property to look for in the target object. 
	 *     The ":" character represents nested properties, and the "|" character represents 
	 *     OR'ed properties. 
	 * 
	 *     For example, the source Location specifies that the page object must have a 
	 *     "Location" property, such as myObject.Location. The source Git:ContentLocation
	 *     specifies that the page object must have a sub-object and property such as 
	 *     myObject.Git.ContentLocation. 
	 * 
	 *     The source ChildrenLocation|ContentLocation means that the page object must have 
	 *     either a property such as myObject.ChildrenLocation or a property such as 
	 *     myObject.ContentLocation. The first property found will be used.
	 * 
	 * match {Object} A value used to validate the source property. 
	 *     In general, the value of the page object's property will be compared against 
	 *     this value. However, if this value is a string, the string is assumed to 
	 *     specify a regular expression that will be passed to the RegExp constructor.
	 *         
	 * [OPTIONAL] variableName {String} The name of a variable that represents the value 
	 *     of the source property. If specified, then an associated URI template may use a
	 *     variable of this name, and it will contain the value of the matched source property.
	 * 
	 * [OPTIONAL] variableMatchPosition {String} A string that specifies what part of a
	 *     matching string is used in the variable value when a regular expression was used 
	 *     to match the property.
	 *         "all" (default) means the entire property value should be substituted for
	 *             the variable.
	 *         "only" means only the matching part of the property value should be substituted
	 *             in the URI template.
	 *         "before" means the part before the match is substituted in the URI template.
	 *         "after" means the part after the match is substituted in the URI template.
	 * 
	 * [OPTIONAL] replacements {Array} Specifies an array of replacements (pattern and 
	 *     replace strings) that can be used to further modify a variable value used in 
	 *     a URI template.
	 * 
	 * 
	 * The following parameters will be implemented in Orion 5.0+
	 * -----------------------------------------------------------
	 * 
	 * optionalParameters {parameterDefinition[]} a list of optional parameters that will display
	 * 		in a separate dialog when the user clicks "More" in the input form with addParameters
	 */
	var serviceProperties = {
		id: "orion.git.projecthandler",
		type: "git",
		addParamethers: [{id: "url", type: "url", name: "Url:"}],
		addDependencyName: "Add Git Repository",
		addDependencyTooltip: "Clone git repository and add it to this project",
		addProjectName: "Create a project from a Git Repository",
		addProjectTooltip: "Clone a Git Repository and add it as a project",
		actionComment: "Cloning ${url}",
		validationProperties: [
			{source: "Git"} // alternate {soruce: "Children:[Name]", match: ".git"}
		]
	};
	
	
	/**
	 * Register the plugin with Orion
	 */
	var provider = new orion.PluginProvider(headers);
	provider.registerServiceProvider("orion.project.handler", serviceProvider, serviceProperties);
	provider.connect();
};