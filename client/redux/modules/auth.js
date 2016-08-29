import { getAuthenticatedUser } from 'helpers/ioCommunicator'

const FETCHING_AUTH = 'FETCHING_AUTH'
const FETCHING_AUTH_FAILURE = 'FETCHING_AUTH_FAILURE'
const FETCHING_AUTH_SUCCESS = 'FETCHING_AUTH_SUCCESS'
const UNAUTH = 'UNAUTH'

//
// Action Creators
//

function fetchingAuth () {
  return {
    type: FETCHING_AUTH,
  }
}

function fetchingAuthFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_AUTH_FAILURE,
    error: 'Error trying to authenticate.',
  }
}

function fetchingAuthSuccess ({username}) {
  return {
    type: FETCHING_AUTH_SUCCESS,
    username,
  }
}

export function unauth () {
  return {
    type: UNAUTH,
  }
}

//
// End Action Creators
//

//
// Thunks
//

export function fetchAndHandleAuth () {
  return function (dispatch) {
    dispatch(fetchingAuth())
    return getAuthenticatedUser()
      .then((user) => dispatch(fetchingAuthSuccess(user)))
      .catch((error) => dispatch(fetchingAuthFailure(error)))
  }
}

//
// End Thunks
//

//
// Reducers
//

const initialState = {
  isFetching: false,
  isAuthed: false,
  username: '',
  error: '',
  lastUpdated: '',
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case UNAUTH :
      return {
        ...state,
        isAuthed: false,
        username: '',
      }
    case FETCHING_AUTH:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_AUTH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_AUTH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthed: true,
        username: action.username,
        lastUpdated: Date.now(),
        error: '',
      }
    default :
      return state
  }
}

//
// End Reducers
//
