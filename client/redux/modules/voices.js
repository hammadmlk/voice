const RESET_VOICES = 'RESET_VOICES'
const ADD_VOICES = 'ADD_VOICES'

//
// Action Creators
//

export function resetVoices () {
  return {
    type: RESET_VOICES,
  }
}

export function addVoices (voices) {
  return {
    type: ADD_VOICES,
    voices: voices,
  }
}

//
// End Action Creators
//

//
// Reducers
//

const initialState = {
  // [voiceIfentifier]: voiceObject, // see reducer case ADD_VOICES
}

export default function voicesReducer (state = initialState, action) {
  switch (action.type) {
    case RESET_VOICES :
      return initialState
    case ADD_VOICES :
      return {
        ...state,
        ...action.voices,
      }
    default :
      return state
  }
}

//
// End Reducers
//
