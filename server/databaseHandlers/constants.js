export const DYNAMODB_REGION = process.env.DYNAMODB_REGION
export const DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT

// WARNING: Changing these keys without updating existing data in the database can have disastrous consequences.

// Topics Table
export const TOPICS_TABLE_NAME = 'Topics'
export const TOPICS_PARTITION_KEY = 'creator'
export const TOPICS_SORT_KEY = 'slug'
export const TOPICS_TITLE_KEY = 'title'
export const TOPICS_TIMESTAMP_KEY = 'timestamp'
export const TOPICS_LASTUPDATED_KEY = 'lastupdated'
