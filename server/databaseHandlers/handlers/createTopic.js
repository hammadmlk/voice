import document from '../dbClient'
import { logError } from '../errorUtils'
import {TOPICS_TABLE_NAME, TOPICS_PARTITION_KEY, TOPICS_SORT_KEY,
        TOPICS_TITLE_KEY, TOPICS_TIMESTAMP_KEY, TOPICS_LASTUPDATED_KEY} from '../constants'

/**
  Adds the topic to database. Throws error if the topic already exist.

  creator : {String} creator's username
  slug : {String} the slug of the topic
  title : {String} The topic name (can be empty)
  return: {String} 'success'
  throws: {String} the error message
 */
function createTopic (creator, slug, title = 'Topic Title Here') {
  // The item we want to add to db
  const item = { }
  item[TOPICS_PARTITION_KEY] = creator
  item[TOPICS_SORT_KEY] = slug
  item[TOPICS_TITLE_KEY] = title
  item[TOPICS_TIMESTAMP_KEY] = new Date().toISOString()
  item[TOPICS_LASTUPDATED_KEY] = new Date().toISOString()

  const params = {
    TableName: TOPICS_TABLE_NAME,
    Item: item,
    ConditionExpression: `attribute_not_exists(${TOPICS_PARTITION_KEY}) and attribute_not_exists(${TOPICS_SORT_KEY})`,
  }

  return document.put(params).promise()
  .then(() => 'success')
  .catch((err) => {
    logError(err)
    throw String('Unable to create topic. Is the slug already taken?')
  })
}

export default createTopic
