import { addVoice } from 'helpers/ioCommunicator'
import { addVoiceToFeed } from 'redux/modules/voiceFeed'
import { openSnackbar } from 'redux/modules/snackbar'

const CREATE_VOICE_OPEN_MODAL = 'CREATE_VOICE_OPEN_MODAL'
const CREATE_VOICE_CLOSE_MODAL = 'CREATE_VOICE_CLOSE_MODAL'

const CREATE_VOICE_UPDATE_TEXT_VALUE = 'CREATE_VOICE_UPDATE_TEXT_VALUE'

const CREATE_VOICE_FETCHING = 'CREATE_VOICE_FETCHING'
const CREATE_VOICE_FETCHING_FAILURE = 'CREATE_VOICE_FETCHING_FAILURE'
const CREATE_VOICE_FETCHING_SUCCESS = 'CREATE_VOICE_FETCHING_SUCCESS'

//
// Action Creators
//

export function openModal () {
  return {
    type: CREATE_VOICE_OPEN_MODAL,
  }
}

export function closeModal () {
  return {
    type: CREATE_VOICE_CLOSE_MODAL,
  }
}

export function updateTextValue (newValue) {
  return {
    type: CREATE_VOICE_UPDATE_TEXT_VALUE,
    newValue: newValue,
  }
}

function fetching () {
  return {
    type: CREATE_VOICE_FETCHING,
  }
}

function fetchingFailure (error) {
  return {
    type: CREATE_VOICE_FETCHING_FAILURE,
    error: error,
  }
}

function fetchingSuccess () {
  return {
    type: CREATE_VOICE_FETCHING_SUCCESS,
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
  text: '',
  isFetching: false,
  error: '',
}

export default function createVoiceReducer (state = initialState, action) {
  switch (action.type) {
    case CREATE_VOICE_OPEN_MODAL :
      return {
        ...state,
        isModalOpen: true,
      }
    case CREATE_VOICE_CLOSE_MODAL :
      return {
        ...state,
        isModalOpen: false,
      }
    case CREATE_VOICE_UPDATE_TEXT_VALUE :
      return {
        ...state,
        text: action.newValue,
      }
    case CREATE_VOICE_FETCHING :
      return {
        ...state,
        isFetching: true,
      }
    case CREATE_VOICE_FETCHING_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case CREATE_VOICE_FETCHING_SUCCESS :
      return initialState
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

export function createAndHandleVoice (topicCreator, topicSlug, username, text, type) {
  return function (dispatch, getState) {
    dispatch(fetching())
    addVoice(topicCreator, topicSlug, username, text, type)
      .then((addedVoice) => {
        dispatch(addVoiceToFeed(addedVoice))
        dispatch(fetchingSuccess())
        dispatch(openSnackbar('Your voice was shared'))
      })
      .catch((error) => {
        dispatch(fetchingFailure(error))
        dispatch(openSnackbar(error))
      })
  }
}

//
// End Thunks
//
