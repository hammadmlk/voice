const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

const DEFAULT_SNACKBAR_DURATION = 4000

//
// Action Creators
//

export function openSnackbar (message, duration = DEFAULT_SNACKBAR_DURATION) {
  return {
    type: OPEN_SNACKBAR,
    message: message,
    duration: duration,
  }
}

export function closeSnackbar () {
  return {
    type: CLOSE_SNACKBAR,
  }
}

//
// End Action Creators
//

//
// Reducers
//

const initialState = {
  message: '',
  isOpen: false,
  duration: DEFAULT_SNACKBAR_DURATION,
}

export default function snackbarReducer (state = initialState, action) {
  switch (action.type) {
    case OPEN_SNACKBAR :
      return {
        ...state,
        isOpen: true,
        message: typeof action.message === 'string' ? action.message : JSON.stringify(action.message, null, ''),
        duration: action.duration,
      }
    case CLOSE_SNACKBAR :
      return {
        ...state,
        isOpen: false,
      }
    default :
      return state
  }
}

//
// End Reducers
//
