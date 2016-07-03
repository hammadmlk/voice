A web application to share your voice on a topic.



# User Stories we want to address with this application

## User Hammad
Hammad is an employee of a large organization

#### Use Case 1
Hammad wants to be able to submit his concerns to leaders in his organization with confidence that they will be read and addressed.

#### Use Case 2
Hammad wants his concerns to be visible to all members of this organization. If some one shares his concern, he wants them to be able to +1 him. He feels this will make his concern be taken more seriously.

#### Use Case 3
Hammad thinks that leaders of his organization can dodge hard questions using techniques they learned in media training. He wants a real answer.


## User Emilie
Emilie is a leader of a large organization

#### Use Case 1
Emilie wants to hear the concerns of all employees so she can address them timely. She wants to do that in an inclusive but time efficient manner.

#### Use Case 2
Emilie wants to know what concerns are more prevalent so she can prioritize them.

#### Use Case 3
When Emilie addresses a concern, she wants it to reach everyone. She find that often she has to address the same concern multiple times.


# Tech Notes
This is where I dump my thoughts on tech implementation.

## DB Scheme

	Table: Voices
		theme string | partition key
		sortkey string | sort key username+timestamp 
		
		timestamp string 
		username  string 
		title string
		detail string
		upvotedBy arrayOfString | username
		heardBy arrayOfString | username
		supportingVoices arrayOfObject | {timestamp, username}
		type string | primary or supporting

	Table: Themes
		createdby string | partition key
		themeAlias string | sort key
		theme string
		timestamp string
		lastupdated string


## URL Scheme
	
	/						homepage explaining the tool + list top N themes by lastupdated + create new button
	/username 				list all themes of user by last updated + create new theme
	/username/themeAlias    list all voices by creation date + add voice


## Task list
	- Setup Node/React env
	- Create database tables

	- Basic Theme feature
		- add theme database controller
		- get themes database controller 
		- add theme react communicator
		- get theme react communicator
		- / page. See themes
		- / page. Add theme + deal with optimistic add???
		- /username page. See themes	

	- Basic Voices feature
		- add voice database controller
		- get voices database controller
		- add voice react communicator
		- get voices react communicator
		- /username/themeAlias page. See voices
		- /username/themeAlias page. Add voice

	- Delete Voice feature
		- delete voice database controller
		- delete voice react communicator
		- delete voice UI

	- Upvote Voices feature
		- upvote database controller
		- upvote react communicator
		- upvote UI

	- Voice Heard Feature
		- mark as heard database controller
		- mark as heard react communicator
		- heard UI
		- heard auto detector based on scroll

	- Auto username feature 
		- openID integration so we can get username automatically
		- readonly support for those without ID

	- Supporting voice feature
		- add supporting voice database controller
		- add supporting voice react communicator 
		- add supporting voice UI

	- Create node database controller to add and retrieve data
		- add supporting voice
		- delete voice
	- Create react database communicator to talk to node database controller	
	

	- Sorting Voice feature
		- do we need to do something on the backend for optimization?
		- sorting UI
