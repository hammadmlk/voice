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

## Vocabulary
Topic: Conversation subject.
Voice: Think of it as a comment. 


## DB Scheme

	Table: Topics
		creator string | partition key
		slug string | sort key
		title string
		timestamp string
		lastupdated string

	Table: Voices
		topicIdentifier string | partition key   (topicIdentifier = creator + slug)
		voiceItentidier string | sort key  (voiceItentidier = speaker's username + timestamp)
		
		timestamp string 
		username  string 
		title string
		detail string
		upvotedBy arrayOfString | username
		heardBy arrayOfString | username
		supportingVoices arrayOfObject | {voiceItentidier}
		type string | primary or supporting
		archived bool 


## URL Scheme
	
	/						homepage explaining the tool + list top N topics by lastupdated + create new button
	/username 				list all topics of user by last updated + create new topic
	/username/slug    		list all voices by creation date + add voice


## Api

	Create Topic  | username + slug
	Get Topic  |  username + slug

	Add Voice | topicIdentifier + username
	Delete Voice  | topicIdentifier + voiceIdentifier

	Mark Read  | topicIdentifier + voiceIdentifier + username

	Add up-vote  |  topicIdentifier + voiceIdentifier + username
	Remove up-vote  |  topicIdentifier + voiceIdentifier + username

	Add supporting voice  topicIdentifier + voiceIdentifier + username
	Remove supporting voice  topicIdentifier + voiceIdentifier



## Task list
  - [x] Setup Node/React env
  - [x] Create database tables
  - [x] Integrate with a material-ui module. (choose http://react-toolbox.com/)
  - [x] Setup redux

  - [ ] Basic topic feature
    - [ ] add topic database controller
    - [ ] get topics database controller 
    - [ ] add topic react communicator
    - [ ] get topic react communicator
    - [ ] / page. See topics
    - [ ] / page. Add topic + deal with optimistic add???
    - [ ] /username page. See topics	

  - [ ] Basic Voices feature
    - [ ] add voice database controller
    - [ ] get voices database controller
    - [ ] add voice react communicator
    - [ ] get voices react communicator
    - [ ] /username/slug page. See voices
    - [ ] /username/slug page. Add voice

    - [ ] Delete Voice feature
    - [ ] delete voice database controller
    - [ ] delete voice react communicator
    - [ ] delete voice UI

  - [ ] Upvote Voices feature
    - [ ] upvote database controller
    - [ ] upvote react communicator
    - [ ] upvote UI

  - [ ] Voice Heard Feature
    - [ ] mark as heard database controller
    - [ ] mark as heard react communicator
    - [ ] heard UI
    - [ ] heard auto detector based on scroll

  - [ ] Auto username feature 
    - [ ] openID integration so we can get username automatically
    - [ ] readonly support for those without ID

  - [ ] Supporting voice feature
    - [ ] add supporting voice database controller
    - [ ] add supporting voice react communicator 
    - [ ] add supporting voice UI

  - [ ] Create node database controller to add and retrieve data
    - [ ] add supporting voice
    - [ ] delete voice
  - [ ] Create react database communicator to talk to node database controller	
	
  - [ ] Sorting Voice feature
    - [ ] do we need to do something on the backend for optimization?
    - [ ] sorting UI


# DynamoDB Setup
Edit dynamoDB configurations in '.env' file so they points to a valid DB.

NOTE: For a better development experience you can setup a local dynamoDB instance. See: https://aws.amazon.com/blogs/aws/dynamodb-local-for-desktop-development/

Once the '.env' file points to a valid dynamoDB, initialize required tables

    node ./server/databaseHandlers/initializer

# Dev Setup
Prerequisite: DynamoDB Setup. See section above.

    npm install
    npm run start

