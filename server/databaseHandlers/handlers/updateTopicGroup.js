import document from '../dbClient'
import { logError } from '../errorUtils'
import { TOPIC_GROUP_TABLE_NAME, TOPIC_GROUP_PARTITION_KEY, TOPIC_GROUP_TOPICS_KEY,
         TOPIC_GROUP_RECENT_TOPICS, TOPIC_GROUP_RECENT_TOPICS_NUMBER } from '../constants'

/**
  Adds a topic to the topic group.

  groupName : {String} name of the group to add topic
  topicCreator : {String} the topic's creator
  topicSlug : {String} the topic's slug
  return: void
*/
export default function addTopicToTopicGroup (groupName, topicCreator, topicSlug) {
  const params = {
    TableName: TOPIC_GROUP_TABLE_NAME,
    Key: {
      [TOPIC_GROUP_PARTITION_KEY]: groupName,
    },
    UpdateExpression: `SET ${TOPIC_GROUP_TOPICS_KEY} = list_append(:topicIdentifier, ${TOPIC_GROUP_TOPICS_KEY})`,
    ExpressionAttributeValues: {
      ':topicIdentifier': [{topicCreator, topicSlug}],
    },
  }
  return document.update(params).promise()
  .then(() => 'success')
  .catch((err) => {
    logError(err)
    throw String('Unable to add topic to topic group.')
  })
}

/**
  Adds topic to group TOPIC_GROUP_RECENT_TOPICS.
  Tries to keep the max number of topics in the group around TOPIC_GROUP_RECENT_TOPICS_NUMBER

  TODO: This should be done through DynamoDB triggers instead.
*/
export function addTopicToRecentTopicsGroup (topicCreator, topicSlug) {
  try {
    removeNthTopicFromGroup(TOPIC_GROUP_RECENT_TOPICS, TOPIC_GROUP_RECENT_TOPICS_NUMBER)
    addTopicToTopicGroup(TOPIC_GROUP_RECENT_TOPICS, topicCreator, topicSlug)
  } catch (err) {
    console.error('Unable to add topic to recent topics group.', err)
  }
}

function removeNthTopicFromGroup (groupName, n) {
  const params = {
    TableName: TOPIC_GROUP_TABLE_NAME,
    Key: {
      [TOPIC_GROUP_PARTITION_KEY]: groupName,
    },
    UpdateExpression: `REMOVE topics[${n}]`,
  }
  document.update(params).promise()
  .then(() => 'success')
  .catch((err) => logError(err))
}
