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

## Authentication
I want make it extremely easy to integrate this app with an arbitrary authentication system. There are so many popular authentication standards out there; it impossible to support all or choose some. So to meet my goal of easy integration I have decided to keep authentication completely out of this app. 

This app should be deployed behind a proxy that handles authentication and just passes the username of the authenticated user to this app. The authenticated username is passed as a header (default name 'X-Forwarded-User').

This app only accepts requests from localhost. This will ensure that no external user can bypass the proxy and connect directly to the app with a fake header.

## Vocabulary
Topic: Conversation subject.
Voice: Think of it as a comment. 

creator: Username of the creator of a topic
slug: a url friendly identifier for a topic. Together, creator and slug uniquely identify any topic.

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
		text string
		upvotedBy arrayOfString | username
		heardBy arrayOfString | username
		supportingVoices arrayOfObject | {voiceItentidier}
		type string | primary or supporting
		archived bool 


## URL Scheme
	
	/						homepage explaining the tool + list top N topics by lastupdated + create new button
	/creator 				list all topics of user by last updated + create new topic
	/creator/slug    		list all voices by creation date + add voice


## Api

	Create Topic  | creator + slug
	Get Topic  |  creator + slug

	Add Voice | topicIdentifier + speaker's username
	Delete Voice  | topicIdentifier + voiceIdentifier

	Mark Read  | topicIdentifier + voiceIdentifier + username

	Add up-vote  |  topicIdentifier + voiceIdentifier + username
	Remove up-vote  |  topicIdentifier + voiceIdentifier + username

	Add supporting voice  topicIdentifier + voiceIdentifier + speaker's username
	Remove supporting voice  topicIdentifier + voiceIdentifier



## Task list
  - [x] Setup Node/React env
  - [x] Create database tables
  - [x] Integrate with a material-ui module. (choose http://www.material-ui.com/)
  - [x] Setup redux

  - [ ] Basic topic feature
    - [x] add topic database controller
    - [X] get topic database controller
    - [x] get topics database controller 
    - [x] add topic react communicator
    - [x] get topic react communicator
    - [x] / page. See topics
    - [x] / page. Add topic modal
    - [ ] / page.
    - [ ] /creator page. See topics

  - [ ] Basic Voices feature
    - [x] add voice database controller
    - [x] get voices database controller
    - [x] add voice react communicator
    - [x] get voices react communicator
    - [x] /creator/slug page. See topic info
    - [x] /creator/slug page. See voices
    - [x] /creator/slug page. Add voice
    - [ ] support pagination on getVoices. dynamodb paginates results at 1MB i.e about 4k to 8k voices

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
    - [x] openID integration so we can get username automatically. (See Tech Notes)
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

Once the '.env' file points to a valid dynamoDB, create required tables and initialize table values:

    node ./server/databaseHandlers/initializer

# Dev Setup
Prerequisite: DynamoDB Setup. See section above.

    npm install
    npm run start

