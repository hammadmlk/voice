const FETCHING_VOICES = 'FETCHING_VOICES'
const FETCHING_VOICES_FAILURE = 'FETCHING_VOICES_FAILURE'
const FETCHING_VOICES_SUCCESS = 'FETCHING_VOICES_SUCCESS'

//
// Action Creators
//

export function fetchingVoices () {
  return {
    type: FETCHING_VOICES,
  }
}

export function fetchingVoicesFailure (error) {
  return {
    type: FETCHING_VOICES,
    error: error,
  }
}

export function fetchingVoicesSuccess (voicesMap) {
  return {
    type: FETCHING_VOICES,
    voicesMap: voicesMap,
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
  // [voiceIfentifier]: voiceObject, // see reducer case FETCHING_VOICES_SUCCESS
}

export default function voicesReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_VOICES :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_VOICES_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_VOICES_SUCCESS :
      return {
        ...state,
        ...action.voicesMap,
        isFetching: false,
        error: '',
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

export function fetchAndHandleVoices (topicCreator, topicSlug) {
  return function (dispatch, getState) {
    // TODO: implementation pending
  }
}

//
// End Thunks
//
