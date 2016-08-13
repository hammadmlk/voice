const RESET_VOICES = 'RESET_VOICES'
const ADD_VOICE = 'ADD_VOICE'
const ADD_VOICES = 'ADD_VOICES'

//
// Action Creators
//

export function resetVoices () {
  return {
    type: RESET_VOICES,
  }
}

export function addVoice (voice) {
  return {
    type: ADD_VOICE,
    voice: voice,
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
  // [voiceIdentifier]: voiceObject, // see reducer case ADD_VOICE
}

export default function voicesReducer (state = initialState, action) {
  switch (action.type) {
    case RESET_VOICES :
      return initialState
    case ADD_VOICE :
      return {
        [action.voice.voiceIdentifier]: action.voice,
        ...state,
      }
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
