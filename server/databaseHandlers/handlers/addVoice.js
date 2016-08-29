import document from '../dbClient'
import { logError } from '../errorUtils'
import { VOICES_TABLE_NAME, VOICES_PARTITION_KEY, VOICES_SORT_KEY,
         VOICES_TIMESTAMP_KEY, VOICES_USERNAME_KEY, VOICES_TEXT_KEY,
         VOICES_TYPE_KEY, VOICES_RESPONSES_KEY, VOICE_TYPE_PRIMARY,
         VOICE_TYPE_RESPONSE, topicIdentifierCreator, voiceIdentifierCreator } from '../constants'

/**
  Adds the voice to the database. Throws error if something goes wrong.

  topicCreator: {string} creator of the topic this voice is associated with
  topicSlug: {string} slug of the topic this voice is associated with
  username: {string} the username of the person adding this voice
  text: {string} the detailed text of this voice.
  type: {string} the type of the voice. Either VOICE_TYPE_PRIMARY or VOICE_TYPE_RESPONSE
  primaryVoiceIdentifier: {string} voiceIdentifier of the primary voice. Used when the type is VOICE_TYPE_RESPONSE
  return: {object} the added item
  throws: {string} the error message
*/
function addVoice (topicCreator, topicSlug, username, text, type, primaryVoiceIdentifier) {
  // validate type. If invalid, reject promise
  if (![VOICE_TYPE_PRIMARY, VOICE_TYPE_RESPONSE].includes(type)) {
    const invalidArgumentsErr = {statusCode: 400, message: `Voice type (${type}) is not allowed.`}
    logError(invalidArgumentsErr)
    return Promise.reject(invalidArgumentsErr.message)
  }

  if (type === VOICE_TYPE_RESPONSE && primaryVoiceIdentifier == null) {
    const invalidArgumentsErr = {statusCode: 400, message: `Voice type (${type}) can not have undefined primaryVoiceIdentifier.`}
    logError(invalidArgumentsErr)
    return Promise.reject(invalidArgumentsErr.message)
  }

  const timestamp = Date.now()

  // the item we want to add to db
  const item = { }
  item[VOICES_PARTITION_KEY] = topicIdentifierCreator(topicCreator, topicSlug)
  item[VOICES_SORT_KEY] = voiceIdentifierCreator(username, timestamp)
  item[VOICES_TIMESTAMP_KEY] = timestamp
  item[VOICES_USERNAME_KEY] = username
  item[VOICES_TEXT_KEY] = text
  item[VOICES_TYPE_KEY] = type
  item[VOICES_RESPONSES_KEY] = []

  const params = {
    TableName: VOICES_TABLE_NAME,
    Item: item,
    ConditionExpression: `attribute_not_exists(${VOICES_PARTITION_KEY}) and attribute_not_exists(${VOICES_SORT_KEY})`,
  }

  return document.put(params).promise()
  .then(() => {
    if (type === VOICE_TYPE_RESPONSE) {
      return linkResponse(primaryVoiceIdentifier, params.Item)
    } else {
      return params.Item
    }
  })
  .catch((err) => {
    logError(err)
    throw String('Unable to add your voice. :(')
  })
}

/**
  link the response voice to the primary voice
*/
function linkResponse (primaryVoiceIdentifier, responseVoice) {
  const topicIdentifier = responseVoice[VOICES_PARTITION_KEY]
  const responseVoiceIdentifier = voiceIdentifierCreator(responseVoice[VOICES_USERNAME_KEY], responseVoice[VOICES_TIMESTAMP_KEY])

  const params = {
    TableName: VOICES_TABLE_NAME,
    Key: {
      [VOICES_PARTITION_KEY]: topicIdentifier,
      [VOICES_SORT_KEY]: primaryVoiceIdentifier,
    },
    UpdateExpression: `SET ${VOICES_RESPONSES_KEY} = list_append(:voiceIdentifier, ${VOICES_RESPONSES_KEY})`,
    ExpressionAttributeValues: {
      ':voiceIdentifier': [responseVoiceIdentifier],
    },
  }

  return document.update(params).promise()
  .then(() => responseVoice)
  .catch((err) => {
    logError(err)
    throw String('Unable to add your response. :(')
  })
}

export default addVoice
