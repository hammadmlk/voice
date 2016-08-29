import { dynamodb } from '../dbClient'
import {TOPICS_TABLE_NAME, VOICES_TABLE_NAME,
        TOPIC_GROUP_TABLE_NAME} from '../constants'

// Delete Topics Table
deleteTable(TOPICS_TABLE_NAME)

// Delete Voices Table
deleteTable(VOICES_TABLE_NAME)

// Delete TopicGroup Table
deleteTable(TOPIC_GROUP_TABLE_NAME)

function deleteTable (tableName) {
  const params = {
    TableName: tableName,
  }

  dynamodb.deleteTable(params, function (err, data) {
    if (err) {
      console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.info('Deleted table. Table deleted JSON:', JSON.stringify(data, null, 2))
    }
  })
}
