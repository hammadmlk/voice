import document from '../dbClient'
import {TOPICS_TABLE_NAME, TOPICS_PARTITION_KEY, TOPICS_SORT_KEY} from '../constants'

/*
  deleteTopic() removes the topic from database
  username: creator's username
  slug: the slug of the topic
  return: ???
  error: ???
  FIXME: define a response/error standard that is used by all socket events on server and client
 */
function deleteTopic (username, slug) {
  // The item we want to delete from db
  const key = { }
  key[TOPICS_PARTITION_KEY] = username
  key[TOPICS_SORT_KEY] = slug

  const params = {
    TableName: TOPICS_TABLE_NAME,
    Key: key,
  }

  return document.delete(params).promise()
  .then(() => 'success')
  .catch((err) => err)
}

export default deleteTopic
