import document from '../dbClient'
import { logError } from '../errorUtils'
import { TOPIC_GROUP_TABLE_NAME, TOPIC_GROUP_PARTITION_KEY, TOPIC_GROUP_TOPICS_KEY } from '../constants'

/**
  Adds a empty topic group to database. Throws error if the group already exist.

  name : {String} name of the group
  return: {String} 'success'
  throws: {String} the error message
 */
export default function createTopicGroup (name) {
  const topicGroup = {
    [TOPIC_GROUP_PARTITION_KEY]: name,
    [TOPIC_GROUP_TOPICS_KEY]: [],
  }

  const params = {
    TableName: TOPIC_GROUP_TABLE_NAME,
    Item: topicGroup,
    ConditionExpression: 'attribute_not_exists(#partitionKey)',
    ExpressionAttributeNames: {
      '#partitionKey': TOPIC_GROUP_PARTITION_KEY,
    },
  }

  return document.put(params).promise()
  .then(() => 'success')
  .catch((err) => {
    logError(err)
    throw String('Unable to create topic group. Is the name already taken?')
  })
}
