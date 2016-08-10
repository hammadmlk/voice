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
function getTopic (creator, slug) {
  // The key we want to get from db
  const key = { }
  key[TOPICS_PARTITION_KEY] = creator
  key[TOPICS_SORT_KEY] = slug

  const params = {
    TableName: TOPICS_TABLE_NAME,
    Key: key,
  }

  return document.get(params).promise()
  .then((response) => {
    if (typeof response.Item !== 'undefined') {
      return response.Item
    }
    const notFoundErr = {statusCode: 400, message: 'The requested topic does not exist.'}
    throw notFoundErr
  })
  .catch((err) => {
    logError(err)
    throw String('We were unable to find the requested topic. Does it exist?')
  })
}

export default getTopic
