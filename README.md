Orion-extension-point-documentation
===================================

A listing of examples for all of the extension points of Eclipse Orion


List of things left to do:

*** Funcitonality  ***

ALL
------
- track serviceProperties to find out all possible values?
- Add liscences to all files ...
- content_types.html
- editor_context.html
- remove extra service attributes from all!

- there is currently no documentation for drag events or mouse events
(check bugzilla)

- change examples with no service implementation to :
    var serviceImpl = {}; (then still register serviceImpl)

- Order: Headers, service properties, then service implementation

- pictures for all
- document how I created each one on the blog instead of being a journal

- create a uniform format for html files, all comments, positions of all attributes, etc. 
- Spellcheck everything!


Edit model
-----------
- Do something when the event happens!


Edit command
-------------
- Delegated UI 4.0 is currently not supported 
    (complete this section when it is)
- validation_properties.html


Edit Highlighter
-----------------
- Complete highlighter functionality
- Grab grammer funcitonality from other comptuer
- pictures of both
- update readme

Shell Type
-----------
- Fix the stringify method???


Project Handler
----------------
Come back to it
    


Remaining
----------
- Read through http://wiki.eclipse.org/Orion/Documentation/Developer_Guide/Long_running_operations_in_services_and_plugins
- orion.core.file
- orion.core.setting
- orion.cm.managedservice
- orion.cm.metatype



Skipped
-----------------------
Team client services
    orion.git.privider
    orion.net.ssh
User interface services
    ALL
Configuration services
    orion.cm.configadmin
Core client services
    orion.core.contentTypeRegistry
    orion.core.marker
    orion.core.preference
    orion.core.textlink



TODO
=====
- Edit hilighter 
- Edit model 

Combinations of extension points
- edit.editor + core.contentType + navigate.openWith

*** CSS ***  
(For the additional_information pages)

Tags 
- body
- h1
- h2
- create a footer?

IDs
- description
- reference

Classes
- method
- context_type
- property
- value