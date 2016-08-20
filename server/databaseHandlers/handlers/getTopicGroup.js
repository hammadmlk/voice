import document from '../dbClient'
import { logError } from '../errorUtils'
import { TOPIC_GROUP_TABLE_NAME, TOPIC_GROUP_PARTITION_KEY } from '../constants'

/**
  Gets the topic group from the database. Throws error if it does not exist.

  groupName: {String} the name of the topic group
  return: {Object} a list of topics in the topic group
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
    if (typeof response.Item !== 'undefined') {
      return response.Item
    }
    const notFoundErr = {statusCode: 400, message: 'The requested topic group does not exist.'}
    throw notFoundErr
  })
  .catch((err) => {
    logError(err)
    throw String('We were unable to find the requested topic group. Does it exist?')
  })
}
