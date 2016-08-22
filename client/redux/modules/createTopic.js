import { createTopic } from 'helpers/ioCommunicator'
import { generateSlug } from 'helpers/utils'
import { openSnackbar } from 'redux/modules/snackbar'

const OPEN_CREATE_TOPIC_MODAL = 'OPEN_CREATE_TOPIC_MODAL'
const CLOSE_CREATE_TOPIC_MODAL = 'CLOSE_CREATE_TOPIC_MODAL'

const UPDATE_CREATE_TOPIC_SLUG_VALUE = 'UPDATE_CREATE_TOPIC_SLUG_VALUE'
const UPDATE_CREATE_TOPIC_TITLE_VALUE = 'UPDATE_CREATE_TOPIC_TITLE_VALUE'

const FETCHING_CREATE_TOPIC = 'FETCHING_CREATE_TOPIC'
const FETCHING_CREATE_TOPIC_FAILURE = 'FETCHING_CREATE_TOPIC_FAILURE'
const FETCHING_CREATE_TOPIC_SUCCESS = 'FETCHING_CREATE_TOPIC_SUCCESS'

//
// Action Creators
//

export function openCreateTopicModal () {
  return {
    type: OPEN_CREATE_TOPIC_MODAL,
  }
}

export function closeCreateTopicModal () {
  return {
    type: CLOSE_CREATE_TOPIC_MODAL,
  }
}

export function updateCreateTopicSlugValue (newValue) {
  return {
    type: UPDATE_CREATE_TOPIC_SLUG_VALUE,
    newValue: newValue,
  }
}

export function updateCreateTopicTitleValue (newValue) {
  return {
    type: UPDATE_CREATE_TOPIC_TITLE_VALUE,
    newValue: newValue,
  }
}

function fetchingCreateTopic () {
  return {
    type: FETCHING_CREATE_TOPIC,
  }
}

function fetchingCreateTopicFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_CREATE_TOPIC_FAILURE,
    error: error,
  }
}

function fetchingCreateTopicSuccess (slug, title) {
  return {
    type: FETCHING_CREATE_TOPIC_SUCCESS,
    slug,
    title,
  }
}

//
// End Action Creators
//

//
// Reducers
//

const initialState = {
  isModalOpen: false,
  slug: '',
  title: '',
  isFetching: false,
  error: '',
}

export default function createTopicReducer (state = initialState, action) {
  switch (action.type) {
    case OPEN_CREATE_TOPIC_MODAL :
      return {
        ...state,
        isModalOpen: true,
      }
    case CLOSE_CREATE_TOPIC_MODAL :
      return {
        ...state,
        isModalOpen: false,
        error: '',
      }
    case UPDATE_CREATE_TOPIC_SLUG_VALUE :
      return {
        ...state,
        slug: generateSlug(action.newValue),
      }
    case UPDATE_CREATE_TOPIC_TITLE_VALUE :
      return {
        ...state,
        title: action.newValue,
      }
    case FETCHING_CREATE_TOPIC :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_CREATE_TOPIC_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_CREATE_TOPIC_SUCCESS :
      return {
        ...state,
        isFetching: false,
        slug: action.slug,
        title: action.title,
        isModalOpen: false,
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

export function createAndHandleTopic (username, slug, title) {
  return function (dispatch, getState) {
    dispatch(fetchingCreateTopic())
    createTopic(getState().auth.username, slug, title)
      .then(() => dispatch(fetchingCreateTopicSuccess(slug, title)))
      .catch((error) => {
        dispatch(fetchingCreateTopicFailure(error))
        dispatch(openSnackbar(error))
      })
  }
}

//
// End Thunks
//
