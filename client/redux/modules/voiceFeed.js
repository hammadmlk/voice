import { getVoices } from 'helpers/ioCommunicator'
import { openSnackbar } from 'redux/modules/snackbar'
import { resetVoices, addVoices, addVoice } from 'redux/modules/voices'

const VOICE_FEED_ADD_VOICE_IDENTIFIER = 'VOICE_FEED_ADD_VOICE_IDENTIFIER'
const FETCHING_VOICES = 'FETCHING_VOICES'
const FETCHING_VOICES_FAILURE = 'FETCHING_VOICES_FAILURE'
const FETCHING_VOICES_SUCCESS = 'FETCHING_VOICES_SUCCESS'

//
// Action Creators
//

function voiceFeedAddVoiceIdentifier (voiceIdentifier) {
  return {
    type: VOICE_FEED_ADD_VOICE_IDENTIFIER,
    voiceIdentifier: voiceIdentifier,
  }
}

function fetchingVoices () {
  return {
    type: FETCHING_VOICES,
  }
}

function fetchingVoicesFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_VOICES_FAILURE,
    error: error,
  }
}

function fetchingVoicesSuccess (voiceIdentifiers) {
  return {
    type: FETCHING_VOICES_SUCCESS,
    voiceIdentifiers: voiceIdentifiers,
  }
}

//
// End Action Creators
//

//
// Reducers
//

const initialState = {
  isFetching: false,
  error: '',
  voiceIdentifiers: [],
}

export default function voiceFeedReducer (state = initialState, action) {
  switch (action.type) {
    case VOICE_FEED_ADD_VOICE_IDENTIFIER :
      return {
        ...state,
        voiceIdentifiers: [action.voiceIdentifier, ...state.voiceIdentifiers],
      }
    case FETCHING_VOICES :
      return {
        ...state,
        isFetching: true,
        voiceIdentifiers: [],
      }
    case FETCHING_VOICES_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error,
        voiceIdentifiers: [],
      }
    case FETCHING_VOICES_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        voiceIdentifiers: action.voiceIdentifiers,
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

export function addVoiceToFeed (voice) {
  return function (dispatch) {
    dispatch(addVoice(voice))
    dispatch(voiceFeedAddVoiceIdentifier(voice.voiceIdentifier))
  }
}

export function fetchAndHandleVoices (topicCreator, topicSlug) {
  return function (dispatch, getState) {
    dispatch(fetchingVoices())
    getVoices(topicCreator, topicSlug)
      .then((voices) => {
        dispatch(resetVoices()) // TODO: Can we benefit from caching ?
        dispatch(addVoices(voices))
        dispatch(fetchingVoicesSuccess(Object.keys(voices)))
      })
      .catch((error) => {
        dispatch(fetchingVoicesFailure(error))
        dispatch(openSnackbar(error))
      })
  }
}

//
// End Thunks
//
