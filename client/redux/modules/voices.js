const RESET_VOICES = 'RESET_VOICES'
const ADD_VOICE = 'ADD_VOICE'
const ADD_VOICE_RESPONSE = 'ADD_VOICE_RESPONSE'
const ADD_VOICES = 'ADD_VOICES'
const SHOW_RESPONSES = 'SHOW_RESPONSES'

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

export function addVoiceResponse (primaryVoiceIdentifier, voice) {
  return {
    type: ADD_VOICE_RESPONSE,
    primaryVoiceIdentifier: primaryVoiceIdentifier,
    voice: voice,
  }
}

export function addVoices (voices) {
  return {
    type: ADD_VOICES,
    voices: voices,
  }
}

export function showResponses (voiceIdentifier) {
  return {
    type: SHOW_RESPONSES,
    voiceIdentifier: voiceIdentifier,
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
    case ADD_VOICE_RESPONSE :
      return {
        ...state,
        [action.voice.voiceIdentifier]: action.voice,
        [action.primaryVoiceIdentifier]: {
          ...state[action.primaryVoiceIdentifier],
          responseVoiceIdentifiers: [...state[action.primaryVoiceIdentifier].responseVoiceIdentifiers, action.voice.voiceIdentifier],
        },
      }
    case ADD_VOICES :
      return {
        ...state,
        ...action.voices,
      }
    case SHOW_RESPONSES :
      return {
        ...state,
        [action.voiceIdentifier]: {
          ...state[action.voiceIdentifier],
          showResponses: true,
        },
      }
    default :
      return state
  }
}

//
// End Reducers
//
