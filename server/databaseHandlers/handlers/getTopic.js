import document from '../dbClient'
import { logError } from '../errorUtils'
import {TOPICS_TABLE_NAME, TOPICS_PARTITION_KEY, TOPICS_SORT_KEY} from '../constants'

/**
  Gets the topic from database. Throws error if it does not exist.

  creator: {String} creator's username
  slug: {String} the slug of the topic
  return: {Object} the topic object
  throws: {String} the error message
 */
export default function getTopic (creator, slug) {
  return getTopics([{creator, slug}])
  .then((response) => {
    if (Array.isArray(response) && response.length > 0) {
      return response[0]
    }
    const notFoundErr = {statusCode: 400, message: 'The requested topic does not exist.'}
    logError(notFoundErr)
    throw notFoundErr
  })
  .catch(() => {
    throw String('We were unable to find the requested topic. Does it exist?')
  })
}

/**
  Gets the topics from database. Will ignore any topics that do not exist.

  topicIdentifierList: {List} Array of {creator: ..., slug: ... }
  return: {List} the list of topic objects. Can be an empty array.
  throws: {String} the error message
 */
export function getTopics (topicIdentifierList) {
  if (Array.isArray(topicIdentifierList) && topicIdentifierList.length === 0) {
    return Promise.resolve([])
  }

  const keys = []

  topicIdentifierList.forEach(({creator, slug}) => {
    const key = { }
    key[TOPICS_PARTITION_KEY] = creator
    key[TOPICS_SORT_KEY] = slug
    keys.push(key)
  })

  const params = {
    RequestItems: {
      [TOPICS_TABLE_NAME]: {
        Keys: keys,
      },
    },
  }

  return document.batchGet(params).promise()
  .then((response) => response.Responses[TOPICS_TABLE_NAME])
  .catch((err) => {
    logError(err)
    throw String('We were unable to retrieve the requested topics. Something is wrong on our side.')
  })
}
