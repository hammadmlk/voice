require('babel-register')
require('dotenv').config()

import createTopicGroup from '../handlers/createTopicGroup'
import { TOPIC_GROUP_RECENT_TOPICS } from '../constants'

createTopicGroup(TOPIC_GROUP_RECENT_TOPICS)
