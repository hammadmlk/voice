import socketio from 'socket.io'
import {createTopic, deleteTopic, getTopic} from '../databaseHandlers'

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

// Attach to the provided server, listen for events and call the relevant handler
export default function attach (server) {
  // attach to the given server
  const ioServer = socketio(server)

  // Listen for events and call relevant handlers
  ioServer.on('connection', function (socket) {
    socket.on('create topic', ({creator, slug, title}, ackFunc) => {
      createTopic(creator, slug, title)
      .then((res) => ackFunc(createAck(res)))
      .catch((err) => ackFunc(createAck(null, err)))
    })

    socket.on('get topic', ({creator, slug}, ackFunc) => {
      getTopic(creator, slug)
      .then((topic) => ackFunc(createAck(topic)))
      .catch((err) => ackFunc(createAck(null, err)))
    })

    socket.on('delete topic', ({creator, slug}, ackFunc) => {
      deleteTopic(creator, slug)
      .then((res) => ackFunc(createAck(res)))
      .catch((err) => ackFunc(createAck(null, err)))
    })

    socket.on('error', (err) => console.error(err))
  })

  return ioServer
}
