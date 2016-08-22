import io from 'socket.io-client'

const socket = io()

// Emit the event/data and return a promise that resolves when an ack is received
// ack is expected to be of form {error: {string} , data: {object}}
function emitPromise (event, data) {
  return new Promise((resolve, reject) => {
    socket.emit(
      event,
      data,
      (ack) => (ack.error === null ? resolve(ack.data) : reject(ack.error))
    )
  })
}

// Voices
export function addVoice (topicCreator, topicSlug, username, text, type) {
  return emitPromise('add voice', {topicCreator, topicSlug, username, text, type})
}

export function getVoices (topicCreator, topicSlug) {
  return emitPromise('get voices', {topicCreator, topicSlug})
}

// Topics
export function createTopic (creator, slug, title) {
  return emitPromise('create topic', {creator, slug, title})
}

export function getTopic (creator, slug) {
  return emitPromise('get topic', {creator, slug})
}

// Topic Groups
export function getTopicGroup (name) {
  return emitPromise('get topic group', name)
}
