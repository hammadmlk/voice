import { dynamodb } from '../dbClient'
import {TOPICS_TABLE_NAME, TOPICS_PARTITION_KEY, TOPICS_SORT_KEY} from '../constants'

// Create Topics Table
createTable(TOPICS_TABLE_NAME, TOPICS_PARTITION_KEY, TOPICS_SORT_KEY)

/*
  Create a table with the provided name. The table with have a composite primary key composed of PartitionKey and SortKey.
  Both keys will be of type string.
  See http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.01.html
  See http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithTables.html
*/
function createTable (tableName, partitionKey, sortKey) {
  const params = {
    TableName: tableName,
    KeySchema: [
      { AttributeName: partitionKey, KeyType: 'HASH' }, // Partition key
      { AttributeName: sortKey, KeyType: 'RANGE' }, // Sort key
    ],
    AttributeDefinitions: [
      {
        AttributeName: partitionKey,
        AttributeType: 'S',
      },
      {
        AttributeName: sortKey,
        AttributeType: 'S',
      },
    ],
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
