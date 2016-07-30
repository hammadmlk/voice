import AWS from 'aws-sdk'

const DYNAMODB_REGION = process.env.DYNAMODB_REGION
const DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT

AWS.config.update({
  region: DYNAMODB_REGION,
  endpoint: DYNAMODB_ENDPOINT,
})

const dbClient = new AWS.DynamoDB.DocumentClient()

export default dbClient
