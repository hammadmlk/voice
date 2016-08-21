import socketio from 'socket.io'
import {createTopic, deleteTopic, getTopic, getTopics, getTopicGroup, getVoices, addVoice} from '../databaseHandlers'
import {getAuthenticatedUserFromSocket} from '../authentication'

// Attach to the provided server, listen for events and call the relevant handler
export default function attach (server) {
  // attach to the given server
  const ioServer = socketio(server)

  // Listen for events and call relevant handlers
  ioServer.on('connection', function (socket) {
    // Voices
    socket.on('add voice', ({topicCreator, topicSlug, username, text, type}, ackFunc) => {
      if (getAuthenticatedUserFromSocket(socket) !== username) {
        ackFunc(permissionDeniedAck())
        return
      }
      addVoice(topicCreator, topicSlug, username, text, type)
      .then((res) => ackFunc(successAck(res)))
      .catch((err) => ackFunc(failureAck(err)))
    })

    socket.on('get voices', ({topicCreator, topicSlug}, ackFunc) => {
      getVoices(topicCreator, topicSlug)
      .then((voices) => ackFunc(successAck(voices)))
      .catch((err) => ackFunc(failureAck(err)))
    })

    // Topics
    socket.on('create topic', ({creator, slug, title}, ackFunc) => {
      if (getAuthenticatedUserFromSocket(socket) !== creator) {
        ackFunc(permissionDeniedAck())
        return
      }
      createTopic(creator, slug, title)
      .then((res) => ackFunc(successAck(res)))
      .catch((err) => ackFunc(failureAck(err)))
    })

    socket.on('get topic', ({creator, slug}, ackFunc) => {
      getTopic(creator, slug)
      .then((topic) => ackFunc(successAck(topic)))
      .catch((err) => ackFunc(failureAck(err)))
    })

    socket.on('delete topic', ({creator, slug}, ackFunc) => {
      if (getAuthenticatedUserFromSocket(socket) !== creator) {
        ackFunc(permissionDeniedAck())
        return
      }
      deleteTopic(creator, slug)
      .then((res) => ackFunc(successAck(res)))
      .catch((err) => ackFunc(failureAck(err)))
    })

    // Topic Groups
    socket.on('get topic group', (name, ackFunc) => {
      getTopicGroup(name)
      .then((topicIdentifierList) => getTopics(topicIdentifierList))
      .then((topicList) => ackFunc(successAck(topicList)))
      .catch((err) => ackFunc(failureAck(err)))
    })

    // Errors
    socket.on('error', (err) => console.error(err))
  })

  return ioServer
}

//
// Helpers
//

function successAck (data) {
  return createAck(data)
}

function failureAck (errorMsg) {
  return createAck(null, errorMsg)
}

function permissionDeniedAck () {
  console.warn('Someone tried to fake the username. This might be a malicious activity.')
  return failureAck('Permission Denied.')
}

/**
  Standard ack response format.
  This will make it easy for the client to know if the ack is success or failure.

  data: {Object} the ack data.
  error: {Object} the error message. null when no error
*/
function createAck (data = null, errorMsg = null) {
  return {
    error: (typeof errorMsg === 'string' || errorMsg === null) ? errorMsg : JSON.stringify(errorMsg),
    data: data,
  }
}

