import { getTopic } from 'helpers/ioCommunicator'
import { openSnackbar } from 'redux/modules/snackbar'

const FETCHING_TOPIC = 'FETCHING_TOPIC'
const FETCHING_TOPIC_FAILURE = 'FETCHING_TOPIC_FAILURE'
const FETCHING_TOPIC_SUCCESS = 'FETCHING_TOPIC_SUCCESS'

//
// Action Creators
//

function fetchingTopic () {
  return {
    type: FETCHING_TOPIC,
  }
}

function fetchingTopicFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_TOPIC_FAILURE,
    error: error,
  }
}

function fetchingTopicSuccess ({creator, slug, title}) {
  return {
    type: FETCHING_TOPIC_SUCCESS,
    creator,
    slug,
    title,
  }
}

// End Action Creators
//

//
// Reducers
//

const initialState = {
  isFetching: false,
  error: '',
  creator: '',
  slug: '',
  title: '',
  lastFetched: '',
}

export default function topicReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_TOPIC :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_TOPIC_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_TOPIC_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        creator: action.creator,
        slug: action.slug,
        title: action.title,
        lastFetched: Date.now(),
      }
    default :
      return state
  }
}

//
// End Reducers
//

//
// Thunks
//

export function fetchAndHandleTopic (creator, slug) {
  return function (dispatch, getState) {
    dispatch(fetchingTopic())
    getTopic(creator, slug)
      .then((topic) => dispatch(fetchingTopicSuccess(topic)))
      .catch((error) => {
        dispatch(fetchingTopicFailure(error))
        dispatch(openSnackbar(error))
      })
  }
}

//
// End Thunks
//
