import document from '../dbClient'
import { logError } from '../errorUtils'
import { VOICES_TABLE_NAME, VOICES_PARTITION_KEY, topicIdentifierCreator } from '../constants'

/**
  Gets all the voices of a topic

  topicCreator: {string} creator of the topic whose voices we want
  topicSlug: {string} slug of the topic whose voices we want
  return: {array} of voice objects
  error: {string} the error message
*/
function getVoices (topicCreator, topicSlug) {
  const params = {
    TableName: VOICES_TABLE_NAME,
    KeyConditionExpression: `${VOICES_PARTITION_KEY} = :topicIdentifier`,
    ExpressionAttributeValues: {
      ':topicIdentifier': topicIdentifierCreator(topicCreator, topicSlug),
    },
  }

  document.query(params).promise()
  .then((response) => {
    return response.Items
  })
  .catch((err) => {
    logError(err)
    throw String('Oo! o! We were unable to retrieve voices for this topic.')
  })
}

export default getVoices
