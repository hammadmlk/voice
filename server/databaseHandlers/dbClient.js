import AWS from 'aws-sdk'
import bluebird from 'bluebird'
import {DYNAMODB_REGION, DYNAMODB_ENDPOINT} from './constants'

AWS.config.update({
  region: DYNAMODB_REGION,
  endpoint: DYNAMODB_ENDPOINT,
  setPromisesDependency: bluebird,
})

export const dynamodb = new AWS.DynamoDB()

export default new AWS.DynamoDB.DocumentClient()

