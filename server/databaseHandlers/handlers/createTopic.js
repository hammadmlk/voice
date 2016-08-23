import document from '../dbClient'
import { logError } from '../errorUtils'
import {TOPICS_TABLE_NAME, TOPICS_PARTITION_KEY, TOPICS_SORT_KEY,
        TOPICS_TITLE_KEY, TOPICS_TIMESTAMP_KEY, TOPICS_LASTUPDATED_KEY} from '../constants'
import { addTopicToRecentTopicsGroup } from './updateTopicGroup'

/**
  Adds the topic to database. Throws error if the topic already exist.

  If add is successful, calls addTopicToRecentTopicsGroup(). TODO: This should be done through DynamoDB Triggers instead.

  creator : {String} creator's username
  slug : {String} the slug of the topic
  title : {String} The topic name (can be empty)
  return: {String} 'success'
  throws: {String} the error message
 */
function createTopic (creator, slug, title = 'Topic Title Here') {
  // The item we want to add to db
  const topic = { }
  topic[TOPICS_PARTITION_KEY] = creator
  topic[TOPICS_SORT_KEY] = slug
  topic[TOPICS_TITLE_KEY] = title
  topic[TOPICS_TIMESTAMP_KEY] = new Date().toISOString()
  topic[TOPICS_LASTUPDATED_KEY] = new Date().toISOString()

  const params = {
    TableName: TOPICS_TABLE_NAME,
    Item: topic,
    ConditionExpression: `attribute_not_exists(${TOPICS_PARTITION_KEY}) and attribute_not_exists(${TOPICS_SORT_KEY})`,
  }

  return document.put(params).promise()
  .then(() => {
    addTopicToRecentTopicsGroup(topic[TOPICS_PARTITION_KEY], topic[TOPICS_SORT_KEY]) // TODO: This should be done through DynamoDB Triggers
    return 'success'
  })
  .catch((err) => {
    logError(err)
    throw String('Unable to create topic. Is the slug already taken?')
  })
}

export default createTopic
