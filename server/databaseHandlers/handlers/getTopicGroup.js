import document from '../dbClient'
import { logError } from '../errorUtils'
import { TOPIC_GROUP_TABLE_NAME, TOPIC_GROUP_PARTITION_KEY, TOPIC_GROUP_TOPICS_KEY } from '../constants'

/**
  Gets the list of topics in the topic group from the database. Throws error if it does not exist.

  groupName: {String} the name of the topic group
  return: {List} the list of topics in the topic group. Can be an empty list.
  throws: {String} the error message
*/
export default function getTopicGroup (groupName) {
  const params = {
    TableName: TOPIC_GROUP_TABLE_NAME,
    Key: {
      [TOPIC_GROUP_PARTITION_KEY]: groupName,
    },
  }

  return document.get(params).promise()
  .then((response) => {
    if (typeof response.Item === 'undefined') {
      const notFoundErr = {statusCode: 400, message: 'The requested topic group does not exist.'}
      throw notFoundErr
    } else if (!Array.isArray(response.Item[TOPIC_GROUP_TOPICS_KEY])) {
      const notFoundErr = {statusCode: 500, message: 'The requested topic group contains malformed data. Expected Array.'}
      throw notFoundErr
    }
    return response.Item[TOPIC_GROUP_TOPICS_KEY]
  })
  .catch((err) => {
    logError(err)
    throw String('We were unable to find the requested topic group. Does it exist?')
  })
}
