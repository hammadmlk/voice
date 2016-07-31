import document from '../dbClient'
import {TOPICS_TABLE_NAME, TOPICS_PARTITION_KEY, TOPICS_SORT_KEY,
        TOPICS_TITLE_KEY, TOPICS_TIMESTAMP_KEY, TOPICS_LASTUPDATED_KEY} from '../constants'

/**
  createTopic() adds the topic to database

  @param {String} username : creator's username
  @param {String} slug : the slug of the topic
  @param {String} title : The topic name (can be empty)
  @return: ???
  @error: ???
  FIXME: define a response/error standard that is used by all socket events on server and client
 */
function createTopic (username, slug, title = undefined) {
  // The item we want to add to db
  const item = { }
  item[TOPICS_PARTITION_KEY] = username
  item[TOPICS_SORT_KEY] = slug
  if (title) item[TOPICS_TITLE_KEY] = title // only set title key if title is not empty
  item[TOPICS_TIMESTAMP_KEY] = new Date().toISOString()
  item[TOPICS_LASTUPDATED_KEY] = new Date().toISOString()

  const params = {
    TableName: TOPICS_TABLE_NAME,
    Item: item,
  }

  return document.put(params).promise()
  .then(() => 'success')
  .catch((err) => err)
}

export default createTopic
