import io from 'socket.io-client'

const socket = io()

// Emit the event/data and return a promise that resolves when an ack is received
// the ackData recieved is expected to be a string
function emitPromise (event, data) {
  return new Promise((resolve, reject) => {
    socket.emit(
      event,
      data,
      (ackData) => (ackData === 'success' ? resolve(ackData) : reject(ackData))
    )
  })
}

export function createTopic (username, slug, title) {
  return emitPromise('create topic', {username, slug, title})
}
