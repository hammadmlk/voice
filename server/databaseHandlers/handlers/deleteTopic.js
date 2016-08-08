import document from '../dbClient'
import { logError } from '../errorUtils'
import {TOPICS_TABLE_NAME, TOPICS_PARTITION_KEY, TOPICS_SORT_KEY} from '../constants'

/*
  Removes the topic from database
  username: {String} creator's username
  slug: {String} the slug of the topic
  return: {String} 'success'
  error: {String} the error message
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
  .catch((err) => {
    logError(err)
    return 'Unable to delete topic.'
  })
}

export default deleteTopic
