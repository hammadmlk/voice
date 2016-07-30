import socketio from 'socket.io'
import {createTopic, deleteTopic} from '../databaseHandlers'

// Attach to the provided server, listen for events and call the relevant handler
export default function attach (server) {
  // attach to the given server
  const ioServer = socketio(server)

  // Listen for events and call relevant handlers
  ioServer.on('connection', function (socket) {
    socket.on('create topic', (data) => {
      createTopic()
    })

    socket.on('delete topic', (data) => {
      deleteTopic()
    })
  })

  return ioServer
}
