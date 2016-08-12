import document from '../dbClient'
import { logError } from '../errorUtils'
import { VOICES_TABLE_NAME, VOICES_PARTITION_KEY, VOICES_SORT_KEY,
         VOICES_TIMESTAMP_KEY, VOICES_USERNAME_KEY, VOICES_TITLE_KEY,
         VOICES_TEXT_KEY, VOICES_TYPE_KEY, VOICE_TYPE_PRIMARY,
         VOICE_TYPE_SUPPORTING, topicIdentifierCreator, voiceIdentifierCreator } from '../constants'

/**
  Adds the voice to the database. Throws error if something goes wrong.

  topicCreator: {string} creator of the topic this voice is associated with
  topicSlug: {string} slug of the topic this voice is associated with
  username: {string} the username of the person adding this voice
  title: {string} the title of this voice
  text: {string} the detailed text of this voice. Can be empty
  type: {string} the type of the voice. Either VOICE_TYPE_PRIMARY or VOICE_TYPE_SUPPORTING
  return: {string} 'success'
  throws: {string} the error message
*/
function addVoice (topicCreator, topicSlug, username, title, text = ' ', type) {
  // validate type. If invalid, reject promise
  if (type !== VOICE_TYPE_PRIMARY && type !== VOICE_TYPE_SUPPORTING) {
    const invalidArgumentsErr = {statusCode: 400, message: `Voice type (${type}) is not allowed.`}
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
  item[VOICES_TITLE_KEY] = title
  item[VOICES_TEXT_KEY] = text
  item[VOICES_TYPE_KEY] = type

  const params = {
    TableName: VOICES_TABLE_NAME,
    Item: item,
    ConditionExpression: `attribute_not_exists(${VOICES_PARTITION_KEY}) and attribute_not_exists(${VOICES_SORT_KEY})`,
  }

  return document.put(params).promise()
  .then(() => 'success')
  .catch((err) => {
    logError(err)
    throw String('Unable to add your voice. :(')
  })
}

export default addVoice
