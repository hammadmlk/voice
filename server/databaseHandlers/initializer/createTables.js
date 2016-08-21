require('babel-register')
require('dotenv').config()

import { dynamodb } from '../dbClient'
import {TOPICS_TABLE_NAME, TOPICS_PARTITION_KEY, TOPICS_SORT_KEY,
        VOICES_TABLE_NAME, VOICES_PARTITION_KEY, VOICES_SORT_KEY,
        TOPIC_GROUP_TABLE_NAME, TOPIC_GROUP_PARTITION_KEY} from '../constants'

// Create Topics Table
createTable(TOPICS_TABLE_NAME, TOPICS_PARTITION_KEY, TOPICS_SORT_KEY)

// Create Voices Table
createTable(VOICES_TABLE_NAME, VOICES_PARTITION_KEY, VOICES_SORT_KEY)

// Create TopicGroup Table
createTable(TOPIC_GROUP_TABLE_NAME, TOPIC_GROUP_PARTITION_KEY)

/*
  Create a table with the provided name. The table with have a composite primary key composed of PartitionKey and SortKey.
  Both keys will be of type string.
  See http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.01.html
  See http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithTables.html
*/
function createTable (tableName, partitionKey, sortKey = null) {
  const keySchema = []
  const attributeDefinitions = []

  // Partition key
  keySchema[0] = { AttributeName: partitionKey, KeyType: 'HASH' }
  attributeDefinitions[0] = { AttributeName: partitionKey, AttributeType: 'S' }

  // Sort key
  if (sortKey !== null) {
    keySchema[1] = { AttributeName: sortKey, KeyType: 'RANGE' }
    attributeDefinitions[1] = { AttributeName: sortKey, AttributeType: 'S' }
  }
  const params = {
    TableName: tableName,
    KeySchema: keySchema,
    AttributeDefinitions: attributeDefinitions,
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  }
  dynamodb.createTable(params, function (err, data) {
    if (err) {
      console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.info('Created table. Table description JSON:', JSON.stringify(data, null, 2))
    }
  })
}
